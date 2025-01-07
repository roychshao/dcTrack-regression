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

  it("Clone 009-6212-2100", () => {
    cy.wait(4000);
    cy.getIframeBody('id="models_iframe"')
      .find("#filter_class")
      .find("button")
      .click();
    cy.getIframeBody('id="models_iframe"').find("#option-14").click();
    cy.wait(8000);
    cy.getIframeBody('id="models_iframe"')
      .contains("div", "009-6212-2100")
      .click();
    cy.getIframeBody('id="models_iframe"')
      .find("#modellist")
      .find('[title="Clone selected model"]')
      .click();
  });

  it("Rename it to be CLONED and save", () => {
    cy.wait(12000);
    cy.getIframeBody('id="models_iframe"')
      .find("#cmbModel")
      .clear()
      .type("CLONED{enter}");
    cy.wait(2000);
    cy.getIframeBody('id="models_iframe"')
      .find("#modeldetail")
      .find('[title="Save"]')
      .click();
  });

  it("Create a new item with CLONED and it should have 14 power ports", () => {
    cy.wait(6000);
    cy.get(".menu-toggle").click();
    cy.get(".header-dropdown > li").as("dropdown");
    cy.get("@dropdown")
      .eq(3)
      .find("sun-icon.fa.fa-chevron-right")
      .should("exist")
      .click();
    cy.get("@dropdown").eq(3).contains("Items").click();
    cy.wait(4000);
    cy.getIframeBody('id="assets_iframe"')
      .find("#itemList")
      .find('[title="Add an Item"]')
      .click();
    cy.wait(12000);
    cy.getIframeBody('id="assets_iframe"')
      .find("#cmbModel-selectized")
      .type("CLONED");
    cy.wait(2000);
    cy.getIframeBody('id="assets_iframe"')
      .find("#cmbModel-selectized")
      .type("{enter}");
    cy.wait(10000);
    cy.getIframeBody('id="assets_iframe"').find("#tiName").should("be.visible");
    cy.getIframeBody('id="assets_iframe"')
      .find("#tiName")
      .type("CLONED-1{enter}");
    cy.getIframeBody('id="assets_iframe"')
      .find("#subtab-powerPorts")
      .parent()
      .click();
    cy.getIframeBody('id="assets_iframe"')
      .find("#powerPortsGrid")
      .find(".ui-grid-canvas")
      .eq(3)
      .children()
      .should("have.length", 14);
    cy.getIframeBody('id="assets_iframe"')
      .find("#itemDetail")
      .find('[title="Save"]')
      .click();
    cy.wait(10000);
    cy.getIframeBody('id="assets_iframe"')
      .find("#inner-scroller")
      .find("#btnRemoveTab")
      .click();
  });

  it("Go back to Model Library", () => {
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

  it("Remove a power port and save", () => {
    cy.wait(4000);
    cy.getIframeBody('id="models_iframe"')
      .find("#subtab-PowerPorts")
      .parent()
      .click();
    cy.getIframeBody('id="models_iframe"')
      .find('[aria-label="Row 3, Row Selection Checkbox"]')
      .eq(1)
      .click();
    cy.getIframeBody('id="models_iframe"').find("#btnDelete").click();
    cy.getIframeBody('id="models_iframe"')
      .find("#modeldetail")
      .find('[title="Save"]')
      .click();
    cy.wait(4000);
  });

  it("Create a new item with CLONED and it should have 13 power ports", () => {
    cy.wait(6000);
    cy.get(".menu-toggle").click();
    cy.get(".header-dropdown > li").as("dropdown");
    cy.get("@dropdown")
      .eq(3)
      .find("sun-icon.fa.fa-chevron-right")
      .should("exist")
      .click();
    cy.get("@dropdown").eq(3).contains("Items").click();
    cy.wait(8000);
    cy.getIframeBody('id="assets_iframe"')
      .find("#itemList")
      .find('[title="Add an Item"]')
      .click();
    cy.wait(12000);
    cy.getIframeBody('id="assets_iframe"')
      .find("#cmbModel-selectized")
      .type("CLONED");
    cy.wait(2000);
    cy.getIframeBody('id="assets_iframe"')
      .find("#cmbModel-selectized")
      .type("{enter}");
    cy.wait(10000);
    cy.getIframeBody('id="assets_iframe"').find("#tiName").should("be.visible");
    cy.getIframeBody('id="assets_iframe"')
      .find("#subtab-powerPorts")
      .parent()
      .click();
    cy.getIframeBody('id="assets_iframe"')
      .find("#powerPortsGrid")
      .find(".ui-grid-canvas")
      .eq(3)
      .children()
      .should("have.length", 13);
    cy.getIframeBody('id="assets_iframe"')
      .find("#inner-scroller")
      .find("#btnRemoveTab")
      .click();
    cy.getIframeBody('id="assets_iframe"').find("#modal-btnOk").click();
  });

  it("Verify the CLONED-1 is not affected", () => {
    cy.wait(4000);
    cy.getIframeBody('id="assets_iframe"')
      .find("#filter_tiName")
      .type("CLONED{enter}");
    cy.wait(2000);
    cy.getIframeBody('id="assets_iframe"')
      .contains("div", "CLONED-1")
      .dblclick();
    cy.wait(6000);
    cy.getIframeBody('id="assets_iframe"')
      .find("#subtab-powerPorts")
      .parent()
      .click();
    cy.getIframeBody('id="assets_iframe"')
      .find("#powerPortsGrid")
      .find(".ui-grid-canvas")
      .eq(3)
      .children()
      .should("have.length", 14);
  });

  it("Delete CLONED-1", () => {
    cy.getIframeBody('id="assets_iframe"')
      .find("#itemDetail")
      .find('[title="Delete selected items"]')
      .click();
    cy.getIframeBody('id="assets_iframe"')
      .find(".dct-msg-footer.dct-toolbar")
      .find("#modal-btnOk")
      .click();
    cy.wait(4000);
  });

  it("Back to Models Library", () => {
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

  it("Remove CLONED", () => {
    cy.wait(4000);
    cy.getIframeBody('id="models_iframe"')
      .find("#modeldetail")
      .find('[title="Refresh Model"]')
      .click();
    cy.wait(4000);
    cy.getIframeBody('id="models_iframe"')
      .find("#modeldetail")
      .find('[title="Delete"]')
      .click();
    cy.getIframeBody('id="models_iframe"').find("#modal-btnOk").click();
  });
});
