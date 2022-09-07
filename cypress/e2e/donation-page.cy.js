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

  it('should have a Navbar with a heading, and three different navigation buttons.', () => {
    cy.get('.title').contains('Waste Not, Want Not')
    cy.get('.navbar').find('button').should('have.length', 3)
    cy.get('.nav-header > .active > button').contains('Overview')
  })

  it('should have a section for donation items and a section for a food bank form.', () => {
    cy.get('h3').should('have.length', 2)
    cy.get('.food-bank-heading').contains('Food Banks')
    cy.get('.food-bank-form').should('exist')
    cy.get('.donations-heading').contains('Donations')
    cy.get('.item-card-container').should('have.length', 3)
  })

  it('should accept user input in the food bank form.', () => {
    cy.get('.food-bank-form').should('exist')
    cy.get('input').should('have.attr', 'placeholder', 'City, State')
    cy.get('input').type('Denver, CO').should('have.value', 'Denver, CO')
  })

  it.only('should have items to donate', () => {
    cy.get('.item-card-container').first()
  })
})