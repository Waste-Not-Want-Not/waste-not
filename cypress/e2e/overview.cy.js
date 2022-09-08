import data from '../fixtures/kitchen_data.json'

describe('overview',() => {

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
        cy.visit('http://localhost:3000/')
    })

    it('should have correct navbar', () => {
        cy.get('.title').contains('WASTE NOT, WANT NOT')
        cy.get('.navbar > [href="/mykitchen"] > .nav-container > label').contains('My Kitchen')
        cy.get('.active > .nav-container > label').contains('Overview')
        cy.get('[href="/donations"] > .nav-container > label').contains('Donation Page')
    })

    it('should navigate to correct pages from navbar',() => {
        cy.get('.navbar > [href="/mykitchen"] > .nav-container').click()
        cy.url().should('eq', 'http://localhost:3000/mykitchen')
        cy.get('[href="/donations"] > .nav-container > label').click()
        cy.url().should('eq', 'http://localhost:3000/donations')
    })

    it('should have correct overview information', () => {
        cy.get('p').first().contains("Have you ever bought food that ends up sitting in your freezer too long, expires, or goes to waste because you didn't eat it in time? Of course you have, we all do sometimes. However, what can we do with this food that we don't end up eating? Welcome to Waste Not, Want Not.")
        cy.get('p').eq(1).contains('You can use Waste Not, Want Not to track the food that you purchase, expiration dates, and get connected to local food banks to donate your unwanted food. Upon the purchase of food items, you can upload the details (Name, Location, and Expiration Date) to your virtual kitchen. On the My Kitchen page fill out the information, and click the ADD NEW FOOD button to add it to your virtual Pantry, Fridge, or Freezer. After food has been added to these locations, you can visit each by clicking them to see the food that you currently have in stock.')
        cy.get('p').eq(2).contains('To see expired or soon to expire food, click the SHOW POSSIBLE DONATIONS button. If you have eaten a food, click the ATE button on a food item. If you have decided that you no longer want a food item, click the DONATE button on a food item. To visit the donation page click on the DONATION PAGE button. Once here, you can enter your city and state to see the nearest local food bank for your donations. You will be given information about the food bank including directions to said food bank. After dropping off your food at the food bank, you can click the CONFIRM DONATIONS button on the donation page. This will update your virtual kitchen for you. Should you need to see these instructions again, just click the OVERVIEW button right under the application title.')
        cy.get('h1').contains("Let's work together to mitigate food waste!")
    })

    it('should have button to continue to kitchen',() => {
        cy.interceptGQL("https://waste-not-be.herokuapp.com/graphql", "getUserById", data);
        cy.get('.overview > a > .nav-container').click()
        cy.url().should('eq', 'http://localhost:3000/mykitchen')
    })
})