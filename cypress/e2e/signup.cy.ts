import e2e from '../support/e2e';
import LoginPage from '../support/pageObjects/LoginPage';
import SignupPage from '../support/pageObjects/SignupPage';

describe('Signup Tests', () => {
  const testData = {
    firstName: "test",
    lastName: "test",
    email: "tes@testdotcom",
    phone: "1234567890",
    password: "Test123456789",
    confirmPassword: "Test123456789",
    province: "Quebec",
    constent: "false"
  };

  beforeEach(() => {
    cy.on('uncaught:exception', (er, runnable) => {
      return false
    });
    LoginPage.visit();
    cy.title().should('eq', 'nesto');
    LoginPage.signup();
  });

  it('should open sign up form for new account', () => {
    SignupPage.validateFormOpen();
    SignupPage.validateFieldLabels();
  });

  context('Invalid First Name Tests', () => {

    let firstNameEmpty = JSON.parse(JSON.stringify(testData));
    firstNameEmpty.firstName = "";
    firstNameEmpty.expectedError = "Required";

    let firstNameSpace = JSON.parse(JSON.stringify(testData));
    firstNameSpace.firstName = "{ }";
    firstNameSpace.expectedError = "Required";

    let firstNameShort = JSON.parse(JSON.stringify(testData));
    firstNameShort.firstName = "A";
    firstNameShort.expectedError = "Too few characters";

    let firstNameLong = JSON.parse(JSON.stringify(testData));
    firstNameLong.firstName = e2e.generateRandomStringWithSpecialChars(257);
    firstNameLong.expectedError = "Too many characters";

    let firstNameWithNumbers = JSON.parse(JSON.stringify(testData));
    firstNameWithNumbers.firstName = "Testuser123";
    firstNameWithNumbers.expectedError = "Contains invalid characters";

    let firstNameWithSpecialChars = JSON.parse(JSON.stringify(testData));
    firstNameWithSpecialChars.firstName = "Test@user!";
    firstNameWithSpecialChars.expectedError = "Contains invalid characters";

    const invalidFirstNames = [firstNameEmpty, firstNameSpace, firstNameShort, firstNameLong, firstNameWithNumbers, firstNameWithSpecialChars];

    invalidFirstNames.forEach((input) => {
      it(`should show error ${input.expectedError}`, () => {
        SignupPage.fillForm(input.firstName, input.lastName, input.email, input.phone, input.password, input.confirmPassword, input.province, input.constent);
        SignupPage.submit();
        SignupPage.shouldContainFirstNameError(input.expectedError);
      });
    });
  });

  context('Invalid Last Name Tests', () => {

    let lastNameEmpty = JSON.parse(JSON.stringify(testData));
    lastNameEmpty.lastName = "";
    lastNameEmpty.expectedError = "Required";

    let lastNameSpace = JSON.parse(JSON.stringify(testData));
    lastNameSpace.lastName = "{ }";
    lastNameSpace.expectedError = "Required";

    let lastNameShort = JSON.parse(JSON.stringify(testData));
    lastNameShort.lastName = "A";
    lastNameShort.expectedError = "Too few characters";

    let lastNameLong = JSON.parse(JSON.stringify(testData));
    lastNameLong.lastName = e2e.generateRandomStringWithSpecialChars(257);
    lastNameLong.expectedError = "Too many characters";

    let lastNameWithNumbers = JSON.parse(JSON.stringify(testData));
    lastNameWithNumbers.lastName = "Testuser123";
    lastNameWithNumbers.expectedError = "Contains invalid characters";

    let lastNameWithSpecialChars = JSON.parse(JSON.stringify(testData));
    lastNameWithSpecialChars.lastName = "Test@user!";
    lastNameWithSpecialChars.expectedError = "Contains invalid characters";

    const invalidLastNames = [lastNameEmpty, lastNameSpace, lastNameShort, lastNameLong, lastNameWithNumbers, lastNameWithSpecialChars];

    invalidLastNames.forEach((input) => {
      it(`should show error ${input.expectedError}`, () => {
        SignupPage.fillForm(input.firstName, input.lastName, input.email, input.phone, input.password, input.confirmPassword, input.province, input.constent);
        SignupPage.submit();
        SignupPage.shouldContainLastNameError(input.expectedError);
      });
    });
  });

  context('Invalid Email Tests', () => {

    let emailEmpty = JSON.parse(JSON.stringify(testData));
    emailEmpty.email = "";
    emailEmpty.expectedError = "Required";

    let emailSpace = JSON.parse(JSON.stringify(testData));
    emailSpace.email = "{ }";
    emailSpace.expectedError = "Required";

    let emailShort = JSON.parse(JSON.stringify(testData));
    emailShort.email = "t@u.c";
    emailShort.expectedError = "Invalid email address";

    let emailLong = JSON.parse(JSON.stringify(testData));
    emailLong.email = `${e2e.generateRandomStringWithSpecialChars(247)}@test.com`;
    emailLong.expectedError = "Invalid email address";

    let emailWithoutAt = JSON.parse(JSON.stringify(testData));
    emailWithoutAt.email = "Testuser.com";
    emailWithoutAt.expectedError = "Invalid email address";

    let emailWithMultipleAt = JSON.parse(JSON.stringify(testData));
    emailWithMultipleAt.email = "Test@user@co.in";
    emailWithMultipleAt.expectedError = "Invalid email address";

    let emailWithSpecialChars = JSON.parse(JSON.stringify(testData));
    emailWithSpecialChars.email = "test!#$%&'*+/=?^_{|}~@user.com";
    emailWithSpecialChars.expectedError = "Invalid email address";

    let emailWithInvalidChars = JSON.parse(JSON.stringify(testData));
    emailWithInvalidChars.email = "test!@user.com";
    emailWithInvalidChars.expectedError = "Invalid email address";

    let emailWithoutUsername = JSON.parse(JSON.stringify(testData));
    emailWithoutUsername.email = "@user.com";
    emailWithoutUsername.expectedError = "Invalid email address";

    let emailWithoutDomainName = JSON.parse(JSON.stringify(testData));
    emailWithoutDomainName.email = "test@.com";
    emailWithoutDomainName.expectedError = "Invalid email address";

    let emailWithConsecutiveDots = JSON.parse(JSON.stringify(testData));
    emailWithConsecutiveDots.email = "test@user..com";
    emailWithConsecutiveDots.expectedError = "Invalid email address";

    const invalidEmails = [emailEmpty, emailSpace, emailShort, emailLong, emailWithoutAt, emailWithMultipleAt];

    invalidEmails.forEach((input) => {
      it(`should show error ${input.expectedError}`, () => {
        SignupPage.fillForm(input.firstName, input.lastName, input.email, input.phone, input.password, input.confirmPassword, input.province, input.constent);
        SignupPage.submit();
        SignupPage.shouldContainEmailError(input.expectedError);
      });
    });
  });
    
});
