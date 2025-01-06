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
    cy.visit("192.168.56.105");
  });

  it("log in", () => {
    cy.on("fail", (err, runnable) => {
      cy.log("already log in");
      return false;
    });

    cy.get(".login").type("13473-user3");
    cy.get(".password").type("Selab305!");
    cy.contains("Log in").click();
  });

  it("Visit Assets Page", () => {
    cy.wait(14000);
    cy.get(".menu-toggle").click();
    cy.get(".header-dropdown > li").as("dropdown");
    cy.get("@dropdown")
      .eq(3)
      .find("sun-icon.fa.fa-chevron-right")
      .should("exist")
      .click();
    cy.get("@dropdown").eq(3).contains("Items").click();
  });

  it("Verify only SITE C is visible", () => {
    cy.wait(16000);
    cy.getIframeBody('id="assets_iframe"').find("#filter_cmbLocation").click();
    cy.getIframeBody('id="assets_iframe"')
      .find("#option-0")
      .contains("span", "SITE C");
    cy.getIframeBody('id="assets_iframe"')
      .find("#option-1")
      .should("not.exist");
    cy.getIframeBody('id="assets_iframe"')
      .contains("span", "SITE A")
      .should("exist");
  });
});
