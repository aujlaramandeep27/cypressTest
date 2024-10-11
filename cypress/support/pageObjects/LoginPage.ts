class LoginPage {
    visit() {
      cy.visit('/login');
    }
  }
  
  export default new LoginPage();
  