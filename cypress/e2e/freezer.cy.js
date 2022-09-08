import freezerData from "../fixtures/freezer_location.json"

describe('Test Pantry View',() => {

  beforeEach(() => {
    Cypress.config("interceptions", {});
    cy.visit('http://localhost:3000/freezer');
    cy.interceptGQL("https://waste-not-be.herokuapp.com/graphql", "getUserById", freezerData ).as('GetFreezerData')
    cy.wait('@GetFreezerData')
    // cy.visit('http://localhost:3000/freezer');
  });

  it('should have correct title', () => {
      cy.get("h3").contains("FREEZER");
  });

  it('should have correct item card with buttons', () => {
    cy.get(".title").contains("Waste Not, Want Not")
    cy.get(".item-card").first().contains("Chicken");
    cy.get(".item-card").first().contains("Location: freezer");
    // cy.get(".expiration").first().contains("Expiration Date: Saturday, September 03, 2022");
    cy.get(":nth-child(1) > .item-card > :nth-child(3) > .ate-button").contains("ATE")
    cy.get(":nth-child(1) > .item-card > :nth-child(3) > .donate-button").contains("DONATE")
});

  it('should have another correct item card with buttons', () => {
    cy.get(".title").contains("Waste Not, Want Not")
    cy.get(".item-card").eq(1).contains("Peas");
    cy.get(".item-card").eq(1).contains("Location: freezer");
    // cy.get(".expiration").eq(1).contains("Expiration Date: Wednesday, September 07, 2022");
    cy.get(":nth-child(1) > .item-card > :nth-child(3) > .ate-button").contains("ATE");
    cy.get(":nth-child(1) > .item-card > :nth-child(3) > .donate-button").contains("DONATE");
  });

  it('be able to eat item', () => {
    cy.get(":nth-child(1) > .item-card > :nth-child(3) > .ate-button").click();
    cy.get(".App").should("not.contain","Chicken");
    cy.interceptGQL("https://waste-not-be.herokuapp.com/graphql", "deleteItem", {});
  });

  it('be able to donate item', () => {

    const donationItem = {
      "data": {
        "getUserById": {
          "name": "Edward Schaden",
          "email": "joetta.adams@wolf-grimes.name",
          "donationItems": [ 
            {
              "name": "Chicken",
              "expirationDate": "2022-09-03T00:00:00Z",
              "location": "pantry",
              "forDonation": false,
              "id":24
          }
          ]
        }
      }
    }

    cy.interceptGQL("https://waste-not-be.herokuapp.com/graphql", "getUserById", donationItem)
    cy.get(":nth-child(1) > .item-card > :nth-child(3) > .donate-button").click();
    cy.interceptGQL("https://waste-not-be.herokuapp.com/graphql", "updateForDonation", {} )
    cy.get('button').eq(2).click()
    cy.contains('Chicken')

  });

  it('should display an error message if network request fails.' , () => {
    cy.interceptGQL("https://waste-not-be.herokuapp.com/graphql", "getUserById")
    cy.visit('http://localhost:3000/freezer')
    cy.get('.error').should('have.text', 'Technical difficulties, please visit us later.')
  })

});