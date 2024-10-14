class LoginPage {
    visit() {
      cy.visit('/login');
    }

    signup() {
      cy.get('[data-test-id="loginPage_signUp"]')
      .contains('span', 'Sign up')
      .click();
    }
  }
  
  export default new LoginPage();
  