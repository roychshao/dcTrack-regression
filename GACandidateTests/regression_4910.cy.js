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

  it("Verify log in", () => {
    // wrong account but correct password
    cy.get(".login").type("adm1n");
    cy.get(".password").type("sunbird");
    cy.contains("Log in").click();
    cy.get(".alert.alert-danger").contains("Invalid user name or password.");

    // wrong password but correct account
    cy.get(".login").clear().type("admin");
    cy.get(".password").clear().type("sunb1rd");
    cy.contains("Log in").click();
    cy.get(".alert.alert-danger").contains("Invalid user name or password.");

    // correct accout no password provided
    cy.get(".login").clear().type("admin");
    cy.get(".password").clear();
    cy.contains("Log in").click();
    cy.get(".alert.alert-danger").contains("Invalid user name or password.");

    // no account and password provided
    cy.get(".login").clear();
    cy.get(".password").clear();
    cy.contains("Log in").click();
    cy.get(".alert.alert-danger").contains("Invalid user name or password.");

    // normal login
    cy.get(".login").type("admin");
    cy.get(".password").type("sunbird");
    cy.contains("Log in").click();
  });

  it("Visit Models Library Page", () => {
    cy.wait(10000);
    cy.get(".menu-toggle").click();
    cy.get(".header-dropdown > li").as("dropdown");
    cy.get("@dropdown")
      .eq(8)
      .find("sun-icon.fa.fa-chevron-right")
      .should("exist")
      .click();
    cy.get("@dropdown").eq(8).contains("dcTrack Settings").click();
  });

  it("Go Authorization & Authentication", () => {
    cy.wait(4000);
    cy.contains("span", " Authorization & Authentication").parent().click();
    cy.get(".sun-menu-items").find('[href="#/settings/ldap"]').click();
  });

  it("Disable AD & OpenLDAP", () => {
    cy.wait(2000);
    cy.contains("button", "LDAP & AD is Enabled").should("exist");
    cy.contains("button", "LDAP & AD is Enabled").click();
    cy.contains("button", "LDAP & AD is Disabled").should("exist");
  });

  it("Logoff", () => {
    cy.get("#headerToolbar_userAccount").click();
    cy.contains("a", "Logoff").click();
  });

  // NOTE: When logged off, the next time login will failed and display: "You have already logout"
  it("Verify Login again", () => {
    // wrong account but correct password
    cy.get(".login").type("adm1n");
    cy.get(".password").type("sunbird");
    cy.contains("Log in").click();
    cy.get(".alert.alert-danger").contains("Invalid user name or password.");

    // wrong password but correct account
    cy.get(".login").clear().type("admin");
    cy.get(".password").clear().type("sunb1rd");
    cy.contains("Log in").click();
    cy.get(".alert.alert-danger").contains("Invalid user name or password.");

    // correct accout no password provided
    cy.get(".login").clear().type("admin");
    cy.get(".password").clear();
    cy.contains("Log in").click();
    cy.get(".alert.alert-danger").contains("Invalid user name or password.");

    // no account and password provided
    cy.get(".login").clear();
    cy.get(".password").clear();
    cy.contains("Log in").click();
    cy.get(".alert.alert-danger").contains("Invalid user name or password.");

    // normal login
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

  it("Go Authorization & Authentication", () => {
    cy.wait(4000);
    cy.contains("span", " Authorization & Authentication").parent().click();
    cy.get(".sun-menu-items").find('[href="#/settings/ldap"]').click();
  });

  it("Enable AD & OpenLDAP", () => {
    cy.wait(2000);
    cy.contains("button", "LDAP & AD is Disabled").should("exist");
    cy.contains("button", "LDAP & AD is Disabled").click();
    cy.contains("button", "LDAP & AD is Enabled").should("exist");
  });
});
