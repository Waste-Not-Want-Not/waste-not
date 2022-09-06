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
    cy.interceptGQL("https://waste-not-be.herokuapp.com/graphql", "getUserById", {fixture: 'possibleDonations'});
    cy.visit('http://localhost:3000/expiring')
  });

  it('passes', () => {
    cy.get('button').first().click()
  })
})