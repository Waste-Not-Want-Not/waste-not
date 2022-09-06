describe('overview',() => {
    beforeEach(() => {
        cy.visit('http://localhost:3000/')
    })

    it('should have correct header', () => {
        cy.get('.title').contains('Waste Not, Want Not')
        cy.get('button').first().contains('MY KITCHEN')
        cy.get('button').eq(1).contains('Overview')
        cy.get('button').eq(2).contains('DONATION PAGE')
    })

    it('should have correct overview information', () => {
        cy.get('p').first().contains("Have you ever bought food that ends up sitting in your freezer too long, expires, or goes to waste because you didn't eat it in time? Of course you have, we all do sometimes. However, what can we do with this food that we don't end up eating? Welcome to Waste Not, Want Not.")
        cy.get('p').eq(1).contains('You can use Waste Not, Want Not to track the food that you purchase, expiration dates, and get connected to local food banks to donate your unwanted food. Upon the purchase of food items, you can upload the details (Name, Location, and Expiration Date) to your virtual kitchen. Click the ADD NEW FOOD button to do so. You can add food to your virtual Pantry, Fridge, and Freezer. After food has been added to these locations, you can visit each by clicking them to see the food that you currently have in stock')
        cy.get('p').eq(2).contains('To see expired or soon to expire food, click the SHOW POSSIBLE DONATIONS button. If you have eaten a food, click the ATE button on a food item. If you have decided that you no longer want a food item, click the DONATE button on a food item. To visit the donation page click on the DONATION PAGE button. Once here, you can enter your city and state to see the nearest local food bank for your donations. You will be given information about the food bank including directions to said food bank. After dropping off your food at the food bank, you can click the CONFIRM DONATIONS button on the donation page. This will update your virtual kitchen for you.')
        cy.get('h1').contains("Let's work together to mitigate food waste!")
    })

    it('should have button to continue to kitchen',() => {
        cy.get('button').last().contains('Continue To Your Kitchen').click()
        cy.url().should('eq', 'http://localhost:3000/mykitchen')
    })
})