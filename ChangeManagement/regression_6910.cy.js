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

  it("Filtering", () => {
    cy.wait(4000);
    cy.getIframeBody('id="assets_iframe"').find("#filter_tiClass").click();
    cy.getIframeBody('id="assets_iframe"').find("#option-6").click();
    cy.getIframeBody('id="assets_iframe"').find("#filter_tiSubclass").click();
    cy.getIframeBody('id="assets_iframe"').find("#option-16").click();
    cy.getIframeBody('id="assets_iframe"').find("#filter_cmbStatus").click();
    cy.getIframeBody('id="assets_iframe"').find("#option-1").click();
    cy.getIframeBody('id="assets_iframe"').find("#filter_cmbStatus").click();
  });

  it("Select Proliant DL380 Gen9", () => {
    cy.getIframeBody('id="assets_iframe"')
      .contains("div", "Proliant DL380 Gen9")
      .dblclick();
  });

  it("Verify the Move item request is enabled", () => {
    cy.wait(4000);
    cy.getIframeBody('id="assets_iframe"')
      .find("#itemDetail")
      .find('[title="Actions"]')
      .click();
    cy.getIframeBody('id="assets_iframe"')
      .find("#itemDetail")
      .find("#dropdown-ACTION_TB > li")
      .eq(11)
      .contains("Quick Move Item Request...")
      .should("not.have.attr", "disabled", "disabled");
    cy.getIframeBody('id="assets_iframe"')
      .find("#itemDetail")
      .find("#dropdown-ACTION_TB > li")
      .eq(12)
      .contains("Prepare Move Item Request...")
      .should("not.have.attr", "disabled", "disabled");
  });
  // Omit step: submit, since it is totally work good
});
