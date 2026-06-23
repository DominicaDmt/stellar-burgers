/// <reference types="cypress" />

declare namespace Cypress {
  interface Chainable {
    setToken(): Chainable<void>;
    clearToken(): Chainable<void>;
  }
}

Cypress.Commands.add('setToken', () => {
  localStorage.setItem('refreshToken', 'test-refresh-token');
  cy.setCookie('accessToken', 'test-access-token');
});

Cypress.Commands.add('clearToken', () => {
  localStorage.removeItem('refreshToken');
  cy.clearCookie('accessToken');
});
