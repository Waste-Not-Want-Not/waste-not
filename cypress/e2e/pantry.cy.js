import pantryData from "../fixtures/pantry_location.json"

describe('Test Pantry View',() => {

  beforeEach(() => {
    Cypress.config("interceptions", {});
    cy.visit('http://localhost:3000/pantry');
    cy.interceptGQL("https://waste-not-be.herokuapp.com/graphql", "getUserById", pantryData ).as("GetPantryItems")
    cy.wait("@GetPantryItems")
    // cy.visit('http://localhost:3000/pantry');
    cy.get(".title").contains("Waste Not, Want Not");
  });

  it('should have correct title', () => {
      cy.get("h3").contains("PANTRY");
  });

  it('should have correct item card with buttons', () => {
    cy.get(".item-card").first().contains("Mozzarella");
    cy.get(".item-card").first().contains("Location: pantry");
    // cy.get(".expiration").first().contains("Expiration Date: Saturday, September 03, 2022");
    cy.get(":nth-child(1) > .item-card > :nth-child(3) > .ate-button").contains("ATE")
    cy.get(":nth-child(1) > .item-card > :nth-child(3) > .donate-button").contains("DONATE")
});

  it('should have another correct item card with buttons', () => {
    cy.get(".item-card").eq(1).contains("Wheat");
    cy.get(".item-card").eq(1).contains("Location: pantry");
    // cy.get(".expiration").eq(1).contains("Expiration Date: Wednesday, September 07, 2022");
    cy.get(":nth-child(1) > .item-card > :nth-child(3) > .ate-button").contains("ATE");
    cy.get(":nth-child(1) > .item-card > :nth-child(3) > .donate-button").contains("DONATE");
  });

  it('be able to eat item', () => {
    cy.get(":nth-child(1) > .item-card > :nth-child(3) > .ate-button").click();
    cy.interceptGQL("https://waste-not-be.herokuapp.com/graphql", "deleteItem", {} )
    cy.get(".item-card-container").first().should("not.contain","Mozzarella");
  });

  it('be able to donate item', () => {

      const donationItem = {
      "data": {
        "getUserById": {
          "name": "Edward Schaden",
          "email": "joetta.adams@wolf-grimes.name",
          "donationItems": [ 
            {
              "name": "Mozzarella",
              "expirationDate": "2022-09-04T00:00:00Z",
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
    cy.contains('Mozzarella')

  });

  it('should display an error message if network request fails.' , () => {
    cy.interceptGQL("https://waste-not-be.herokuapp.com/graphql", "getUserById")
    cy.visit('http://localhost:3000/pantry')
    cy.get('.error').should('have.text', 'Technical difficulties, please visit us later.')
  })
});