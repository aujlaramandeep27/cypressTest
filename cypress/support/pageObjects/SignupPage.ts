class SignupPage {
    signup() {
        cy.get('span[id="loginPage_signUp"]')
        .contains('span', 'Sign up')
        .click();
    }
  
    // span id = loginPage_signUp > span with text Sign up

    // fillUsername(username: string) {
    //   cy.get('input[name="username"]').type(username);
    // }
  
    // fillPassword(password: string) {
    //   cy.get('input[name="password"]').type(password);
    // }
  
    // submit() {
    //   cy.get('button[type="submit"]').click();
    // }
  
    // getErrorMessage() {
    //   return cy.get('.error-message');
    // }
  }
  
  export default new SignupPage();
  