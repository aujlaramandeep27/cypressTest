import e2e from '../e2e';

class LoginPage {
  private titleSelector = 'cardComponent_undefined';
  private logoSelector = 'nestoSecured';
  private signupLinkSelector = 'loginPage_signUp';

  readonly pathName : string;

  constructor(pathName: string) {
      this.pathName = `/${pathName}`;
  }
  
  visit() {
    cy.visit(this.pathName);
  }

  signup() {
    e2e.getByTestId(this.signupLinkSelector)
    .click();
  }

  validateFormOpen(title: string) {
    cy.location("pathname").should("equal", this.pathName)

    // Log in to your nesto account form
    e2e.getByTestId(this.titleSelector)
    .should('contain', title);

    // Logo
    e2e.getByTestId(this.logoSelector).should('be.visible');
  }
}
  
export default new LoginPage("login");
  