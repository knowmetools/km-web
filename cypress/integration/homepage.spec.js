describe('Homepage', () => {
  it('Should display a 404 page', () => {
    cy.visit('/');
    cy.contains('Page Not Found');
  });
});
