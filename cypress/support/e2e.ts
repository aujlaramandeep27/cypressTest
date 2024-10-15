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

    shouldContainError(testId: string, message: string) {
        cy.get(`[data-test-id="${testId}"]`)
        .contains('span', message);
    }

    generateRandomString(length: number): string {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let result = '';
      
        for (let i = 0; i < length; i++) {
          const randomIndex = Math.floor(Math.random() * characters.length);
          result += characters[randomIndex];
        }
      
        return result;
    }

    generateRandomStringWithSpecialChars(length: number): string {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()';
        let result = '';
      
        for (let i = 0; i < length; i++) {
          const randomIndex = Math.floor(Math.random() * characters.length);
          result += characters[randomIndex];
        }
      
        return result;
    }

    lowercaseExceptFirst(str: string): string {
        if (str.length === 0) return str; // Handle empty string
        
        const firstChar = str.charAt(0).toUpperCase(); // Uppercase the first character
        const restOfString = str.slice(1).toLowerCase(); // Lowercase the rest of the string
        
        return firstChar + restOfString; // Concatenate and return
    }
}

export default new e2e();