describe('Possible Donations Page', () => {

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
    const donationItems = {
        "data": {
          "getUserById": {
            "name": "Edward Schaden",
            "email": "joetta.adams@wolf-grimes.name",
            "donationItems": [
              {
                "expirationDate": "2022-09-24T00:00:00Z",
                "location": "fridge",
                "name": "Tea",
                "forDonation": true
              },
              {
                "name": "Green Tea",
                "expirationDate": "2022-09-01T00:00:00Z",
                "location": "pantry",
                "forDonation": true
              },
              {
                "expirationDate": "2022-09-26T00:00:00Z",
                "location": "freezer",
                "name": "Zucchini",
                "forDonation": true
              }
            ]
          }
        }
      }
    cy.interceptGQL("https://waste-not-be.herokuapp.com/graphql", "getUserById", donationItems)
    cy.visit('http://localhost:3000/donations')
  })

  it('should have a Navbar with a heading, and three different navigation buttons', () => {
    cy.get('.title').contains('Waste Not, Want Not')
    cy.get('.navbar').find('button').should('have.length', 3)
    cy.get('[href="/mykitchen"] > .nav-button').contains('MY KITCHEN')
  })
})