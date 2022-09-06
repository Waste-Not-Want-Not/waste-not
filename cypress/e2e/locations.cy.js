describe('Test Pantry View',() => {
  beforeEach(() => {
      cy.visit('http://localhost:3000/mykitchen');
      
  });

  it('should have a title', () => {
      cy.get(".title").contains("Waste Not, Want Not");
  });

})