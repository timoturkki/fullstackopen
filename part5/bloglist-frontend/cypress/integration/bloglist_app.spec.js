describe('Bloglist', function() {
  it('should allow front page to be opened', function() {
    cy.visit('http://localhost:3000');
    cy.contains('Welcome to browse some blogs!');
  });
});