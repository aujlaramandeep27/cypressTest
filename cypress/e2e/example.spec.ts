import { Runnable } from "mocha";

// cypress/e2e/example.spec.ts
describe('My First Test', () => {
  
  beforeEach(() => {
    cy.on('uncaught:exception', (er, Runnable) => {
      return false
    })
  })

  it('Visits the app', () => {
    cy.visit('/');
    cy.contains('Welcome'); // Adjust according to your app's content
  });
});
