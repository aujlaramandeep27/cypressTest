import e2e from '../e2e';

class HomePage {
  private titleSelector = 'getAQuote_pageTitle';
  private logoutSelector = 'nav_logout';
  readonly pathName : string;

  constructor(pathName: string) {
      this.pathName = `/${pathName}`;
  }

  logout() {
    e2e.getByTestId(this.logoutSelector)
    .click();
  }

  validateHomeOpen(title: string) {
    cy.location("pathname").should("equal", this.pathName)

    // Log in to your nesto account form
    e2e.getByTestId(this.titleSelector)
    .should('contain', title);

    // Logo
    e2e.getByTestId(this.logoutSelector).should('be.visible');
  }
}
  
export default new HomePage("getaquote");
  