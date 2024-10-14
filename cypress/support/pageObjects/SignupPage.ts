import e2e from '../e2e';

class SignupPage {

    readonly pathName : string;

    constructor(pathName: string) {
        this.pathName = `/${pathName}`;
    }

    validateFormOpen() {
        cy.location("pathname").should("equal", this.pathName)

        // Create nesto account form
        cy.get('[data-test-id="form_signup_title"]')
        .should('contain', 'Create a nesto account');

        // Logo
        e2e.getByTestId('nestoSecured').should('be.visible');
    }

    validateFieldLabels() {
        e2e.getLabelByTestId("firstName").should('contain', 'First name');
        e2e.getLabelByTestId("lastName").should('contain', 'Last name');
        e2e.getLabelByTestId("email").should('contain', 'Email');
        e2e.getLabelByTestId("phone").should('contain', 'Mobile phone number');
        
        e2e.getLabelByTestId("password").should('contain', 'Password');
        e2e.getLabelByTestId("passwordConfirm").should('contain', 'Confirm password');
        // Password requirements
        e2e.getByTestId("formWarn_passwordComplexity").
        should('contain', 'Password must be between 12 and 32 characters and contain one uppercase letter, one lowercase letter and one number.');
        
        e2e.getByTestId("select_label-province").should('contain', 'Province');
        // Default province value
        e2e.getByTestId("province").contains('div', 'Ontario');

        // Consent Text
        e2e.getByTestId("getAQuote_shortPartnerAgreementAndEmail_V3").
        should('contain', 'By checking this box, you agree to be contacted by nesto’s partners for the purposes of offering you financial products. You agree to nesto sharing your mortgage information with its partners. You can opt-out at any time.');

        // Read Policy text
        e2e.getByTestId("readOurPolicy_V2").should('contain', 'Read our Privacy Policy to learn more.');
    }

    fillFirstName(firstName: string) {
        e2e.clearAndFillField("firstName", firstName);
    }

    fillLastname(lastName: string) {
        e2e.clearAndFillField("lastName", lastName);
    }

    fillEmail(email: string) {
        e2e.clearAndFillField("email", email);
    }

    fillPhoneNumber(phoneNumber: string) {
        e2e.clearAndFillField("phone", phoneNumber);
    }

    fillPassword(password: string) {
        e2e.clearAndFillField("password", password);
    }

    fillConfirmPassword(passwordConfirm: string) {
        e2e.clearAndFillField("passwordConfirm", passwordConfirm);
    }

    selectProvince(province: string) {
        cy.get('[data-test-id="province"]').within(() => {
            cy.get('.react-select__control').click();
            cy.get('.react-select__menu').contains(province).click();
        })
    }

    constentAgreement(agree: string) {
        if(agree != "") {
            cy.get('[data-test-id="leadDistributeConsentAgreement"]').then(($checkbox) => {
                if(agree == "true" && !$checkbox.is(':checked')){
                    cy.wrap($checkbox).click();
                }

                if(agree == "false" && $checkbox.is(':checked')){
                    cy.wrap($checkbox).click();
                }
            })
        }
    }

    submit() {
        cy.get('[data-test-id="createYourAccount"]').click();
    }

    fillForm(firstName: string, lastName: string, email: string, phoneNumber: string, password: string, confirmPassword: string, province: string, constent: string) {
        this.fillFirstName(firstName);
        this.fillLastname(lastName);
        this.fillEmail(email);
        this.fillPhoneNumber(phoneNumber);
        this.fillPassword(password);
        this.fillConfirmPassword(confirmPassword);
        this.selectProvince(province);
        this.constentAgreement(constent);
    }

    // Validations

    shouldContainFirstNameError(message: string) {
        e2e.shouldContainError('form-error-firstName', message);
    }

    shouldContainLastNameError(message: string) {
        e2e.shouldContainError('form-error-lastName', message);
    }

    shouldContainEmailError(message: string) {
        e2e.shouldContainError('form-error-email', message);
    }

    shouldContainPhoneNumberError(message: string) {
        e2e.shouldContainError('form-error-phone', message);
    }

    shouldContainPasswordError(message: string) {
        e2e.shouldContainError('form-error-password', message);
    }

    shouldContainConfirmPasswordError(message: string) {
        e2e.shouldContainError('form-error-passwordConfirm', message);
    }

    // Invalid

    

    shouldContainEmailInvalid() {
        cy.getByDataTestId('validation_errors_invalidEmail')
        .should('contain.text', 'Invalid email address');
    }

    shouldContainPasswordWeak() {
        cy.getByDataTestId('validation_errors_passwordsTooWeak')
        .should('contain.text', 'Your password is too weak');
    }

    shouldContainPasswordsDoNotMatch() {
        cy.getByDataTestId('validation_errors_passwordsMustMatch')
        .should('contain.text', 'Your passwords do not match');
    }
  }
  
  export default new SignupPage("signup");
  