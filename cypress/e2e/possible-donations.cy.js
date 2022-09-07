import items from '../fixtures/possible-donations-fixture.json';

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
    cy.interceptGQL("https://waste-not-be.herokuapp.com/graphql", "getUserById", items)
    cy.visit('http://localhost:3000/expiring')
  });
  
  it('should have a Navbar with a heading, and three different navigation buttons', () => {
    cy.get('.title').contains('Waste Not, Want Not')
    cy.get('.navbar').find('button').should('have.length', 3)
    cy.get('[href="/mykitchen"] > .nav-button').contains('MY KITCHEN')
  })

  it('should have a page heading of Possible Donations', () => {
    cy.get('h3').contains('Possible Donations')
  })

  it('should have items that have already expirerd or are going to expire soon', () => {
    cy.get('.item-card-container').should('have.length', 6)
    cy.get('.item-card').first().contains('Cauliflower')
    cy.get('.item-card').last().contains('Location: freezer')
    cy.get(':nth-child(2) > .expiration').contains('Expiration Date: Tuesday, August 02, 2022')
    cy.get(':nth-child(5) > .expiration').contains('Expiration Date: Tuesday, August 30, 2022')
  })

  it('shave have an Ate and Donate button on every item card', () => {
    cy.get('.item-card').find('.ate-button').should('have.length', 6)
    cy.get('.item-card').find('.donate-button').should('have.length', 6)
  })

  // it.only('should inform the user that the page is loading prior to the data rendering', () => {
  //   cy.visit('http://localhost:3000/mykitchen')
  //   cy.get('.kitchen-button').click()
  //   cy.get('h2')
  // })

  it('should display an error message if network request fails' , () => {
    cy.interceptGQL("https://waste-not-be.herokuapp.com/graphql", "getUserById")
    cy.visit('http://localhost:3000/expiring')
    cy.get('.error-message').should('have.text', 'Technical difficulties, please visit us later.')
  })
})