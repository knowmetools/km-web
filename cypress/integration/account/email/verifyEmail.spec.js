describe('Email Verification', () => {
  it('should allow for verifying an email address using the token from the URL', () => {
    const email = 'test@example.com';
    const token = 'abc123';

    cy.server();
    cy.route('POST', '**/account/verify-email/', { email });

    cy.visit(`/verify-email/${token}`);
    cy.get('[data-test-id="verify-email-btn"]').click();

    cy.contains('Email Verified');
  });

  it('should display an error message containing returned errors', () => {
    const error = 'The provided verification key is invalid.';

    cy.server();
    cy.route({
      method: 'POST',
      response: { non_field_errors: [error] },
      status: 400,
      url: '**/account/verify-email/',
    });

    cy.visit('/verify-email/invalid-token');
    cy.get('[data-test-id="verify-email-btn"]').click();

    cy.contains(error);
  });
});
