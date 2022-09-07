import donationsData from "../fixtures/possibleDonations_location.json"

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
    cy.interceptGQL("https://waste-not-be.herokuapp.com/graphql", "getUserById", donationsData );
    cy.visit('http://localhost:3000/expiring');
  });

  it('should have correct title', () => {
      cy.get("h3").contains("Possible Donations");
  });

  it('should have correct item card with buttons', () => {
    cy.get(".item-card").first().contains("Chicken");
    cy.get(".item-card").first().contains("Location: fridge");
    cy.get(".expiration").first().contains("Expiration Date: Saturday, September 03, 2022");
    cy.get(":nth-child(1) > .item-card > :nth-child(3) > .ate-button").contains("ATE")
    cy.get(":nth-child(1) > .item-card > :nth-child(3) > .donate-button").contains("DONATE")
});

  it('should have another correct item card with buttons', () => {
    cy.interceptGQL("https://waste-not-be.herokuapp.com/graphql", "getUserById", donationsData )
    cy.get(".item-card").eq(1).contains("Corn");
    cy.get(".item-card").eq(1).contains("Location: pantry");
    cy.get(".expiration").eq(1).contains("Expiration Date: Wednesday, September 07, 2022");
    cy.get(":nth-child(1) > .item-card > :nth-child(3) > .ate-button").contains("ATE");
    cy.get(":nth-child(1) > .item-card > :nth-child(3) > .donate-button").contains("DONATE");
  });

  it('be able to eat item', () => {
    cy.interceptGQL("https://waste-not-be.herokuapp.com/graphql", "deleteItem", {} )
    cy.get(":nth-child(1) > .item-card > :nth-child(3) > .ate-button").click();
  });

  it('be able to donate item', () => {
    cy.interceptGQL("https://waste-not-be.herokuapp.com/graphql", "updateForDonation", {} )
    cy.get(":nth-child(1) > .item-card > :nth-child(3) > .donate-button").click();
  });
});