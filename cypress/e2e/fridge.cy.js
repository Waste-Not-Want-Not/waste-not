import fridgeData from "../fixtures/fridge_location.json"

describe('Test Pantry View',() => {
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
    cy.visit('http://localhost:3000/fridge');
    cy.interceptGQL("https://waste-not-be.herokuapp.com/graphql", "getUserById", fridgeData ).as("GetFridgeItems")
    cy.wait("@GetFridgeItems")
    // cy.visit('http://localhost:3000/fridge');
    cy.get(".title").contains("Waste Not, Want Not")
  });

  it('should have correct title', () => {
      cy.get("h3").contains("FRIDGE");
  });

  it('should have correct item card with buttons', () => {
    cy.get(".item-card").first().contains("Chicken");
    cy.get(".item-card").first().contains("Location: fridge");
    cy.get(".expiration").first().contains("Expiration Date: Saturday, September 03, 2022");
    cy.get(":nth-child(1) > .item-card > :nth-child(3) > .ate-button").contains("ATE")
    cy.get(":nth-child(1) > .item-card > :nth-child(3) > .donate-button").contains("DONATE")
});

  it('should have another correct item card with buttons', () => {
    cy.get(".item-card").eq(1).contains("Corn");
    cy.get(".item-card").eq(1).contains("Location: fridge");
    cy.get(".expiration").eq(1).contains("Expiration Date: Wednesday, September 07, 2022");
    cy.get(":nth-child(1) > .item-card > :nth-child(3) > .ate-button").contains("ATE");
    cy.get(":nth-child(1) > .item-card > :nth-child(3) > .donate-button").contains("DONATE");
  });

  it('be able to eat item', () => {
    cy.get(":nth-child(1) > .item-card > :nth-child(3) > .ate-button").click();
    cy.interceptGQL("https://waste-not-be.herokuapp.com/graphql", "deleteItem", {} )
  });

  it('be able to donate item', () => {
      const donationItem = {
      "data": {
        "getUserById": {
          "name": "Edward Schaden",
          "email": "joetta.adams@wolf-grimes.name",
          "donationItems": [ 
            {
              "id": 1,
              "expirationDate": "2022-05-11T00:00:00Z",
              "location": "fridge",
              "name": "Cauliflower",
              "forDonation": true
            }
          ]
        }
      }
    }
    cy.get(":nth-child(1) > .item-card > :nth-child(3) > .donate-button").click();
    cy.interceptGQL("https://waste-not-be.herokuapp.com/graphql", "updateForDonation", donationItem )
    // cy.interceptGQL("https://waste-not-be.herokuapp.com/graphql", "getUserById", fridgeData )
  });
});