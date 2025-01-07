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
    cy.wait(4000);
  });

  it("Clone 101", () => {
    cy.getIframeBody('id="assets_iframe"')
      .contains("div", "48RU-Cabinet GlobalFrame-3A-400")
      .click();
    cy.getIframeBody('id="assets_iframe"')
      .find("#itemList")
      .find('[title="Clone"]')
      .click();
    cy.getIframeBody('id="assets_iframe"').find("#modal-btnClone").click();
    cy.wait(2000);
    cy.getIframeBody('id="assets_iframe"')
      .find(".tab-pane.active")
      .contains("div", "48RU-Cabinet GlobalFrame-3A-400")
      .dblclick();
  });

  it("Rename it and save it", () => {
    cy.wait(8000);
    cy.getIframeBody('id="assets_iframe"')
      .find("#itemDetail")
      .find('[title="Edit"]')
      .click();
    cy.wait(2000);
    cy.getIframeBody('id="assets_iframe"')
      .find("#tiName")
      .clear()
      .type("101-CLONE{enter}");
    cy.wait(1000);
    cy.getIframeBody('id="assets_iframe"')
      .find("#itemDetail")
      .find('[title="Save"]')
      .click();
    cy.wait(6000);
  });

  // NOTE: Install request
  it("Try to Install it", () => {
    cy.getIframeBody('id="assets_iframe"')
      .find("#itemDetail")
      .find('[title="Actions"]')
      .click();
    cy.getIframeBody('id="assets_iframe"')
      .find("#itemDetail")
      .find("#dropdown-ACTION_TB > li")
      .as("dropdown");
    cy.get("@dropdown").eq(8).contains("Install Item Request").click();
    cy.getIframeBody('id="assets_iframe"').find("#modal-btnOk").click();
  });

  it("Verify the error message should exist", () => {
    cy.wait(4000);
    cy.getIframeBody('id="assets_iframe"')
      .find("#idItemRequestTextArea")
      .should(($t) => {
        const value = $t.val();
        const errMsg1 =
          "101-CLONE, Request could not be issued, The field [ Row Label ] is mandatory for the Item Status Installed. Please fill in the Row Label before submitting request. If request was approved, delete work order and request before editing record. If request was approved, delete work order and request before editing record.";
        const errMsg2 =
          "101-CLONE, Request could not be issued, The field [ Position in Row ] is mandatory for the Item Status Installed. Please fill in the Position in Row before submitting request. If request was approved, delete work order and request before editing record. If request was approved, delete work order and request before editing record.";
        expect(value).to.include(errMsg1).and.to.include(errMsg2);
      });
    cy.getIframeBody('id="assets_iframe"').find("#modal-btnCancel").click();
  });

  it("Delete 101-CLONE", () => {
    cy.getIframeBody('id="assets_iframe"')
      .find("#itemDetail")
      .find('[title="Delete selected items"]')
      .click();
    cy.getIframeBody('id="assets_iframe"').find("#modal-btnOk").click();
  });
});
