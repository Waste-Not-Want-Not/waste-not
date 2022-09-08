import data from '../fixtures/kitchen_data.json'

describe('kitchen', () => {

  beforeEach(() => {
    Cypress.config("interceptions", {});
    cy.visit('http://localhost:3000/mykitchen');
    cy.interceptGQL("https://waste-not-be.herokuapp.com/graphql", "getUserById", data ).as("GetItems")
    cy.wait("@GetItems")
    cy.get(".title").contains("Waste Not, Want Not")
  });

  it('should have correct navbar', () => {
    cy.get('.title').contains('Waste Not, Want Not')
    cy.get('button').first().contains('MY KITCHEN')
    cy.get('button').eq(1).contains('Overview')
    cy.get('button').eq(2).contains('DONATION PAGE')
  })

  it('should have pantry, fridge and freezer item previews', () => {
    cy.get('.pantry').contains('Wheat')
    cy.get('.fridge').contains('Plums')
    cy.get('.freezer').contains('Incaberries')
  })

  it('should  able to create pantry item', () => {

    const newItem = {
        name:"potatoes",
        location:"pantry",
        expirationDate:"2022-05-17T00:00:00",
        userId:1,
        image:"www.example.com",
        forDonation:false,
        id:Date.now()
    }

    cy.interceptGQL("https://waste-not-be.herokuapp.com/graphql", "createItem", {data:{
        createItem:{
            item: newItem
        }
    }})

    const newItems = {...data}
    newItems.data.getUserById.items.push(newItem)

    cy.get('input[type="text"]').type('potatoes')
    cy.get('select').select('pantry')
    cy.get('input[type="date"]').type('2022-05-17')
    cy.interceptGQL("https://waste-not-be.herokuapp.com/graphql", "getUserById", newItems);
    cy.get('button').eq(3).click()
    cy.wait(1000)
    cy.get('.pantry').first().contains('potatoes')
  })

  it('should  able to create fridge item', () => {

    const newItem = {
        name:"cheese",
        location:"fridge",
        expirationDate:"2022-09-17T00:00:00",
        userId:1,
        image:"www.example.com",
        forDonation:false,
        id:Date.now()
    }

    cy.interceptGQL("https://waste-not-be.herokuapp.com/graphql", "createItem", {data:{
        createItem:{
            item: newItem
        }
    }})

    const newItems = {...data}
    newItems.data.getUserById.items.push(newItem)

    cy.get('input[type="text"]').type('cheese')
    cy.get('select').select('fridge')
    cy.get('input[type="date"]').type('2022-09-17')
    cy.interceptGQL("https://waste-not-be.herokuapp.com/graphql", "getUserById", newItems);
    cy.get('button').eq(3).click()
    cy.get('.fridge').first().contains('cheese')
  })

  it('should  able to create freezer item', () => {

    const newItem = {
        name:"Popsicles",
        location:"freezer",
        expirationDate:"2022-09-18T00:00:00",
        userId:1,
        image:"www.example.com",
        forDonation:false,
        id:Date.now()
    }

    cy.interceptGQL("https://waste-not-be.herokuapp.com/graphql", "createItem", {data:{
        createItem:{
            item: newItem
        }
    }})

    const newItems = {...data}
    newItems.data.getUserById.items.push(newItem)

    cy.get('input[type="text"]').type('Popsicles')
    cy.get('select').select('fridge')
    cy.get('input[type="date"]').type('2022-09-18')
    cy.interceptGQL("https://waste-not-be.herokuapp.com/graphql", "getUserById", newItems);
    cy.get('button').eq(3).click()
    cy.get('.freezer').first().contains('Popsicles')
  })

  it('should show an error if error occurs during network request',() => {
    cy.interceptGQL("https://waste-not-be.herokuapp.com/graphql", "getUserById")
    cy.visit('http://localhost:3000/mykitchen');
    cy.contains('Technical difficulties, please visit us later.')
  })
})