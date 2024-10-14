declare namespace Cypress {
    interface Chainable {
        getByDataTestId(dataTestAttribute: string): Chainable<JQuery<HTMLElement>>
    }
}

Cypress.Commands.add("getByDataTestId", (testId: string) => {
return cy.get(`[data-test-id="${testId}"]`)
})
