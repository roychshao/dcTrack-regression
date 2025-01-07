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

  it("Clone 404B", () => {
    cy.getIframeBody('id="assets_iframe"').contains("div", "404B").click();
    cy.getIframeBody('id="assets_iframe"')
      .find("#itemList")
      .find('[title="Clone"]')
      .click();
    cy.wait(2000);
    cy.getIframeBody('id="assets_iframe"').find("#modal-btnClone").click();
    cy.wait(4000);
    cy.getIframeBody('id="assets_iframe"').contains("div", "404B").dblclick();
    cy.wait(8000);
    cy.getIframeBody('id="assets_iframe"')
      .find("#itemDetail")
      .find('[title="Edit"]')
      .click();
    cy.getIframeBody('id="assets_iframe"')
      .find("#tiName")
      .clear()
      .type("404B-CLONE{enter}");
    cy.getIframeBody('id="assets_iframe"')
      .find("#cmbRowLabel-selectized")
      .type("01{enter}");
    cy.getIframeBody('id="assets_iframe"')
      .find("#cmbStatus-selectized")
      .parent()
      .click();
    cy.getIframeBody('id="assets_iframe"').find('[data-value="5082"]').click();
    cy.getIframeBody('id="assets_iframe"')
      .find("#itemDetail")
      .find('[title="Save"]')
      .click();
    cy.wait(10000);
  });

  it("Submit decommission to archive", () => {
    cy.wait(4000);
    cy.getIframeBody('id="assets_iframe"')
      .find("#itemDetail")
      .find('[title="Actions"]')
      .click();
    cy.getIframeBody('id="assets_iframe"')
      .find("#itemDetail")
      .find("#dropdown-ACTION_TB > li")
      .eq(6)
      .contains("Decommission Item to Archive Request")
      .click();
    cy.getIframeBody('id="assets_iframe"').find("#modal-btnOk").click();
    cy.wait(8000);
    cy.getIframeBody('id="assets_iframe"')
      .find("#idItemRequestTextArea")
      .invoke("val")
      .should("match", /404B-CLONE, Request: \d+, Request Issued: Successful\./)
      .and("match", /404B-CLONE, Request: \d+, Request Approved: Successful\./)
      .and("match", /404B-CLONE, Request: \d+, Work Order Issued: Successful\./)
      .and(
        "match",
        /404B-CLONE, Request: \d+, Work Order Complete: Successful\./,
      )
      .and("match", /404B-CLONE, Request: \d+, Request Complete: Successful\./);
    cy.getIframeBody('id="assets_iframe"').find("#modal-btnCancel").click();
  });

  it("Visit Change page", () => {
    cy.get(".menu-toggle").click();
    cy.get(".header-dropdown > li").as("dropdown");
    cy.get("@dropdown")
      .eq(5)
      .find("sun-icon.fa.fa-chevron-right")
      .should("exist")
      .click();
    cy.get("@dropdown").eq(5).contains("Requests").click();
  });

  it("Verify requests complete", () => {
    cy.wait(4000);
    cy.getIframeBody('id="change_iframe"')
      .find(".ui-grid-viewport")
      .eq(1)
      .find(".ui-grid-canvas > div")
      .eq(0)
      .contains("div", "Decommission to Archive: 404B-CLONE");
    cy.getIframeBody('id="change_iframe"')
      .find(".ui-grid-viewport")
      .eq(1)
      .find(".ui-grid-canvas > div")
      .eq(0)
      .contains("div", "Request Complete");
  });

  it("Back to Assets page", () => {
    cy.get(".menu-toggle").click();
    cy.get(".header-dropdown > li").as("dropdown");
    cy.get("@dropdown")
      .eq(3)
      .find("sun-icon.fa.fa-chevron-right")
      .should("exist")
      .click();
    cy.get("@dropdown").eq(3).contains("Items").click();
  });

  it("Remove 404B-CLONE", () => {
    cy.wait(2000);
    cy.getIframeBody('id="assets_iframe"')
      .find("#itemDetail")
      .find('[title="Delete selected items"]')
      .click();
    cy.getIframeBody('id="assets_iframe"').find("#modal-btnOk").click();
    cy.wait(4000);
    cy.getIframeBody('id="assets_iframe"').contains("div", "404").click();
    cy.getIframeBody('id="assets_iframe"')
      .find("#itemList")
      .find('[title="Delete selected items"]')
      .click();
    cy.getIframeBody('id="assets_iframe"').find("#modal-btnOk").click();
  });
});
