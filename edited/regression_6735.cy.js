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
    cy.viewport(1100, 1100);
    Cypress.config("defaultCommandTimeout", 20000);
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

  it("Install two items, one can install successfully, the other should failed", () => {
    // install success: 6M
    // install failed: 401-XIV-1 (cabinet not installed)
    cy.wait(10000);
    cy.getIframeBody('id="assets_iframe"').find("#filter_tiClass").click();
    cy.getIframeBody('id="assets_iframe"').find("#option-6").click();
    cy.getIframeBody('id="assets_iframe"').find("#filter_tiClass").click();
    cy.wait(2000);
    cy.getIframeBody('id="assets_iframe"')
      .contains("div", "401-XIV-1")
      .eq(0)
      .click({ ctrlKey: true });
    cy.getIframeBody('id="assets_iframe"')
      .contains("div", "6M")
      .eq(0)
      .click({ ctrlKey: true });
    cy.wait(2000);
    cy.getIframeBody('id="assets_iframe"')
      .find("#itemList")
      .find('[title="Actions"]')
      .click();
    cy.getIframeBody('id="assets_iframe"')
      .find("#itemList")
      .find("#dropdown-ACTION_TB > li")
      .as("dropdown");
    cy.wait(2000);
    cy.get("@dropdown").eq(8).contains("Install Item Request").click();
    cy.getIframeBody('id="assets_iframe"').find("#modal-btnOk").click();
  });

  it("Verify 6M success and 401-XIV-1 failed", () => {
    cy.wait(8000);
    const successMsg = "Request Complete: Successful.";
    const failedMsg =
      "Install Item: 401-XIV-1. Item 401-XIV-1 cannot be Installed because its Cabinet is not in the Installed status and is not included in this work order.";
    cy.getIframeBody('id="assets_iframe"')
      .find("#idItemRequestTextArea")
      .should(($t) => {
        const value = $t.val();
        expect(value).to.include(successMsg);
        expect(value).to.include(failedMsg);
      });
    cy.getIframeBody('id="assets_iframe"').find("#modal-btnCancel").click();
  });

  it("Make 6M back to planned status", () => {
    cy.getIframeBody('id="assets_iframe"')
      .contains("div", "6M")
      .eq(0)
      .dblclick();
    cy.wait(4000);
    cy.getIframeBody('id="assets_iframe"')
      .find("#itemDetail")
      .find('[title="Edit"]')
      .click();
    cy.wait(2000);
    cy.getIframeBody('id="assets_iframe"')
      .find('[uib-tooltip="Installed"]')
      .click();
    cy.getIframeBody('id="assets_iframe"').find('[data-value="5081"]').click();
    cy.getIframeBody('id="assets_iframe"')
      .find("#itemDetail")
      .find('[title="Save"]')
      .click();
    cy.wait(12000);
  });

  it("Visit Change Page", () => {
    cy.get(".menu-toggle").click();
    cy.get(".header-dropdown > li").as("dropdown");
    cy.get("@dropdown")
      .eq(5)
      .find("sun-icon.fa.fa-chevron-right")
      .should("exist")
      .click();
    cy.get("@dropdown").eq(5).contains("Requests").click();
  });

  it("Cancel the second request", () => {
    cy.wait(4000);
    cy.getIframeBody('id="change_iframe"')
      .find("#requests")
      .find('[title="Refresh"]')
      .click();
    cy.wait(4000);
    cy.getIframeBody('id="change_iframe"')
      .find(".ui-grid-canvas > div")
      .eq(1)
      .click();
    cy.getIframeBody('id="change_iframe"')
      .find("#requests")
      .find('[title="Action for selected request."]')
      .click();
    cy.getIframeBody('id="change_iframe"')
      .find("#requests")
      .contains("span", "Cancel Request")
      .click();
    cy.getIframeBody('id="change_iframe"').find("#modal-btnCancel").click();
  });
});
