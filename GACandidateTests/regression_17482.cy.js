Cypress.Commands.add("getIframeBody", (attribute) => {
  // get the iframe > document > body
  // and retry until the body element is not empty
  return (
    cy
      .get("iframe[" + attribute + "]")
      .its("0.contentDocument.body")
      .should("not.be.empty")
      // wraps "body" DOM element to allow
      // chaining more Cypress commands, like ".find(...)"
      // https://on.cypress.io/wrap
      .then(cy.wrap)
  );
});

describe("dcTrack front-end testing ", () => {
  beforeEach(() => {
    Cypress.config("defaultCommandTimeout", 10000);
  });

  it("Visit page", () => {
    cy.visit(Cypress.config('url'));
  });

  it("log in", () => {
    cy.on("fail", (err, runnable) => {
      cy.log("already log in");
      return false;
    });

    cy.get(".login").type("admin");
    cy.get(".password").type("sunbird");
    cy.contains("Log in").click();
  });

  it("Visit Models Library Page", () => {
    cy.wait(6000);
    cy.get(".menu-toggle").click();
    cy.get(".header-dropdown > li").as("dropdown");
    cy.get("@dropdown")
      .eq(8)
      .find("sun-icon.fa.fa-chevron-right")
      .should("exist")
      .click();
    cy.get("@dropdown").eq(8).contains("dcTrack Settings").click();
  });

  it("Go Appliance Administration", () => {
    cy.wait(2000);
    cy.get(".sun-menu-items").find("li").eq(1).click();
    cy.get(".sun-menu-items")
      .find('[href="#/settings/display-locale"]')
      .click();
  });

  it("Verify the User-created HTML widgets on the dashboard is disabled", () => {
    cy.wait(2000);
    cy.contains("sun-label", " Allow ").should("exist");
    cy.get('[formcontrolname="allowHtmlPortlets"]')
      .find('input[type="checkbox"]')
      .eq(0)
      .should("not.be.checked");
  });
});
