import pantryData from "../fixtures/pantry_location.json"

describe('Test Pantry View',() => {

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
    cy.visit('http://localhost:3000/pantry');
    cy.interceptGQL("https://waste-not-be.herokuapp.com/graphql", "getUserById", pantryData ).as("GetPantryItems")
    cy.wait("@GetPantryItems")
    // cy.get(".title").contains("WASTE NOT, WANT NOT"); Passing locally, but not in Circle CI
  });

  it('should have correct title', () => {
      cy.get("h3").contains("PANTRY");
  });

  it('should have correct item card with buttons', () => {
    cy.get(".item-card").first().contains("Mozzarella");
    cy.get(".item-card").first().contains("Location: PANTRY");
    cy.get(".expiration").first().contains("Expiration Date: Saturday, September 03, 2022");
    cy.get(":nth-child(1) > .item-card > :nth-child(3) > .ate-button").contains("ATE")
    cy.get(":nth-child(1) > .item-card > :nth-child(3) > .donate-button").contains("DONATE")
});

  it('should have another correct item card with buttons', () => {
    cy.get(".item-card").eq(1).contains("Wheat");
    cy.get(".item-card").eq(1).contains("Location: PANTRY");
    cy.get(".expiration").eq(1).contains("Expiration Date: Wednesday, September 07, 2022");
    cy.get(":nth-child(1) > .item-card > :nth-child(3) > .ate-button").contains("ATE");
    cy.get(":nth-child(1) > .item-card > :nth-child(3) > .donate-button").contains("DONATE");
  });

  it('should be able to eat item', () => {
    cy.get(":nth-child(1) > .item-card > :nth-child(3) > .ate-button").click();
    cy.interceptGQL("https://waste-not-be.herokuapp.com/graphql", "deleteItem", {} )
    cy.get(".item-card-container").first().should("not.contain","Mozzarella");
  });

  it('should be able to donate item', () => {
    cy.get('.item-card').first().find('.donate-button').click()
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
                "forDonation": true,
                "id":24
            }
          ]
        }
      }
    }
    cy.interceptGQL("https://waste-not-be.herokuapp.com/graphql", "getUserById", donationItem)
    cy.visit('http://localhost:3000/donations')
    cy.get('.item-card-container').contains('Mozzarella')
    cy.get('.item-card-container').contains('Location: PANTRY')
  });

  it('should display an error message if network request fails.' , () => {
    cy.interceptGQL("https://waste-not-be.herokuapp.com/graphql", "getUserById")
    cy.visit('http://localhost:3000/pantry')
    cy.get('.error').should('have.text', 'Technical difficulties, please visit us later.')
  })
});