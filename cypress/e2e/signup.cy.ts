import LoginPage from '../support/pageObjects/LoginPage';
import SignupPage from '../support/pageObjects/SignupPage';

interface SignUpTestData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
  province: string;
  constent: string;
}

describe('Signup Tests', () => {
  let requiredTestData: SignUpTestData[];

  beforeEach(() => {
    cy.on('uncaught:exception', (er, runnable) => {
      return false
    });
    LoginPage.visit();
    cy.title().should('eq', 'nesto');
    LoginPage.signup();
  });

  it('should open sign up form for new account', () => {
    SignupPage.validateSignUpFormOpen();
  });

  context('Invalid Signup Tests', () => {
    
    before(() => {
      cy.fixture('signUpInvalid').then((data: SignUpTestData[]) => {
        requiredTestData = data;
      });
    });

    it('should contain first name required', () => {
      const input = requiredTestData[0];
      SignupPage.fillFormAndSubmit(input.firstName, input.lastName, input.email, input.phone, input.password, input.confirmPassword, input.province, input.constent);
      SignupPage.shouldContainFirstNameRequired();
    });

    it('should contain last name required', () => {
      const input = requiredTestData[1];
      SignupPage.fillFormAndSubmit(input.firstName, input.lastName, input.email, input.phone, input.password, input.confirmPassword, input.province, input.constent);
      SignupPage.shouldContainLastNameRequired();
    });

  });
  
});
