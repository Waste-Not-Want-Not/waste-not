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
    const items = {
        "data": {
          "getUserById": {
            "name": "Edward Schaden",
            "email": "joetta.adams@wolf-grimes.name",
            "items": [
              {
                "expirationDate": "2022-05-11T00:00:00Z",
                "location": "fridge",
                "name": "Cauliflower",
                "forDonation": false
              },
              {
                "name": "Cheetos",
                "expirationDate": "2022-08-03T00:00:00Z",
                "location": "pantry",
                "forDonation": false
              },
              {
                "expirationDate": "2022-08-17T00:00:00Z",
                "location": "freezer",
                "name": "Ice Cream",
                "forDonation": false
              },
              {
                "name": "Chocolate Bunnies",
                "expirationDate": "2022-08-30T00:00:00Z",
                "location": "pantry",
                "forDonation": false
              },
              {
                "expirationDate": "2022-08-31T00:00:00Z",
                "location": "fridge",
                "name": "Haloumi",
                "forDonation": false
              },
              {
                "name": "Plums",
                "expirationDate": "2022-09-09T00:00:00Z",
                "location": "freezer",
                "forDonation": false
              }
            ]
          }
        }
      }
    cy.interceptGQL("https://waste-not-be.herokuapp.com/graphql", "getUserById", items)
    cy.visit('http://localhost:3000/expiring')
  });
  
  it('should have a Navbar with a heading, and three different navigation buttons', () => {
    cy.get('.title').contains('Waste Not, Want Not')
    cy.get('.navbar').find('button').should('have.length', 3)
    cy.get('[href="/mykitchen"] > .nav-button').contains('MY KITCHEN')
  })
})