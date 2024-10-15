import { getLanguageStrings } from '../support/languageStrings';
import { Language } from '../support/languageTypes';
import e2e from '../support/e2e';
import LanguageSwitcher from '../support/pageObjects/languageSwitcher';
import LoginPage from '../support/pageObjects/LoginPage';
import SignupPage from '../support/pageObjects/SignupPage';

describe('Signup Tests', () => {
  // Get the language from environment variables
  const language:Language = (Cypress.env('LANGUAGE') as Language|| 'fr'); // Default to English
  const strings = getLanguageStrings(language);

  const testData = {
    firstName: "test",
    lastName: "test",
    email: "tes@testdotcom",
    phone: "1234567890",
    password: "TestUser1234",
    confirmPassword: "TestUser123",
    province: strings.qc,
    constent: "false"
  };

  beforeEach(() => {
    cy.on('uncaught:exception', (err, runnable) => {
      return false
    });
    
    LoginPage.visit();
    cy.title().should('eq', 'nesto');

    // Set the language in the UI based on the environment variable
    LanguageSwitcher.switchLang(language);

    LoginPage.signup();
  });

  it('should open sign up form for new account with expected labels', () => {
    SignupPage.validateFormOpen(strings.signupTitle);

    // validate labels
    SignupPage.validateFirstNameLabel(strings.firstName);
    SignupPage.validateLastNameLabel(strings.lastName);
    SignupPage.validateEmailLabel(strings.email);
    SignupPage.validatePhoneLabel(strings.mobilePhoneNumber);
    SignupPage.validatePasswordLabel(strings.password);
    SignupPage.validatePasswordComplexityLabel(strings.passwordComplexity);
    SignupPage.validateConfirmPasswordLabel(strings.confirmpassword);
    SignupPage.validateProvinceLabel(strings.province);
    SignupPage.validateProvinceDefaultValue(strings.on);
    SignupPage.validateAgreementLabel(strings.agreement);
    SignupPage.validateReadPolicyLabel(strings.readPolicy);
    SignupPage.validateCreateAccountLabel(strings.createYourAccount);
    SignupPage.validateCreateAccountAgreementLabel(strings.createAccountAgreement);
  });

  context('Valid Test Cases', () => {

    let case1 = JSON.parse(JSON.stringify(testData));
    case1.name = 'case1';
    case1.firstName = `Dré-${e2e.generateRandomStringWithSpecialChars(5)}`;
    case1.lastName = `Céleste-${e2e.generateRandomStringWithSpecialChars(5)}`;
    case1.email = `${e2e.generateRandomString(5)}+${e2e.generateRandomString(5)}@test.com`;
    case1.phone = '1234567890';
    case1.expectedPhone = '123-456-7890'
    case1.password = 'TestUser@1234';
    case1.confirmPassword = case1.password;
    case1.province = "";
    case1.expectedProvince = "ON";
    case1.constent = "true";

    let case2 = JSON.parse(JSON.stringify(case1));
    case2.name = 'case2';
    case2.firstName = `André-${e2e.generateRandomStringWithSpecialChars(5)}`;
    case2.lastName = `^Céleste-${e2e.generateRandomStringWithSpecialChars(5)}`;
    case2.email = `${e2e.generateRandomString(10)}@test.user.com`;
    case2.phone = '123 456 7890';
    case2.province = strings.qc;
    case2.expectedProvince = "QC";
    case2.Consent = "false";

    let case3 = JSON.parse(JSON.stringify(case1));
    case3.name = 'case3';
    case3.firstName = `^Dré-${e2e.generateRandomStringWithSpecialChars(5)}`;
    case3.lastName = `Émilie-${e2e.generateRandomStringWithSpecialChars(5)}`;
    case3.email = `${e2e.generateRandomString(10)}@test.user.com`;
    case3.province = strings.sk;
    case3.expectedProvince = "SK";
    case3.Consent = "false";

    let case4 = JSON.parse(JSON.stringify(case1));
    case4.name = 'case4';
    case4.firstName = `^André-${e2e.generateRandomStringWithSpecialChars(5)}`;
    case4.lastName = `^Émilie-${e2e.generateRandomStringWithSpecialChars(5)}`;
    case4.email = `${e2e.generateRandomString(10)}@test.user.com`;
    case4.province = strings.al;
    case4.expectedProvince = "AL";
    case4.Consent = "false";
    
    const validCases = [case1, case2, case3, case4];

    validCases.forEach((input) => {
      it(`Valid case '${input.name}' should be successful`, () => {
        // Intercept API call
        cy.intercept('POST', '/api/accounts', (req) => {
          req.reply({
            statusCode: 201,
            body: {
              firstName: req.body.firstName,
              lastName: req.body.lastName,
              email: req.body.email,
              phone: req.body.phone,
              password: req.body.password,
              passwordConfirm: req.body.passwordConfirm,
              province: req.body.province,
              consent: req.body.consent,
            },
          });
        }).as(`${input.name}`);
        
        SignupPage.fillForm(input.firstName, input.lastName, input.email, input.phone, input.password, input.confirmPassword, input.province, input.constent);
        SignupPage.submit();

        // Wait for API response
        cy.wait(`@${input.name}`).its('response').then((response) => {
          // Assert the response status
          expect(response?.statusCode).to.eq(201);
    
          // Assert the response body
          console.log(response.body);
          expect(response?.body).to.have.property('firstName', e2e.lowercaseExceptFirst(input.firstName));
          expect(response?.body).to.have.property('lastName', e2e.lowercaseExceptFirst(input.lastName))
          expect(response?.body).to.have.property('email', input.email);
          expect(response?.body).to.have.property('phone', input.expectedPhone);
          expect(response?.body).to.have.property('password', input.password);
          expect(response?.body).to.have.property('passwordConfirm', input.confirmPassword);
          expect(response?.body).to.have.property('province', input.expectedProvince);
        });

      });
    });

    
  });

  it('should not allow to use already registered email', () => {
    let input = JSON.parse(JSON.stringify(testData));
    input.firstName = e2e.generateRandomStringWithSpecialChars(10);
    input.lastName = e2e.generateRandomStringWithSpecialChars(10);
    input.email = `${e2e.generateRandomString(10)}@test.com`;
    input.phone = '1234567890';
    input.password = 'TestUser@1234';
    input.confirmPassword = input.password;
    input.province = "";
    input.constent = "false";

    SignupPage.fillForm(input.firstName, input.lastName, input.email, input.phone, input.password, input.confirmPassword, input.province, input.constent);
    SignupPage.submit();

    cy.visit(SignupPage.pathName);
    SignupPage.validateFormOpen(strings.signupTitle);

    let input2 = JSON.parse(JSON.stringify(input));
    input2.firstName = e2e.generateRandomStringWithSpecialChars(10);
    input2.lastName = e2e.generateRandomStringWithSpecialChars(10);

    SignupPage.fillForm(input2.firstName, input2.lastName, input2.email, input2.phone, input2.password, input2.confirmPassword, input2.province, input2.constent);
    SignupPage.submit();
    cy.get('#toasts_duplicateAccount_message').should('be.visible');
  });

  context('Invalid First Name Tests', () => {

    let firstNameEmpty = JSON.parse(JSON.stringify(testData));
    firstNameEmpty.firstName = "";
    firstNameEmpty.expectedError = strings.required;

    let firstNameSpace = JSON.parse(JSON.stringify(testData));
    firstNameSpace.firstName = "{ }";
    firstNameSpace.expectedError = strings.required;

    let firstNameLong = JSON.parse(JSON.stringify(testData));
    firstNameLong.firstName = e2e.generateRandomStringWithSpecialChars(257);
    firstNameLong.expectedError = strings.tooManyCharacters;

    // let firstNameShort = JSON.parse(JSON.stringify(testData));
    // firstNameShort.firstName = "A";
    // firstNameShort.expectedError = "Too few characters";

    // let firstNameWithNumbers = JSON.parse(JSON.stringify(testData));
    // firstNameWithNumbers.firstName = "Testuser123";
    // firstNameWithNumbers.expectedError = "Contains invalid characters";

    // let firstNameWithSpecialChars = JSON.parse(JSON.stringify(testData));
    // firstNameWithSpecialChars.firstName = "Test@user!";
    // firstNameWithSpecialChars.expectedError = "Contains invalid characters";

    const invalidFirstNames = [firstNameEmpty, firstNameSpace, firstNameLong];

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
    lastNameEmpty.expectedError = strings.required;

    let lastNameSpace = JSON.parse(JSON.stringify(testData));
    lastNameSpace.lastName = "{ }";
    lastNameSpace.expectedError = strings.required;

    let lastNameLong = JSON.parse(JSON.stringify(testData));
    lastNameLong.lastName = e2e.generateRandomStringWithSpecialChars(257);
    lastNameLong.expectedError = strings.tooManyCharacters;

    // let lastNameShort = JSON.parse(JSON.stringify(testData));
    // lastNameShort.lastName = "A";
    // lastNameShort.expectedError = "Too few characters";

    // let lastNameWithNumbers = JSON.parse(JSON.stringify(testData));
    // lastNameWithNumbers.lastName = "Testuser123";
    // lastNameWithNumbers.expectedError = "Contains invalid characters";

    // let lastNameWithSpecialChars = JSON.parse(JSON.stringify(testData));
    // lastNameWithSpecialChars.lastName = "Test@user!";
    // lastNameWithSpecialChars.expectedError = "Contains invalid characters";

    const invalidLastNames = [lastNameEmpty, lastNameSpace, lastNameLong];

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
    emailEmpty.expectedError = strings.required;

    let emailSpace = JSON.parse(JSON.stringify(testData));
    emailSpace.email = "{ }";
    emailSpace.expectedError = strings.required;

    let emailShort = JSON.parse(JSON.stringify(testData));
    emailShort.email = "t@u.c";
    emailShort.expectedError = strings.invalidEmailAddress;

    let emailLong = JSON.parse(JSON.stringify(testData));
    emailLong.email = `${e2e.generateRandomString(247)}@test.com`;
    emailLong.expectedError = strings.tooManyCharacters;

    let emailWithoutAt = JSON.parse(JSON.stringify(testData));
    emailWithoutAt.email = "Testuser.com";
    emailWithoutAt.expectedError = strings.invalidEmailAddress;

    let emailWithMultipleAt = JSON.parse(JSON.stringify(testData));
    emailWithMultipleAt.email = "Test@user@co.in";
    emailWithMultipleAt.expectedError = strings.invalidEmailAddress;

    let emailWithSpecialChars = JSON.parse(JSON.stringify(testData));
    emailWithSpecialChars.email = "test!#$%&'*+/=?^_{|}~@user.com";
    emailWithSpecialChars.expectedError = strings.invalidEmailAddress;

    let emailWithInvalidChars = JSON.parse(JSON.stringify(testData));
    emailWithInvalidChars.email = "test!@user.com";
    emailWithInvalidChars.expectedError = strings.invalidEmailAddress;

    let emailWithoutUsername = JSON.parse(JSON.stringify(testData));
    emailWithoutUsername.email = "@user.com";
    emailWithoutUsername.expectedError = strings.invalidEmailAddress;

    let emailWithoutDomainName = JSON.parse(JSON.stringify(testData));
    emailWithoutDomainName.email = "test@.com";
    emailWithoutDomainName.expectedError = strings.invalidEmailAddress;

    let emailWithConsecutiveDots = JSON.parse(JSON.stringify(testData));
    emailWithConsecutiveDots.email = "test@user..com";
    emailWithConsecutiveDots.expectedError = strings.invalidEmailAddress;

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
    phoneEmpty.expectedError = strings.required;

    let phoneSpace = JSON.parse(JSON.stringify(testData));
    phoneSpace.phone = "{ }";
    phoneSpace.expectedError = strings.required;

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
    passwordEmpty.expectedError = strings.required;

    let passwordSpace = JSON.parse(JSON.stringify(testData));
    passwordSpace.password = "{ }";
    passwordSpace.expectedError = strings.yourPasswordIsWeak;

    let passwordShort = JSON.parse(JSON.stringify(testData));
    passwordShort.password = "TestUser123";
    passwordShort.expectedError = strings.yourPasswordIsWeak;

    // let passwordLong = JSON.parse(JSON.stringify(testData));
    // passwordLong.password = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()";
    // passwordLong.expectedError = strings.yourPasswordIsWeak;

    let passwordNoUpperCase = JSON.parse(JSON.stringify(testData));
    passwordNoUpperCase.password = "testuser1234";
    passwordNoUpperCase.expectedError = strings.yourPasswordIsWeak;

    let passwordNoLowerCase = JSON.parse(JSON.stringify(testData));
    passwordNoLowerCase.password = "TESTUSER1234";
    passwordNoLowerCase.expectedError = strings.yourPasswordIsWeak;

    let passwordNoNumber = JSON.parse(JSON.stringify(testData));
    passwordNoNumber.password = "TestUserOneTwo";
    passwordNoNumber.expectedError = strings.yourPasswordIsWeak;

    const invalidPasswords = [passwordEmpty, passwordSpace, passwordShort, passwordNoUpperCase, passwordNoLowerCase, passwordNoNumber];

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
    confirmPasswordEmpty.expectedError = strings.required;

    let confirmPasswordSpace = JSON.parse(JSON.stringify(testData));
    confirmPasswordSpace.confirmPassword = "{ }";
    confirmPasswordSpace.expectedError = strings.yourPasswordsDoNotMatch;

    let confirmPasswordDiff = JSON.parse(JSON.stringify(testData));
    confirmPasswordDiff.password = "TestUser1234";
    confirmPasswordDiff.confirmPassword = "TestUser5678";
    confirmPasswordDiff.expectedError = strings.yourPasswordsDoNotMatch;

    let confirmPasswordDiffCase = JSON.parse(JSON.stringify(testData));
    confirmPasswordDiffCase.password = "TestUser1234";
    confirmPasswordDiffCase.confirmPassword = "Testuser1234";
    confirmPasswordDiffCase.expectedError = strings.yourPasswordsDoNotMatch;

    let confirmPasswordAndPasswordEmpty = JSON.parse(JSON.stringify(testData));
    confirmPasswordAndPasswordEmpty.password = "";
    confirmPasswordAndPasswordEmpty.confirmPassword = "";
    confirmPasswordAndPasswordEmpty.expectedError = strings.required;

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
    input.expectedValue = strings.on;

    SignupPage.fillForm(input.firstName, input.lastName, input.email, input.phone, input.password, input.confirmPassword, "", input.constent);
    SignupPage.typeProvince(input.province);
    SignupPage.submit();
    SignupPage.shouldHaveProvince(input.expectedValue);
  });

  it('should validate when submit without filling form', () => {
    SignupPage.submit();
    SignupPage.shouldContainFirstNameError(strings.required);
    SignupPage.shouldContainLastNameError(strings.required);
    SignupPage.shouldContainEmailError(strings.required);
    SignupPage.shouldContainPhoneNumberError(strings.required);
    SignupPage.shouldContainPasswordError(strings.required);
    SignupPage.shouldContainConfirmPasswordError(strings.required);

    SignupPage.validateFormOpen(strings.signupTitle);
  });

  it('should reset fields when reload page', () => {
    let input = JSON.parse(JSON.stringify(testData));

    SignupPage.fillForm(input.firstName, input.lastName, input.email, input.phone, input.password, input.confirmPassword, input.province, input.constent);
    SignupPage.submit();
    cy.reload();
    SignupPage.validateFormOpen(strings.signupTitle);
    SignupPage.validateFieldAreReset();
  });

  it('should reset fields when go back and forth on page', () => {
    let input = JSON.parse(JSON.stringify(testData));

    SignupPage.fillForm(input.firstName, input.lastName, input.email, input.phone, input.password, input.confirmPassword, input.province, input.constent);
    SignupPage.submit();
    cy.go('back');
    cy.go('forward');
    SignupPage.validateFormOpen(strings.signupTitle);
    SignupPage.validateFieldAreReset();
  });

  it('should navigate to Login page', () => {
    SignupPage.login();
    LoginPage.validateFormOpen(strings.loginTitle);
  });
    
});
