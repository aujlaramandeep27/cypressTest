class e2e {
    getByTestId(testId: string) {
        return cy.get(`[data-test-id="${testId}"]`);
    }

    getLabelByTestId(testId: string) {
        return cy.get(`[data-test-id="input_label-${testId}"]`);
    }

    clearAndFillField(testId: string, value: string) {
        cy.get(`[data-test-id="${testId}"]`).then(($field) => {
            cy.wrap($field).clear();
            if(value != ""){
                cy.wrap($field).type(value);
            }
        })
    }

    shouldContainRequired(testId: string) {
        cy.get(`[data-test-id="${testId}"]`)
        .find('[data-test-id="validation_errors_isRequired"]')
        .should('contain.text', 'Required');
    }
}

export default new e2e();