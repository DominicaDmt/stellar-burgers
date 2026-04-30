import './commands';

declare global {
  namespace Cypress {
    interface Chainable {
      setToken(): Chainable<void>;
      clearToken(): Chainable<void>;
    }
  }
}
