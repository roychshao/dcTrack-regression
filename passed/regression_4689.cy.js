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
    cy.wait(4000);
    cy.get(".menu-toggle").click();
    cy.get(".header-dropdown > li").as("dropdown");
    cy.get("@dropdown")
      .eq(8)
      .find("sun-icon.fa.fa-chevron-right")
      .should("exist")
      .click();
    cy.get("@dropdown").eq(8).contains("Models Library").click();
  });

  it("Clone 0000000111111 and rename it to TESTMOD1", () => {
    cy.getIframeBody('id="models_iframe"')
      .contains("div", "0000000111111")
      .click();
    cy.getIframeBody('id="models_iframe"')
      .find("#modellist")
      .find('[title="Clone selected model"]')
      .click();
    cy.wait(4000);
    cy.getIframeBody('id="models_iframe"').find("#tiPartNumber").clear();
    cy.getIframeBody('id="models_iframe"')
      .find("#cmbModel")
      .clear()
      .type("TESTMOD1{enter}");
    cy.wait(2000);
    cy.getIframeBody('id="models_iframe"')
      .find("#modeldetail")
      .find('[title="Save"]')
      .click();
    cy.wait(4000);
  });

  it("Visit Assets Page", () => {
    cy.get(".menu-toggle").click();
    cy.get(".header-dropdown > li").as("dropdown");
    cy.get("@dropdown")
      .eq(3)
      .find("sun-icon.fa.fa-chevron-right")
      .should("exist")
      .click();
    cy.get("@dropdown").eq(3).contains("Items").click();
  });

  it("Verify if the new model is available", () => {
    cy.wait(4000);
    cy.getIframeBody('id="assets_iframe"')
      .find("#itemList")
      .find('[title="Add an Item"]')
      .click();
    cy.getIframeBody('id="assets_iframe"').find("#cmbModel-btn1").click();
    cy.wait(2000);
    cy.getIframeBody('id="assets_iframe"')
      .find("#models-content")
      .find("#filter_model")
      .type("TESTMOD1{enter}");
    cy.getIframeBody('id="assets_iframe"')
      .find("#models-content")
      .contains("div", "TESTMOD1");
    cy.getIframeBody('id="assets_iframe"')
      .find(".dct-dialog-footer.dct-toolbar-actions")
      .find("#modal-btnCancel")
      .click();
    cy.getIframeBody('id="assets_iframe"').find("#btnRemoveTab").click();
  });

  it("Visit Models Library Page", () => {
    cy.wait(2000);
    cy.get(".menu-toggle").click();
    cy.get(".header-dropdown > li").as("dropdown");
    cy.get("@dropdown")
      .eq(8)
      .find("sun-icon.fa.fa-chevron-right")
      .should("exist")
      .click();
    cy.get("@dropdown").eq(8).contains("Models Library").click();
  });

  it("Delete TESTMOD1", () => {
    cy.wait(2000);
    cy.getIframeBody('id="models_iframe"')
      .find("#modeldetail")
      .find('[title="Delete"]')
      .click();
    cy.wait(2000);
    cy.getIframeBody('id="models_iframe"').find("#modal-btnOk").click();
  });
});
