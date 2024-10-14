class SignupPage {

    readonly pathName : string;

    constructor(pathName: string) {
        this.pathName = `/${pathName}`;
    }

    validateSignUpFormOpen() {
        cy.location("pathname").should("equal", this.pathName)
        cy.get('[data-test-id="form_signup_title"]')
        .should('contain', 'Create a nesto account');
    }

    fillFirstName(firstName: string) {
        cy.get('[data-test-id="firstName"]').then(($field) => {
            cy.wrap($field).clear();
            if(firstName != ""){
                cy.wrap($field).type(firstName);
            }
        })
    }

    fillLastname(lastName: string) {
        cy.get('[data-test-id="lastName"]').then(($field) => {
            cy.wrap($field).clear();
            if(lastName != ""){
                cy.wrap($field).type(lastName);
            }
        })
    }

    fillEmail(email: string) {
        cy.get('[data-test-id="email"]').then(($field) => {
            cy.wrap($field).clear();
            if(email != ""){
                cy.wrap($field).type(email);
            }
        })
    }

    fillPhoneNumber(phoneNumber: string) {
        cy.get('[data-test-id="phone"]').then(($field) => {
            cy.wrap($field).clear();
            if(phoneNumber != ""){
                cy.wrap($field).type(phoneNumber);
            }
        })
    }

    fillPassword(password: string) {
        cy.get('[data-test-id="password"]').then(($field) => {
            cy.wrap($field).clear();
            if(password != ""){
                cy.wrap($field).type(password);
            }
        })
    }

    fillConfirmPassword(confirmPassword: string) {
        cy.get('[data-test-id="passwordConfirm"]').then(($field) => {
            cy.wrap($field).clear();
            if(confirmPassword != ""){
                cy.wrap($field).type(confirmPassword);
            }
        })
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

    fillFormAndSubmit(firstName: string, lastName: string, email: string, phoneNumber: string, password: string, confirmPassword: string, province: string, constent: string) {
        this.fillFirstName(firstName);
        this.fillLastname(lastName);
        this.fillEmail(email);
        this.fillPhoneNumber(phoneNumber);
        this.fillPassword(password);
        this.fillConfirmPassword(confirmPassword);
        this.selectProvince(province);
        this.constentAgreement(constent);
        this.submit();
    }

    // Validations

    // Required

    shouldContainRequired(testId: string) {
        cy.get(`[data-test-id="${testId}"]`)
        .find('[data-test-id="validation_errors_isRequired"]')
        .should('contain.text', 'Required');
    }

    shouldContainFirstNameRequired() {
        this.shouldContainRequired('form-error-firstName')
    }

    shouldContainLastNameRequired() {
        this.shouldContainRequired('form-error-lastName')
    }

    shouldContainEmailRequired() {
        this.shouldContainRequired('form-error-email')
    }

    shouldContainPhoneNumberRequired() {
        this.shouldContainRequired('form-error-phone')
    }

    shouldContainPasswordRequired() {
        this.shouldContainRequired('form-error-password')
    }

    shouldContainConfirmPasswordRequired() {
        this.shouldContainRequired('form-error-passwordConfirm')
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
  