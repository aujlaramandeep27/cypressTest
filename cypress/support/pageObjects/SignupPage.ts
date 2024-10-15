import e2e from '../e2e';

class SignupPage {

    private titleSelector = 'form_signup_title';
    private logoSelector = 'nestoSecured';
    private firstNameSelector = 'firstName';
    private lastNameSelector = 'lastName';
    private emailSelector = 'email';
    private phoneSelector = 'phone';
    private passwordSelector = 'password';
    private confirmPasswordSelector = 'passwordConfirm';
    private passwordComplexitySelector = 'formWarn_passwordComplexity';
    private provinceSelector = 'province';
    private agreementSelector = 'leadDistributeConsentAgreement';
    private agreementLabelSelector = 'getAQuote_shortPartnerAgreementAndEmail_V3';
    private readPolicyLabelSelector = 'readOurPolicy_V2';
    private createAccountSelector = 'createYourAccount';
    private createAccountAgreementSelector = 'createAccountAgreement';
    private loginSelector = 'login-link';

    readonly pathName : string;

    constructor(pathName: string) {
        this.pathName = `/${pathName}`;
    }

    login() {
        e2e.getByTestId(this.loginSelector)
        .click();
    }

    fillFirstName(firstName: string) {
        e2e.clearAndFillField(this.firstNameSelector, firstName);
    }

    fillLastname(lastName: string) {
        e2e.clearAndFillField(this.lastNameSelector, lastName);
    }

    fillEmail(email: string) {
        e2e.clearAndFillField(this.emailSelector, email);
    }

    fillPhoneNumber(phoneNumber: string) {
        e2e.clearAndFillField(this.phoneSelector, phoneNumber);
    }

    shouldHavePhoneNumber(expectedvalue: string) {
        e2e.getByTestId(this.phoneSelector).should('have.value', expectedvalue);
    }

    fillPassword(password: string) {
        e2e.clearAndFillField(this.passwordSelector, password);
    }

    shouldHavePassword(expectedvalue: string) {
        e2e.getByTestId(this.passwordSelector).should('have.value', expectedvalue);
    }

    fillConfirmPassword(passwordConfirm: string) {
        e2e.clearAndFillField(this.confirmPasswordSelector, passwordConfirm);
    }

    selectProvince(province: string) {
        if(province != "") {
            e2e.getByTestId(this.provinceSelector).within(() => {
                cy.get('.react-select__control').click();
                cy.get('.react-select__menu').contains(province).click();
            })
        }
    }

    typeProvince(province: string) {
        e2e.getByTestId(this.provinceSelector).type(province);
    }

    shouldHaveProvince(expectedvalue: string) {
        e2e.getByTestId(this.provinceSelector)
        .find('.react-select__single-value')
        .should('contain', expectedvalue);
    }

    constentAgreement(agree: string) {
        if(agree != "") {
            e2e.getByTestId(this.agreementSelector).then(($checkbox) => {
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
        e2e.getByTestId(this.createAccountSelector).click();
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

    validateFormOpen(title: string) {
        cy.location("pathname").should("equal", this.pathName)

        // Create nesto account form
        e2e.getByTestId(this.titleSelector)
        .should('contain', title);

        // Logo
        e2e.getByTestId(this.logoSelector).should('be.visible');
    }

    validateFieldAreReset() {
        e2e.getByTestId(this.firstNameSelector).should('have.value', '');
        e2e.getByTestId(this.lastNameSelector).should('have.value', '');
        e2e.getByTestId(this.emailSelector).should('have.value', '');
        e2e.getByTestId(this.phoneSelector).should('have.value', '');
        e2e.getByTestId(this.passwordSelector).should('have.value', '');
        e2e.getByTestId(this.confirmPasswordSelector).should('have.value', '');
        e2e.getByTestId(this.provinceSelector).contains('div', 'Ontario');
        e2e.getByTestId(this.agreementSelector).should('not.be.checked');
    }

    // Label validations

    validateFirstNameLabel(label: string) {
        e2e.getLabelByTestId(this.firstNameSelector).should('contain', label);
    }

    validateLastNameLabel(label: string) {
        e2e.getLabelByTestId(this.lastNameSelector).should('contain', label);
    }

    validateEmailLabel(label: string) {
        e2e.getLabelByTestId(this.emailSelector).should('contain', label);
    }

    validatePhoneLabel(label: string) {
        e2e.getLabelByTestId(this.phoneSelector).should('contain', label);
    }

    validatePasswordLabel(label: string) {
        e2e.getLabelByTestId(this.passwordSelector).should('contain', label);
    }

    validateConfirmPasswordLabel(label: string) {
        e2e.getLabelByTestId(this.confirmPasswordSelector).should('contain', label);
    }

    validatePasswordComplexityLabel(label: string) {
        e2e.getByTestId(this.passwordComplexitySelector).should('contain', label);
    }

    validateProvinceLabel(label: string) {
        e2e.getByTestId(this.provinceSelector).should('contain', label);
    }

    validateProvinceDefaultValue(val: string) {
        e2e.getByTestId(this.provinceSelector).contains('div', val);
    }

    validateAgreementLabel(label: string) {
        e2e.getByTestId(this.agreementLabelSelector).should('contain', label);
    }

    validateReadPolicyLabel(label: string) {
        e2e.getByTestId(this.readPolicyLabelSelector).should('contain', label);
    }

    validateCreateAccountLabel(label: string) {
        e2e.getByTestId(this.createAccountSelector).should('contain', label);
    }

    validateCreateAccountAgreementLabel(label: string) {
        e2e.getByTestId(this.createAccountAgreementSelector).should('contain', label);
    }

    // Field Validations

    shouldContainFirstNameError(message: string) {
        e2e.shouldContainError(`form-error-${this.firstNameSelector}`, message);
    }

    shouldContainLastNameError(message: string) {
        e2e.shouldContainError(`form-error-${this.lastNameSelector}`, message);
    }

    shouldContainEmailError(message: string) {
        e2e.shouldContainError(`form-error-${this.emailSelector}`, message);
    }

    shouldContainPhoneNumberError(message: string) {
        e2e.shouldContainError(`form-error-${this.phoneSelector}`, message);
    }

    shouldContainPasswordError(message: string) {
        e2e.shouldContainError(`form-error-${this.passwordSelector}`, message);
    }

    shouldContainConfirmPasswordError(message: string) {
        e2e.shouldContainError(`form-error-${this.confirmPasswordSelector}`, message);
    }
  }
  
  export default new SignupPage("signup");
  