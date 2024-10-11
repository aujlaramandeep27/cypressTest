import LoginPage from '../support/pageObjects/LoginPage';
import SignupPage from '../support/pageObjects/SignupPage';

describe('Signup Tests', () => {
  
  beforeEach(() => {
    cy.on('uncaught:exception', (er, runnable) => {
      return false
    })
    LoginPage.visit();
    cy.title().should('eq', 'nesto');
  })

  it('should open sign up form for new account', () => {
    SignupPage.signup();
  });

  // it('should log in successfully with valid credentials', () => {
  //   SignupPage.fillUsername('validUser');
  //   SignupPage.fillPassword('validPassword');
  //   SignupPage.submit();
  // });

  // it('should show error message for invalid credentials', () => {
  //   SignupPage.fillUsername('invalidUser');
  //   SignupPage.fillPassword('invalidPassword');
  //   SignupPage.submit();
  //   SignupPage.getErrorMessage().should('contain', 'Invalid credentials');
  // });
});
