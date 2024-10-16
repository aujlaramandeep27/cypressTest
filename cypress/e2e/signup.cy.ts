import { getLanguageStrings } from '../support/languageStrings';
import { Language } from '../support/languageTypes';
import e2e from '../support/e2e';
import LanguageSwitcher from '../support/pageObjects/languageSwitcher';
import LoginPage from '../support/pageObjects/LoginPage';
import SignupPage from '../support/pageObjects/SignupPage';
import HomePage from '../support/pageObjects/HomePage';

describe('Signup Tests', () => {
  // Get the language from environment variables
  const language:Language = (Cypress.env('LANGUAGE') as Language|| 'en'); // Default to English
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
      console.error('Uncaught exception:', err);
      return false;
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

  it('Successful signup for new account', () => {
    let input = JSON.parse(JSON.stringify(testData));
    input.firstName = 'Test';
    input.lastName = 'User';
    input.email = `${e2e.generateRandomString(5)}+${e2e.generateRandomString(5)}@test.com`;
    input.phone = '1234567890';
    input.expectedPhone = '123-456-7890';
    input.password = 'TestUser@1234';
    input.confirmPassword = input.password;
    input.province = "";
    input.expectedProvince = "ON";
    input.constent = "";

    SignupPage.fillForm(input.firstName, input.lastName, input.email, input.phone, input.password, input.confirmPassword, input.province, input.constent);
    SignupPage.submit();

    // Validate user successfully logged in on account creation
    HomePage.validateHomeOpen(strings.homeTitle);
    HomePage.logout();
  });

  context('Valid Test Cases', () => {

    let firstNameWithVowel = JSON.parse(JSON.stringify(testData));
    firstNameWithVowel.name = 'first name starting with vowel';
    firstNameWithVowel.firstName = `Ella${e2e.generateRandomString(5)}`;
    firstNameWithVowel.lastName = `Dré${e2e.generateRandomString(5)}`;
    firstNameWithVowel.email = `${e2e.generateRandomString(5)}+${e2e.generateRandomString(5)}@test.com`;
    firstNameWithVowel.phone = '1234567890';
    firstNameWithVowel.expectedPhone = '123-456-7890';
    firstNameWithVowel.password = 'TestUser@1234';
    firstNameWithVowel.confirmPassword = firstNameWithVowel.password;
    firstNameWithVowel.province = "";
    firstNameWithVowel.expectedProvince = "ON";
    firstNameWithVowel.constent = "true";
    firstNameWithVowel.expectedConsent = true;

    let lastNameWithVowel = JSON.parse(JSON.stringify(testData));
    lastNameWithVowel.name = 'last name starting with vowel';
    lastNameWithVowel.firstName = `Dré${e2e.generateRandomString(5)}`;
    lastNameWithVowel.lastName = `Ella${e2e.generateRandomString(5)}`;
    lastNameWithVowel.email = `${e2e.generateRandomString(5)}+${e2e.generateRandomString(5)}@test.com`;
    lastNameWithVowel.phone = '1234567890';
    lastNameWithVowel.expectedPhone = '123-456-7890';
    lastNameWithVowel.password = 'TestUser@1234';
    lastNameWithVowel.confirmPassword = lastNameWithVowel.password;
    lastNameWithVowel.province = "";
    lastNameWithVowel.expectedProvince = "ON";
    lastNameWithVowel.constent = "true";
    lastNameWithVowel.expectedConsent = true;

    let firstNameWithAccent = JSON.parse(JSON.stringify(testData));
    firstNameWithAccent.name = 'first name starting with accent';
    firstNameWithAccent.firstName = `Émilie${e2e.generateRandomString(5)}`;
    firstNameWithAccent.lastName = `Ella${e2e.generateRandomString(5)}`;
    firstNameWithAccent.email = `${e2e.generateRandomString(10)}@test.com`;
    firstNameWithAccent.phone = '123 456 7890';
    firstNameWithAccent.expectedPhone = '123-456-7890';
    firstNameWithAccent.confirmPassword = firstNameWithAccent.password;
    firstNameWithAccent.province = strings.qc;
    firstNameWithAccent.expectedProvince = "QC";
    firstNameWithAccent.Consent = "false";
    firstNameWithAccent.expectedConsent = false;

    let lastNameWithAccent = JSON.parse(JSON.stringify(testData));
    lastNameWithAccent.name = 'last name starting with accent';
    lastNameWithAccent.firstName = `Ella${e2e.generateRandomString(5)}`;
    lastNameWithAccent.lastName = `Émilie${e2e.generateRandomString(5)}`;
    lastNameWithAccent.email = `${e2e.generateRandomString(10)}@test.com`;
    lastNameWithAccent.expectedPhone = '123-456-7890';
    lastNameWithAccent.confirmPassword = lastNameWithAccent.password;
    lastNameWithAccent.province = strings.sk;
    lastNameWithAccent.expectedProvince = "SK";
    lastNameWithAccent.Consent = "false";
    lastNameWithAccent.expectedConsent = true;

    let firstNameMixedCase = JSON.parse(JSON.stringify(testData));
    firstNameMixedCase.name = 'first name with mixed case';
    firstNameMixedCase.firstName = `AbiGaëllE`;
    firstNameMixedCase.lastName = `Adèle`;
    firstNameMixedCase.email = `${e2e.generateRandomString(10)}@test.com`;
    firstNameMixedCase.expectedPhone = '123-456-7890';
    firstNameMixedCase.confirmPassword = firstNameMixedCase.password;
    firstNameMixedCase.province = strings.al;
    firstNameMixedCase.expectedProvince = "AB";
    firstNameMixedCase.Consent = "false";
    firstNameMixedCase.expectedConsent = false;

    let lastNameMixedCase = JSON.parse(JSON.stringify(testData));
    lastNameMixedCase.name = 'last name with mixed case';
    lastNameMixedCase.firstName = `Abigaëlle`;
    lastNameMixedCase.lastName = `AdèLE`;
    lastNameMixedCase.email = `${e2e.generateRandomString(5)}_${e2e.generateRandomString(5)}@test.com`;
    lastNameMixedCase.phone = '1234567890';
    lastNameMixedCase.expectedPhone = '123-456-7890';
    lastNameMixedCase.password = `TestUser@1234${e2e.generateRandomString(19)}`;
    lastNameMixedCase.confirmPassword = lastNameMixedCase.password;
    lastNameMixedCase.province = "";
    lastNameMixedCase.expectedProvince = "ON";
    lastNameMixedCase.constent = "true";
    lastNameMixedCase.expectedConsent = true;

    let longNames = JSON.parse(JSON.stringify(testData));
    longNames.name = 'names with maximum size';
    longNames.firstName = `Frank${e2e.generateRandomString(59)}`;
    longNames.lastName = `Shelby${e2e.generateRandomString(58)}`;
    longNames.email = `${e2e.generateRandomString(114)}_user@test.com`;
    longNames.expectedPhone = '123-456-7890';
    longNames.confirmPassword = longNames.password;
    longNames.province = strings.ns;
    longNames.expectedProvince = "NS";
    longNames.Consent = "false";
    longNames.expectedConsent = false;

    let nameWithCompounds = JSON.parse(JSON.stringify(testData));
    nameWithCompounds.name = 'names with compounds';
    nameWithCompounds.firstName = `Céleste-${e2e.generateRandomString(5)}`;
    nameWithCompounds.lastName = `Dré-${e2e.generateRandomString(5)}`;
    nameWithCompounds.email = `${e2e.generateRandomString(10)}#user@test.com`;
    nameWithCompounds.expectedPhone = '123-456-7890';
    nameWithCompounds.confirmPassword = nameWithCompounds.password;
    nameWithCompounds.province = strings.nl;
    nameWithCompounds.expectedProvince = "NL";
    nameWithCompounds.Consent = "false";
    nameWithCompounds.expectedConsent = false;

    let nameWithSpaces = JSON.parse(JSON.stringify(testData));
    nameWithSpaces.name = 'names with space';
    nameWithSpaces.firstName = `Frank ${e2e.generateRandomString(5)}`;
    nameWithSpaces.lastName = `Shelby ${e2e.generateRandomString(5)}`;
    nameWithSpaces.email = `${e2e.generateRandomString(114)}_user@test.com`;
    nameWithSpaces.expectedPhone = '123-456-7890';
    nameWithSpaces.confirmPassword = nameWithSpaces.password;
    nameWithSpaces.province = strings.pe;
    nameWithSpaces.expectedProvince = "PE";
    nameWithSpaces.Consent = "false";
    nameWithSpaces.expectedConsent = false;

    let firstNameSecondWordAccent = JSON.parse(JSON.stringify(testData));
    firstNameSecondWordAccent.name = 'first name with space second word starts with accent';
    firstNameSecondWordAccent.firstName = `Frank É${e2e.generateRandomString(5)}`;
    firstNameSecondWordAccent.lastName = `Shelby ${e2e.generateRandomString(5)}`;
    firstNameSecondWordAccent.email = `${e2e.generateRandomString(114)}_user@test.com`;
    firstNameSecondWordAccent.expectedPhone = '123-456-7890';
    firstNameSecondWordAccent.confirmPassword = firstNameSecondWordAccent.password;
    firstNameSecondWordAccent.province = strings.pe;
    firstNameSecondWordAccent.expectedProvince = "PE";
    firstNameSecondWordAccent.Consent = "false";
    firstNameSecondWordAccent.expectedConsent = false;

    let lastNameSecondWordAccent = JSON.parse(JSON.stringify(testData));
    lastNameSecondWordAccent.name = 'last name with space second word starts with accent';
    lastNameSecondWordAccent.firstName = `Frank ${e2e.generateRandomString(5)}`;
    lastNameSecondWordAccent.lastName = `Shelby É${e2e.generateRandomString(5)}`;
    lastNameSecondWordAccent.email = `${e2e.generateRandomString(114)}_user@test.com`;
    lastNameSecondWordAccent.expectedPhone = '123-456-7890';
    lastNameSecondWordAccent.confirmPassword = lastNameSecondWordAccent.password;
    lastNameSecondWordAccent.province = strings.pe;
    lastNameSecondWordAccent.expectedProvince = "PE";
    lastNameSecondWordAccent.Consent = "false";
    lastNameSecondWordAccent.expectedConsent = false;
    
    const validCases = [firstNameWithVowel, lastNameWithVowel, firstNameWithAccent, lastNameWithAccent, firstNameMixedCase, lastNameMixedCase, longNames, nameWithCompounds, nameWithSpaces, firstNameSecondWordAccent, lastNameSecondWordAccent];

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
              consent: req.body.leadDistributeConsentAgreement,
            }
          });
          // req.reply((res) => {
          //   cy.log('Full response: '+ res);
          // });
        }).as(`${input.name}`);
        
        SignupPage.fillForm(input.firstName, input.lastName, input.email, input.phone, input.password, input.confirmPassword, input.province, input.constent);
        SignupPage.submit();

        // Wait for API response
        cy.wait(`@${input.name}`).its('response').then((response) => {
          // Assert the response status
          expect(response?.statusCode).to.eq(201);
    
          // Assert the response body
          expect(response?.body).to.have.property('firstName', e2e.capitalizeFirstLetterOfEachWord(input.firstName));
          expect(response?.body).to.have.property('lastName', e2e.capitalizeFirstLetterOfEachWord(input.lastName))
          expect(response?.body).to.have.property('email', input.email);
          expect(response?.body).to.have.property('phone', input.expectedPhone);
          expect(response?.body).to.have.property('password', input.password);
          expect(response?.body).to.have.property('passwordConfirm', input.confirmPassword);
          expect(response?.body).to.have.property('province', input.expectedProvince);
          expect(response?.body).to.have.property('consent', input.expectedConsent);
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
    firstNameEmpty.name = "empty";
    firstNameEmpty.firstName = "";
    firstNameEmpty.expectedError = strings.required;

    let firstNameLong = JSON.parse(JSON.stringify(testData));
    firstNameLong.name = "long"
    firstNameLong.firstName = e2e.generateRandomStringWithSpecialChars(65);
    firstNameLong.expectedError = strings.tooManyCharacters;

    const invalidFirstNames = [firstNameEmpty, firstNameLong];

    invalidFirstNames.forEach((input) => {
      it(`Firstname value '${input.name}' should show error ${input.expectedError}`, () => {
        SignupPage.fillForm(input.firstName, input.lastName, input.email, input.phone, input.password, input.confirmPassword, input.province, input.constent);
        SignupPage.submit();
        SignupPage.shouldContainFirstNameError(input.expectedError);
      });
    });
  });

  context('Invalid accepted First Name Tests', () => {
    
    let firstNameSpace = JSON.parse(JSON.stringify(testData));
    firstNameSpace.name = "space";
    firstNameSpace.firstName = "{ }";

    let firstNameShort = JSON.parse(JSON.stringify(testData));
    firstNameShort.name = "short";
    firstNameShort.firstName = "A";

    let firstNameWithNumbers = JSON.parse(JSON.stringify(testData));
    firstNameWithNumbers.name = "with numbers";
    firstNameWithNumbers.firstName = "Testuser123";

    let firstNameWithSpecialChars = JSON.parse(JSON.stringify(testData));
    firstNameWithSpecialChars.name = "with special chars";
    firstNameWithSpecialChars.firstName = "Test@user!";

    const invalidFirstNames = [firstNameSpace, firstNameShort, firstNameWithNumbers, firstNameWithSpecialChars];

    invalidFirstNames.forEach((input) => {
      it(`Firstname value '${input.name}' should show error ${input.expectedError}`, () => {
        SignupPage.fillForm(input.firstName, input.lastName, input.email, input.phone, input.password, input.confirmPassword, input.province, input.constent);
        SignupPage.submit();
        SignupPage.shouldNotContainFirstNameError();
      });
    });
  });

  context('Invalid Last Name Tests', () => {

    let lastNameEmpty = JSON.parse(JSON.stringify(testData));
    lastNameEmpty.name = "empty";
    lastNameEmpty.lastName = "";
    lastNameEmpty.expectedError = strings.required;

    let lastNameLong = JSON.parse(JSON.stringify(testData));
    lastNameLong.name = "long";
    lastNameLong.lastName = e2e.generateRandomStringWithSpecialChars(65);
    lastNameLong.expectedError = strings.tooManyCharacters;

    const invalidLastNames = [lastNameEmpty, lastNameLong];

    invalidLastNames.forEach((input) => {
      it(`Lastname value '${input.name}' should show error ${input.expectedError}`, () => {
        SignupPage.fillForm(input.firstName, input.lastName, input.email, input.phone, input.password, input.confirmPassword, input.province, input.constent);
        SignupPage.submit();
        SignupPage.shouldContainLastNameError(input.expectedError);
      });
    });
  });

  context('Invalid accepted Last Name Tests', () => {

    let lastNameSpace = JSON.parse(JSON.stringify(testData));
    lastNameSpace.name = "space";
    lastNameSpace.lastName = "{ }";

    let lastNameShort = JSON.parse(JSON.stringify(testData));
    lastNameShort.name = "short";
    lastNameShort.lastName = "A";

    let lastNameWithNumbers = JSON.parse(JSON.stringify(testData));
    lastNameWithNumbers.name = "with numbers";
    lastNameWithNumbers.lastName = "Testuser123";

    let lastNameWithSpecialChars = JSON.parse(JSON.stringify(testData));
    lastNameWithSpecialChars.name = "with special chars";
    lastNameWithSpecialChars.lastName = "Test@user!";

    const invalidLastNames = [lastNameSpace, lastNameShort, lastNameWithNumbers, lastNameWithSpecialChars];

    invalidLastNames.forEach((input) => {
      it(`Lastname value '${input.name}' should show error ${input.expectedError}`, () => {
        SignupPage.fillForm(input.firstName, input.lastName, input.email, input.phone, input.password, input.confirmPassword, input.province, input.constent);
        SignupPage.submit();
        SignupPage.shouldNotContainLastNameError();
      });
    });
  });

  context('Invalid Email Tests', () => {

    let emailEmpty = JSON.parse(JSON.stringify(testData));
    emailEmpty.name = "empty";
    emailEmpty.email = "";
    emailEmpty.expectedError = strings.required;

    let emailSpace = JSON.parse(JSON.stringify(testData));
    emailSpace.name = "space";
    emailSpace.email = "{ }";
    emailSpace.expectedError = strings.required;

    let emailShort = JSON.parse(JSON.stringify(testData));
    emailShort.name = "short";
    emailShort.email = "t@u.c";
    emailShort.expectedError = strings.invalidEmailAddress;

    let emailLong = JSON.parse(JSON.stringify(testData));
    emailLong.name = "long";
    emailLong.email = `${e2e.generateRandomString(115)}_user@test.com`;
    emailLong.expectedError = strings.tooManyCharacters;

    let emailWithoutAt = JSON.parse(JSON.stringify(testData));
    emailWithoutAt.name = "without @";
    emailWithoutAt.email = "Testuser.com";
    emailWithoutAt.expectedError = strings.invalidEmailAddress;

    let emailWithMultipleAt = JSON.parse(JSON.stringify(testData));
    emailWithMultipleAt.name = "with multiple @";
    emailWithMultipleAt.email = "Test@user@co.in";
    emailWithMultipleAt.expectedError = strings.invalidEmailAddress;

    let emailWithSpecialChars = JSON.parse(JSON.stringify(testData));
    emailWithSpecialChars.name = "with special chars";
    emailWithSpecialChars.email = "test!#$%&'*+/=?^_{|}~@user.com";
    emailWithSpecialChars.expectedError = strings.invalidEmailAddress;

    let emailWithInvalidChars = JSON.parse(JSON.stringify(testData));
    emailWithInvalidChars.name = "with invalid chars";
    emailWithInvalidChars.email = "test!@user.com";
    emailWithInvalidChars.expectedError = strings.invalidEmailAddress;

    let emailWithoutUsername = JSON.parse(JSON.stringify(testData));
    emailWithoutUsername.name = "without username";
    emailWithoutUsername.email = "@user.com";
    emailWithoutUsername.expectedError = strings.invalidEmailAddress;

    let emailWithoutDomainName = JSON.parse(JSON.stringify(testData));
    emailWithoutDomainName.name = "without domain name";
    emailWithoutDomainName.email = "test@.com";
    emailWithoutDomainName.expectedError = strings.invalidEmailAddress;

    let emailWithConsecutiveDots = JSON.parse(JSON.stringify(testData));
    emailWithConsecutiveDots.name = "with consecutive dots";
    emailWithConsecutiveDots.email = "test@user..com";
    emailWithConsecutiveDots.expectedError = strings.invalidEmailAddress;

    const invalidEmails = [emailEmpty, emailSpace, emailShort, emailLong, emailWithoutAt, emailWithMultipleAt];

    invalidEmails.forEach((input) => {
      it(`Email value '${input.name}' should show error ${input.expectedError}`, () => {
        SignupPage.fillForm(input.firstName, input.lastName, input.email, input.phone, input.password, input.confirmPassword, input.province, input.constent);
        SignupPage.submit();
        SignupPage.shouldContainEmailError(input.expectedError);
      });
    });
  });

  context('Invalid Phone Number Tests', () => {

    let phoneEmpty = JSON.parse(JSON.stringify(testData));
    phoneEmpty.name = "empty";
    phoneEmpty.phone = "";
    phoneEmpty.expectedError = strings.required;

    let phoneSpace = JSON.parse(JSON.stringify(testData));
    phoneSpace.name = "space";
    phoneSpace.phone = "{ }";
    phoneSpace.expectedError = strings.required;

    const invalidPhones = [phoneEmpty, phoneSpace];

    invalidPhones.forEach((input) => {
      it(`Phone number value '${input.name}' should show error ${input.expectedError}`, () => {
        SignupPage.fillForm(input.firstName, input.lastName, input.email, input.phone, input.password, input.confirmPassword, input.province, input.constent);
        SignupPage.submit();
        SignupPage.shouldContainPhoneNumberError(input.expectedError);
      });
    });
  });

  context('Parse Phone Number Tests', () => {

    let phoneLong = JSON.parse(JSON.stringify(testData));
    phoneLong.phone = "98765432012";
    phoneLong.expectedValue = "987-654-3201";

    let phoneWithSpaces = JSON.parse(JSON.stringify(testData));
    phoneWithSpaces.phone = "987 654 3201";
    phoneWithSpaces.expectedValue = "987-654-3201";

    let phoneWithLetters = JSON.parse(JSON.stringify(testData));
    phoneWithLetters.phone = "1234ABC890456";
    phoneWithLetters.expectedValue = "123-489-0456";

    let phoneWithInvalidChars = JSON.parse(JSON.stringify(testData));
    phoneWithInvalidChars.phone = "123#4567890";
    phoneWithInvalidChars.expectedValue = "123-456-7890";

    let phoneWithInvalidFormat = JSON.parse(JSON.stringify(testData));
    phoneWithInvalidFormat.phone = "123/456/7890";
    phoneWithInvalidFormat.expectedValue = "123-456-7890";

    const phoneCases = [phoneLong, phoneWithSpaces, phoneWithLetters, phoneWithInvalidChars, phoneWithInvalidFormat];

    phoneCases.forEach((input) => {
      it(`Phone number value '${input.phone}' should accept value ${input.expectedValue}`, () => {
        SignupPage.fillForm(input.firstName, input.lastName, input.email, input.phone, input.password, input.confirmPassword, input.province, input.constent);
        SignupPage.submit();
        SignupPage.shouldHavePhoneNumber(input.expectedValue);
      });
    });
  });

  context('Invalid accepted Phone Number Tests', () => {

    let phoneShort = JSON.parse(JSON.stringify(testData));
    phoneShort.phone = "1";
    phoneShort.expectedValue = "1__-___-____";

    let phoneBelowMinimum = JSON.parse(JSON.stringify(testData));
    phoneBelowMinimum.phone = "123456789";
    phoneBelowMinimum.expectedValue = "123-456-789_";

    const phoneCases = [phoneShort, phoneBelowMinimum];

    phoneCases.forEach((input) => {
      it(`Phone number value '${input.phone}' should accept value ${input.expectedValue}`, () => {
        SignupPage.fillForm(input.firstName, input.lastName, input.email, input.phone, input.password, input.confirmPassword, input.province, input.constent);
        SignupPage.submit();
        SignupPage.shouldHavePhoneNumber(input.expectedValue);
        SignupPage.shouldNotContainPhoneNumberError();
      });
    });
  });

  context('Invalid Password Tests', () => {

    let passwordEmpty = JSON.parse(JSON.stringify(testData));
    passwordEmpty.name = "empty";
    passwordEmpty.password = "";
    passwordEmpty.expectedError = strings.required;

    let passwordSpace = JSON.parse(JSON.stringify(testData));
    passwordSpace.name = "space";
    passwordSpace.password = "{ }";
    passwordSpace.expectedError = strings.yourPasswordIsWeak;

    let passwordShort = JSON.parse(JSON.stringify(testData));
    passwordShort.name = "short";
    passwordShort.password = "TestUser123";
    passwordShort.expectedError = strings.yourPasswordIsWeak;

    let passwordNoUpperCase = JSON.parse(JSON.stringify(testData));
    passwordNoUpperCase.name = "without upper case";
    passwordNoUpperCase.password = "testuser1234";
    passwordNoUpperCase.expectedError = strings.yourPasswordIsWeak;

    let passwordNoLowerCase = JSON.parse(JSON.stringify(testData));
    passwordNoLowerCase.name = "without lower case";
    passwordNoLowerCase.password = "TESTUSER1234";
    passwordNoLowerCase.expectedError = strings.yourPasswordIsWeak;

    let passwordNoNumber = JSON.parse(JSON.stringify(testData));
    passwordNoNumber.name = "without number";
    passwordNoNumber.password = "TestUserOneTwo";
    passwordNoNumber.expectedError = strings.yourPasswordIsWeak;

    const invalidPasswords = [passwordEmpty, passwordSpace, passwordShort, passwordNoUpperCase, passwordNoLowerCase, passwordNoNumber];

    invalidPasswords.forEach((input) => {
      it(`Password value '${input.name}' should show error ${input.expectedError}`, () => {
        SignupPage.fillForm(input.firstName, input.lastName, input.email, input.phone, input.password, input.confirmPassword, input.province, input.constent);
        SignupPage.submit();
        SignupPage.shouldContainPasswordError(input.expectedError);
      });
    });
  });

  it('Over maximum size password should show error', () => {
    let input = JSON.parse(JSON.stringify(testData));
    input.password = `TestUser@1234${e2e.generateRandomString(20)}`;
    input.expectedError = strings.yourPasswordIsWeak;

    SignupPage.fillForm(input.firstName, input.lastName, input.email, input.phone, input.password, input.confirmPassword, input.province, input.constent);
    SignupPage.submit();
    SignupPage.shouldNotContainPasswordError(input.expectedError);
  });

  context('Invalid Confirm Password Tests', () => {

    let confirmPasswordEmpty = JSON.parse(JSON.stringify(testData));
    confirmPasswordEmpty.name = "empty";
    confirmPasswordEmpty.confirmPassword = "";
    confirmPasswordEmpty.expectedError = strings.required;

    let confirmPasswordSpace = JSON.parse(JSON.stringify(testData));
    confirmPasswordSpace.name = "space";
    confirmPasswordSpace.confirmPassword = "{ }";
    confirmPasswordSpace.expectedError = strings.yourPasswordsDoNotMatch;

    let confirmPasswordDiff = JSON.parse(JSON.stringify(testData));
    confirmPasswordDiff.name = "different than password";
    confirmPasswordDiff.password = "TestUser1234";
    confirmPasswordDiff.confirmPassword = "TestUser5678";
    confirmPasswordDiff.expectedError = strings.yourPasswordsDoNotMatch;

    let confirmPasswordDiffCase = JSON.parse(JSON.stringify(testData));
    confirmPasswordDiffCase.name = "with differnt cases";
    confirmPasswordDiffCase.password = "TestUser1234";
    confirmPasswordDiffCase.confirmPassword = "Testuser1234";
    confirmPasswordDiffCase.expectedError = strings.yourPasswordsDoNotMatch;

    let confirmPasswordAndPasswordEmpty = JSON.parse(JSON.stringify(testData));
    confirmPasswordAndPasswordEmpty.name = "empty same as password";
    confirmPasswordAndPasswordEmpty.password = "";
    confirmPasswordAndPasswordEmpty.confirmPassword = "";
    confirmPasswordAndPasswordEmpty.expectedError = strings.required;

    const invalidConfirmPasswords = [confirmPasswordEmpty, confirmPasswordSpace, confirmPasswordDiff, confirmPasswordDiffCase, confirmPasswordAndPasswordEmpty];

    invalidConfirmPasswords.forEach((input) => {
      it(`Confirm password value '${input.name}' should show error ${input.expectedError}`, () => {
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
