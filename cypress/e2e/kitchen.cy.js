import data from '../fixtures/kitchen_data.json'

describe('kitchen', () => {
    
  Cypress.Commands.add(
    "interceptGQL",
    (
      url,
      operation,
      data,
      alias
    ) => {
      // Retrieve any previously registered interceptions.
      const previous = Cypress.config("interceptions");
      const alreadyRegistered = url in previous;
  
      const next = {
        ...(previous[url] || {}),
        [operation]: { alias, data },
      };
  
      // Merge in the new interception.
      Cypress.config("interceptions", {
        ...previous,
        [url]: next,
      });
  
      // No need to register handler more than once per URL. Operation data is
      // dynamically chosen within the handler.
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
    cy.visit('http://localhost:3000')
  });

  it('should have correct navbar', () => {
    cy.get('.title').contains('WASTE NOT, WANT NOT')
    cy.get('.navbar > [href="/mykitchen"] > .nav-container > label').contains('My Kitchen')
    cy.get('.active > .nav-container > label').contains('Overview')
    cy.get('[href="/donations"] > .nav-container > label').contains('Donation Page')
})

  it.only('should have pantry, fridge and freezer item previews', () => {
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

    cy.get('button').first().click()
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

    cy.get('button').first().click()
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

    cy.get('button').first().click()
    cy.get('input[type="text"]').type('Popsicles')
    cy.get('select').select('fridge')
    cy.get('input[type="date"]').type('2022-09-18')
    cy.interceptGQL("https://waste-not-be.herokuapp.com/graphql", "getUserById", newItems);
    cy.get('button').eq(3).click()
    cy.get('.freezer').first().contains('Popsicles')
  })

  it('should be able to go to pantry, fridge and freezer pages with correct urls', () => {
    // cy.interceptGQL("https://waste-not-be.herokuapp.com/graphql", "getUserById", data); stubbin won't work here with multiple queries needed with interpolation
    cy.get('button').first().click()
    cy.get('.location-link').first().click()
    cy.url().should('eq', 'http://localhost:3000/pantry')
    cy.go('back')
    cy.get('.location-link').eq(1).click()
    cy.url().should('eq', 'http://localhost:3000/fridge')
    cy.go('back')
    cy.get('.location-link').eq(2).click()
    cy.url().should('eq', 'http://localhost:3000/freezer')
    cy.go('back')
    cy.get('button').last().click()
    cy.url().should('eq', 'http://localhost:3000/expiring')
    
  })

  it('should show an error if error occurs during network request',() => {
    cy.interceptGQL("https://waste-not-be.herokuapp.com/graphql", "getUserById", {}); 
    cy.get('button').first().click()
    cy.contains('Technical difficulties, please visit us later.')
  })
})