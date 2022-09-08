describe('Donations Page', () => {

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
    cy.get('.title').contains('WASTE NOT, WANT NOT')
    cy.get('.navbar').find('label').should('have.length', 3)
    cy.get('.nav-header > .active > .nav-container > label').contains('Overview')
  })

  it('should have a section for donation items and a section for a food bank form.', () => {
    cy.get('h2').should('have.length', 2)
    cy.get('.food-bank-heading').contains('Food Banks')
    cy.get('.food-bank-form').should('exist')
    cy.get('.donations-heading').contains('Donations')
    cy.get('.item-card-container').should('have.length', 3)
  })

  it('should accept user input in the food bank form.', () => {
    cy.get('.food-bank-form').should('exist')
    cy.get('input').should('have.attr', 'placeholder', 'City, State Abbreviation (I.E. CO)')
    cy.get('input').type('Denver, CO').should('have.value', 'Denver, CO')
  })

  it('should have items to donate.', () => {
    cy.get('.donations-page > :nth-child(2) > :nth-child(3)').contains('Green Tea')
    cy.get('.item-card-container').last().contains('Location: FREEZER')
  })

  it('should be able to confirm donations, which will delete the items from the donation page.', () => {
    const deleteDonationItems = {
      "data": {
        "getUserById": {
          "name": "Edward Schaden",
          "email": "joetta.adams@wolf-grimes.name",
          "donationItems": [ ]
        }
      }
    }
    cy.interceptGQL("https://waste-not-be.herokuapp.com/graphql", "getUserById", deleteDonationItems)
    cy.get('.confirm-donations-button').click()
    cy.get('.item-card-container').should('have.length', 0)
    cy.get('.donations-container').should('not.contain', '2022-09-24T00:00:00Z')
    cy.get('.donations-container').should('not.contain', 'Gree Tea')
    cy.get('.donations-container').should('not.contain', 'Location: freezer')
  })

  it('should be able to look up information for a food bank based on the city and state.', () => {
    cy.get('input').type('Denver, CO')
    const foodBank = {
      "data": {
        "getFoodBank": {
          "address": "10700 E 45th Ave, Denver, CO 80239",
          "directions": "Directions: Start out going south on N Sherman St toward E 13th Ave, and continue for 0.109 Miles, Turn right onto E 13th Ave, and continue for 0.581 Miles, Turn right onto N Speer Blvd, and continue for 1.482 Miles, Merge onto I-25 N/US-85 N/US-6 E/US-87 N toward Ft Collins, and continue for 1.348 Miles, Merge onto I-70 E via EXIT 214A toward Limon, and continue for 7.496 Miles, Take the Havana Street exit, EXIT 280, and continue for 0.193 Miles, Merge onto Havana St, and continue for 0.31 Miles, Turn right onto E 45th Ave, and continue for 0.487 Miles, EAST 45TH AVENUE, and continue for 0 Miles",
          "name": "Food Bank of the Rockies",
          "phoneNumber": "(303) 371-9250"
        }
      }
    }
    cy.interceptGQL("https://waste-not-be.herokuapp.com/graphql", "getFoodBank", foodBank)
    cy.get('.submit-button').click()
    cy.get('.food-bank-info').contains('Food Bank of the Rockies')
    cy.get('.food-bank-info').contains('(303) 371-9250')
    cy.get('.food-bank-info').contains('10700 E 45th Ave, Denver, CO 80239')
  })

  it('should be able to look up information for a different food bank based on a different city and state', () => {
    cy.get('input').type('Denver, CO')
    const foodBank2 = {
      "data": {
        "getFoodBank": {
          "address": "6500 Metropolis Dr, Austin, TX 78744",
          "directions": "Start out going east on W 2Nd St toward Colorado St, and continue for 0.067 Miles, Turn right onto Colorado St, and continue for 0.067 Miles, Turn left onto W Cesar Chavez St, and continue for 0.57 Miles, Turn right onto N Interstate 35, and continue for 0.103 Miles, Merge onto I-35 S/US-290 W via the ramp on the left, and continue for 2.715 Miles, Merge onto TX-71 E via EXIT 230 toward Bastrop, and continue for 1.371 Miles, Take the exit toward Montopolis Dr, and continue for 0.355 Miles, Merge onto E Ben White Blvd, and continue for 1.063 Miles, Turn right onto Montopolis Dr, and continue for 0.504 Miles, Turn left onto Burleson Rd, and continue for 0.454 Miles, Turn left onto Metropolis Dr, and continue for 0.082 Miles, 6500 METROPOLIS DR is on the left, and continue for 0 Miles",
          "name": "Central Texas Food Bank",
          "phoneNumber": "(512) 282-2111"
        }
      }
    }
    cy.interceptGQL("https://waste-not-be.herokuapp.com/graphql", "getFoodBank", foodBank2)
    cy.get('.submit-button').click()
    cy.get('.food-bank-info').contains('Central Texas Food Bank')
    cy.get('.food-bank-info').contains('(512) 282-2111')
    cy.get('.food-bank-info').contains('Start out going east on W 2Nd St toward Colorado St, and continue for 0.067 Miles, Turn right onto Colorado St, and continue for 0.067 Miles, Turn left onto W Cesar Chavez St, and continue for 0.57 Miles, Turn right onto N Interstate 35, and continue for 0.103 Miles, Merge onto I-35 S/US-290 W via the ramp on the left, and continue for 2.715 Miles, Merge onto TX-71 E via EXIT 230 toward Bastrop, and continue for 1.371 Miles, Take the exit toward Montopolis Dr, and continue for 0.355 Miles, Merge onto E Ben White Blvd, and continue for 1.063 Miles, Turn right onto Montopolis Dr, and continue for 0.504 Miles, Turn left onto Burleson Rd, and continue for 0.454 Miles, Turn left onto Metropolis Dr, and continue for 0.082 Miles, 6500 METROPOLIS DR is on the left, and continue for 0 Miles')
  })

  it('should display an error message if network request fails.' , () => {
    cy.interceptGQL("https://waste-not-be.herokuapp.com/graphql", "getUserById")
    cy.visit('http://localhost:3000/expiring')
    cy.get('.error').should('have.text', 'Technical difficulties, please visit us later.')
  })
})