import e2e from '../e2e';

class LoginPage {
  readonly pathName : string;

  constructor(pathName: string) {
      this.pathName = `/${pathName}`;
  }
  
  visit() {
    cy.visit(this.pathName);
  }

  signup() {
    e2e.getByTestId('loginPage_signUp')
    .click();
  }

  validateFormOpen(title: string) {
    cy.location("pathname").should("equal", this.pathName)

    // Log in to your nesto account form
    e2e.getByTestId('cardComponent_undefined')
    .should('contain', title);

    // Logo
    e2e.getByTestId('nestoSecured').should('be.visible');
  }
}
  
export default new LoginPage("login");
  