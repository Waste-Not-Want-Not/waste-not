import freezerData from "../fixtures/freezer_location.json"

describe('Test Freezer view',() => {

  Cypress.on('uncaught:exception', (err, runnable) => {
    return false
  })

  beforeEach(() => {
    Cypress.config("interceptions", {});
    cy.visit('http://localhost:3000/freezer');
    cy.interceptGQL("https://waste-not-be.herokuapp.com/graphql", "getUserById", freezerData ).as('GetFreezerData')
    cy.wait('@GetFreezerData')
  });

  it('should have correct title', () => {
      cy.get("h3").contains("FREEZER");
  });

  it('should have correct item card with buttons', () => {
    cy.get(".title").contains("WASTE NOT, WANT NOT")
    cy.get(".item-card").first().contains("Chicken");
    cy.get(".item-card").first().contains("Location: FREEZER");
    cy.get(".expiration").first().contains("Expiration Date: Saturday, September 03, 2022");
    cy.get(":nth-child(1) > .item-card > :nth-child(3) > .ate-button").contains("ATE")
    cy.get(":nth-child(1) > .item-card > :nth-child(3) > .donate-button").contains("DONATE")
});

  it('should have another correct item card with buttons', () => {
    cy.get(".title").contains("WASTE NOT, WANT NOT")
    cy.get(".item-card").eq(1).contains("Peas");
    cy.get(".item-card").eq(1).contains("Location: FREEZER");
    cy.get(".expiration").eq(1).contains("Expiration Date: Wednesday, September 07, 2022");
    cy.get(":nth-child(1) > .item-card > :nth-child(3) > .ate-button").contains("ATE");
    cy.get(":nth-child(1) > .item-card > :nth-child(3) > .donate-button").contains("DONATE");
  });

  it('should be able to eat item', () => {
    cy.get(":nth-child(1) > .item-card > :nth-child(3) > .ate-button").click();
    cy.get(".item-card-container").first().should("not.contain","Chicken");
    cy.interceptGQL("https://waste-not-be.herokuapp.com/graphql", "deleteItem", {});
  });

  // it.only('should be able to donate item', () => {             Passing Locally but not on Circle CI /
  //   cy.get('.item-card').first().find('.donate-button').click()
  //   const donationItem = {
  //     "data": {
  //       "getUserById": {
  //         "name": "Edward Schaden",
  //         "email": "joetta.adams@wolf-grimes.name",
  //         "donationItems": [ 
  //           {
  //             "id": 1,
  //             "expirationDate": "2022-05-11T00:00:00Z",
  //             "location": "freezer",
  //             "name": "Chicken",
  //             "forDonation": true
  //           }
  //         ]
  //       }
  //     }
  //   }
  //   cy.interceptGQL("https://waste-not-be.herokuapp.com/graphql", "getUserById", donationItem)
  //   cy.visit('http://localhost:3000/donations')
  //   cy.get('.item-card-container').contains('Chicken')
  //   cy.get('.item-card-container').contains('Location: FREEZER')
  // });

  it('should display an error message if network request fails.' , () => {
    cy.interceptGQL("https://waste-not-be.herokuapp.com/graphql", "getUserById")
    cy.visit('http://localhost:3000/freezer')
    cy.get('.error').should('have.text', 'Technical difficulties, please visit us later.')
  })

});