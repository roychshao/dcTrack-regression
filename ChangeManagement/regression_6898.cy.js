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
    cy.visit(Cypress.config("url"));
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

  it("Visit Assets Page", () => {
    cy.wait(8000);
    cy.get(".menu-toggle").click();
    cy.get(".header-dropdown > li").as("dropdown");
    cy.get("@dropdown")
      .eq(3)
      .find("sun-icon.fa.fa-chevron-right")
      .should("exist")
      .click();
    cy.get("@dropdown").eq(3).contains("Items").click();
  });

  it("Find AMSTAD_T3 and initiate Prepare Move Item request", () => {
    cy.wait(4000);
    // filtering
    cy.getIframeBody('id="assets_iframe"')
      .find("#filter_tiName")
      .type("AMSTAD_T3{enter}");
    cy.wait(4000);
    cy.getIframeBody('id="assets_iframe"')
      .find(".ui-grid-canvas")
      .eq(1)
      .find(".ui-grid-row")
      .eq(0)
      .click();
    cy.getIframeBody('id="assets_iframe"')
      .find("#itemList")
      .find('[title="Actions"]')
      .click();
    cy.getIframeBody('id="assets_iframe"')
      .find("#dropdown-ACTION_TB > li")
      .as("dropdown");
    cy.get("@dropdown").eq(12).contains("Prepare Move Item Request").click();
  });

  it("Verify if the default connection is To Data Panel", () => {
    cy.getIframeBody('id="assets_iframe"')
      .find("#dct-capacity-modal-content")
      .as("model content");
    cy.get("@model content").find("#dataPortGroup").click();
    cy.getIframeBody('id="assets_iframe"')
      .find(".ui-grid-canvas")
      .contains("div", "To Data Panel");
    cy.getIframeBody('id="assets_iframe"').find("#modal-btnClose").click();
  });
});
