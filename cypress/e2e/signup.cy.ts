import e2e from '../support/e2e';
import LoginPage from '../support/pageObjects/LoginPage';
import SignupPage from '../support/pageObjects/SignupPage';

describe('Signup Tests', () => {
  const testData = {
    firstName: "test",
    lastName: "test",
    email: "tes@testdotcom",
    phone: "1234567890",
    password: "TestUser1234",
    confirmPassword: "TestUser123",
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
      it(`Firstname value '${input.firstName}' should show error ${input.expectedError}`, () => {
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
      it(`Lastname value '${input.lastName}' should show error ${input.expectedError}`, () => {
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
      it(`Email value '${input.email}' should show error ${input.expectedError}`, () => {
        SignupPage.fillForm(input.firstName, input.lastName, input.email, input.phone, input.password, input.confirmPassword, input.province, input.constent);
        SignupPage.submit();
        SignupPage.shouldContainEmailError(input.expectedError);
      });
    });
  });

  context('Invalid Phone Number Tests', () => {

    let phoneEmpty = JSON.parse(JSON.stringify(testData));
    phoneEmpty.phone = "";
    phoneEmpty.expectedError = "Required";

    let phoneSpace = JSON.parse(JSON.stringify(testData));
    phoneSpace.phone = "{ }";
    phoneSpace.expectedError = "Required";

    const invalidPhones = [phoneEmpty, phoneSpace];

    invalidPhones.forEach((input) => {
      it(`Phone number value '${input.phone}' should show error ${input.expectedError}`, () => {
        SignupPage.fillForm(input.firstName, input.lastName, input.email, input.phone, input.password, input.confirmPassword, input.province, input.constent);
        SignupPage.submit();
        SignupPage.shouldContainPhoneNumberError(input.expectedError);
      });
    });
  });

  context('Non numeric Phone Number Tests', () => {

    let phoneShort = JSON.parse(JSON.stringify(testData));
    phoneShort.phone = "1";
    phoneShort.expectedValue = "1__-___-____";

    let phoneLong = JSON.parse(JSON.stringify(testData));
    phoneLong.phone = "98765432012";
    phoneLong.expectedValue = "987-654-3201";

    let phoneWithLetters = JSON.parse(JSON.stringify(testData));
    phoneWithLetters.phone = "1234ABC890";
    phoneWithLetters.expectedValue = "123-489-0___";

    let phoneWithInvalidChars = JSON.parse(JSON.stringify(testData));
    phoneWithInvalidChars.phone = "123#456789";
    phoneWithInvalidChars.expectedValue = "123-456-789_";

    let phoneWithInvalidFormat = JSON.parse(JSON.stringify(testData));
    phoneWithInvalidFormat.phone = "123/456/7890";
    phoneWithInvalidFormat.expectedValue = "123-456-7890";

    const phoneCases = [phoneShort, phoneLong, phoneWithLetters, phoneWithInvalidChars, phoneWithInvalidFormat];

    phoneCases.forEach((input) => {
      it(`Phone number value '${input.phone}' should accept value ${input.expectedValue}`, () => {
        SignupPage.fillForm(input.firstName, input.lastName, input.email, input.phone, input.password, input.confirmPassword, input.province, input.constent);
        SignupPage.submit();
        SignupPage.shouldHavePhoneNumber(input.expectedValue);
      });
    });
  });

  context('Invalid Password Tests', () => {

    let passwordEmpty = JSON.parse(JSON.stringify(testData));
    passwordEmpty.password = "";
    passwordEmpty.expectedError = "Required";

    let passwordSpace = JSON.parse(JSON.stringify(testData));
    passwordSpace.password = "{ }";
    passwordSpace.expectedError = "Your password is too weak";

    let passwordShort = JSON.parse(JSON.stringify(testData));
    passwordShort.password = "TestUser123";
    passwordShort.expectedError = "Your password is too weak";

    let passwordLong = JSON.parse(JSON.stringify(testData));
    passwordLong.password = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()";
    passwordLong.expectedError = "Your password is too weak";

    let passwordNoUpperCase = JSON.parse(JSON.stringify(testData));
    passwordNoUpperCase.password = "testuser1234";
    passwordNoUpperCase.expectedError = "Your password is too weak";

    let passwordNoLowerCase = JSON.parse(JSON.stringify(testData));
    passwordNoLowerCase.password = "TESTUSER1234";
    passwordNoLowerCase.expectedError = "Your password is too weak";

    let passwordNoNumber = JSON.parse(JSON.stringify(testData));
    passwordNoNumber.password = "TestUserOneTwo";
    passwordNoNumber.expectedError = "Your password is too weak";

    const invalidPasswords = [passwordEmpty, passwordSpace, passwordShort, passwordLong, passwordNoUpperCase, passwordNoLowerCase, passwordNoNumber];

    invalidPasswords.forEach((input) => {
      it(`Password value '${input.password}' should show error ${input.expectedError}`, () => {
        SignupPage.fillForm(input.firstName, input.lastName, input.email, input.phone, input.password, input.confirmPassword, input.province, input.constent);
        SignupPage.submit();
        SignupPage.shouldContainPasswordError(input.expectedError);
      });
    });
  });

  context('Invalid Confirm Password Tests', () => {

    let confirmPasswordEmpty = JSON.parse(JSON.stringify(testData));
    confirmPasswordEmpty.confirmPassword = "";
    confirmPasswordEmpty.expectedError = "Required";

    let confirmPasswordSpace = JSON.parse(JSON.stringify(testData));
    confirmPasswordSpace.confirmPassword = "{ }";
    confirmPasswordSpace.expectedError = "Your passwords do not match";

    let confirmPasswordDiff = JSON.parse(JSON.stringify(testData));
    confirmPasswordDiff.password = "TestUser1234";
    confirmPasswordDiff.confirmPassword = "TestUser5678";
    confirmPasswordDiff.expectedError = "Your passwords do not match";

    let confirmPasswordDiffCase = JSON.parse(JSON.stringify(testData));
    confirmPasswordDiffCase.password = "TestUser1234";
    confirmPasswordDiffCase.confirmPassword = "Testuser1234";
    confirmPasswordDiffCase.expectedError = "Your passwords do not match";

    let confirmPasswordAndPasswordEmpty = JSON.parse(JSON.stringify(testData));
    confirmPasswordAndPasswordEmpty.password = "";
    confirmPasswordAndPasswordEmpty.confirmPassword = "";
    confirmPasswordAndPasswordEmpty.expectedError = "Required";

    const invalidConfirmPasswords = [confirmPasswordEmpty, confirmPasswordSpace, confirmPasswordDiff, confirmPasswordDiffCase, confirmPasswordAndPasswordEmpty];

    invalidConfirmPasswords.forEach((input) => {
      it(`Confirm password value '${input.password}' should show error ${input.expectedError}`, () => {
        SignupPage.fillForm(input.firstName, input.lastName, input.email, input.phone, input.password, input.confirmPassword, input.province, input.constent);
        SignupPage.submit();
        SignupPage.shouldContainConfirmPasswordError(input.expectedError);
      });
    });
  });
      
  it('Unknown province should take default value', () => {
    let input = JSON.parse(JSON.stringify(testData));
    input.province = "Unknown";
    input.expectedValue = "Ontario";

    SignupPage.fillForm(input.firstName, input.lastName, input.email, input.phone, input.password, input.confirmPassword, "", input.constent);
    SignupPage.typeProvince(input.province);
    SignupPage.submit();
    SignupPage.shouldHaveProvince(input.expectedValue);
  });
    
});
