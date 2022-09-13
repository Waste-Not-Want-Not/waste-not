import data from '../fixtures/kitchen_data.json'

describe('kitchen', () => {

  Cypress.on('uncaught:exception', (err, runnable) => {
    return false
  })

  Cypress.Commands.add(
    "interceptGQL",
    (
      url,
      operation,
      data,
      alias
    ) => {

      const previous = Cypress.config("interceptions");
      const alreadyRegistered = url in previous;

      const next = {
        ...(previous[url] || {}),
        [operation]: { alias, data },
      };

      Cypress.config("interceptions", {
        ...previous,
        [url]: next,
      });

      if (alreadyRegistered) {
        return;
      }

      cy.intercept("POST", url, (req) => {
        const interceptions = Cypress.config("interceptions");
        const match = interceptions[url]?.[req.body.operationName];
  
        if (match) {
          req.alias = match.alias;
          req.reply({ body: match.data });
        }
      });
    }
  );

  beforeEach(() => {
    Cypress.config("interceptions", {});
    cy.visit('http://localhost:3000/mykitchen');
    cy.interceptGQL("https://waste-not-be.herokuapp.com/graphql", "getUserById", data ).as("GetItems")
    // cy.wait("@GetItems")
    // cy.get(".title").contains("WASTE NOT, WANT NOT") Passing locally, but not in Circle CI
  });

  it('should have correct navbar', () => {
    cy.get('.app-logo').should('be.visible');
    cy.get('.navbar > [href="/mykitchen"] > .nav-container > label').contains('My Kitchen')
    cy.get('.active > .nav-container > label').contains('Overview')
    cy.get('[href="/donations"] > .nav-container > label').contains('Donation Page')
})

  it('should have pantry, fridge and freezer item previews', () => {
    cy.interceptGQL("https://waste-not-be.herokuapp.com/graphql", "getUserById", data);
    cy.get('button').first().click()
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
    cy.get('form > button').click()
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
    cy.get('form > button').click()
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
    cy.get('form > button').click()
    cy.get('.freezer').first().contains('Popsicles')
  })

  it('should show an error if error occurs during network request',() => {
    cy.interceptGQL("https://waste-not-be.herokuapp.com/graphql", "getUserById")
    cy.visit('http://localhost:3000/mykitchen');
    cy.contains('Technical difficulties, please visit us later.')
  })
})