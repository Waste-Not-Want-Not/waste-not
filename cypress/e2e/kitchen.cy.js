describe('kitchen', () => {

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
    cy.visit('http://localhost:3000')
  });

  it('passes', () => {
    const items = {
      "data": {
          "getUserById": {
              "name": "Edward Schaden",
              "email": "joetta.adams@wolf-grimes.name",
              "items": [
                  {
                      "name": "Kudzu",
                      "expirationDate": "2022-09-11T00:00:00Z",
                      "location": "pantry",
                      "forDonation": false
                  },
                  {
                      "name": "Wheat",
                      "expirationDate": "2022-09-08T00:00:00Z",
                      "location": "pantry",
                      "forDonation": false
                  },
                  {
                      "name": "Pumpkin Seed",
                      "expirationDate": "2022-09-13T00:00:00Z",
                      "location": "pantry",
                      "forDonation": false
                  },
                  {
                      "name": "Mozzarella",
                      "expirationDate": "2022-09-04T00:00:00Z",
                      "location": "pantry",
                      "forDonation": false
                  },
                  {
                      "name": "Dashi",
                      "expirationDate": "2022-09-20T00:00:00Z",
                      "location": "pantry",
                      "forDonation": false
                  },
                  {
                      "name": "Cos Lettuce",
                      "expirationDate": "2022-09-26T00:00:00Z",
                      "location": "pantry",
                      "forDonation": false
                  },
                  {
                      "name": "Thyme",
                      "expirationDate": "2022-09-05T00:00:00Z",
                      "location": "pantry",
                      "forDonation": false
                  },
                  {
                      "name": "Incaberries",
                      "expirationDate": "2022-09-29T00:00:00Z",
                      "location": "freezer",
                      "forDonation": false
                  },
                  {
                      "name": "Plums",
                      "expirationDate": "2022-09-09T00:00:00Z",
                      "location": "freezer",
                      "forDonation": false
                  },
                  {
                      "name": "Wholewheat Flour",
                      "expirationDate": "2022-09-29T00:00:00Z",
                      "location": "freezer",
                      "forDonation": false
                  },
                  {
                      "name": "Common Cultivated Mushrooms",
                      "expirationDate": "2022-09-19T00:00:00Z",
                      "location": "freezer",
                      "forDonation": false
                  },
                  {
                      "name": "Pasta",
                      "expirationDate": "2022-09-21T00:00:00Z",
                      "location": "freezer",
                      "forDonation": false
                  },
                  {
                      "name": "White Wine Vinegar",
                      "expirationDate": "2022-09-07T00:00:00Z",
                      "location": "fridge",
                      "forDonation": false
                  },
                  {
                      "name": "Plums",
                      "expirationDate": "2022-09-07T00:00:00Z",
                      "location": "fridge",
                      "forDonation": false
                  },
                  {
                      "name": "Jewfish",
                      "expirationDate": "2022-09-09T00:00:00Z",
                      "location": "fridge",
                      "forDonation": false
                  },
                  {
                      "name": "Barley",
                      "expirationDate": "2022-09-05T00:00:00Z",
                      "location": "fridge",
                      "forDonation": false
                  },
                  {
                      "name": "Haloumi",
                      "expirationDate": "2022-08-31T00:00:00Z",
                      "location": "fridge",
                      "forDonation": false
                  },
                  {
                      "name": "Mastic",
                      "expirationDate": "2022-09-01T00:00:00Z",
                      "location": "fridge",
                      "forDonation": false
                  },
                  {
                      "name": "Tea",
                      "expirationDate": "2022-09-24T00:00:00Z",
                      "location": "fridge",
                      "forDonation": true
                  },
                  {
                      "name": "Green Tea",
                      "expirationDate": "2022-09-01T00:00:00Z",
                      "location": "pantry",
                      "forDonation": true
                  },
                  {
                      "name": "Zucchini",
                      "expirationDate": "2022-09-26T00:00:00Z",
                      "location": "freezer",
                      "forDonation": true
                  }
              ]
          }
      }
  }
    cy.interceptGQL("https://waste-not-be.herokuapp.com/graphql", "getUserById", items);
    cy.get('button').first().click()
  })
})