import data from '../fixtures/kitchen.json'

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
    const items = data;
    cy.interceptGQL("https://waste-not-be.herokuapp.com/graphql", "getUserById", items);
    cy.get('button').first().click()
    cy.get('.title').contains('Waste Not, Want Not')
    cy.get('button').first().contains('MY KITCHEN')
    cy.get('button').eq(1).contains('Overview')
    cy.get('button').eq(2).contains('DONATION PAGE')
  })

  it('should have and be able to submit form', () => {

    const items = data;

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

    cy.interceptGQL("https://waste-not-be.herokuapp.com/graphql", "getUserById", items);
    cy.get('button').first().click()
    cy.get('input[type="text"]').type('potatoes')
    cy.get('select').select('pantry')
    cy.get('input[type="date"]').type('2022-05-17')
    cy.interceptGQL("https://waste-not-be.herokuapp.com/graphql", "getUserById", newItems);
    cy.get('button').eq(3).click()
    cy.wait(1000)
    cy.get('.pantry').first().contains('potatoes')
  })
})