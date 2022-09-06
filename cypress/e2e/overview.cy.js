describe('overview',() => {
    beforeEach(() => {
        cy.visit('http://localhost:3000/')
    })

    it('should have a title', () => {
        cy.get(".title").contains("Waste Not, Want Not")
    })

})