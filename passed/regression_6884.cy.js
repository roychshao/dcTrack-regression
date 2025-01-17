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

  it("Visit Assets Page", () => {
    cy.wait(10000);
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

  // NOTE: Issued Stage
  it("Choose item 101", () => {
    cy.getIframeBody('id="assets_iframe"').contains("div", "101").eq(0).click();
  });

  it("Quick move item request", () => {
    cy.wait(4000);
    cy.getIframeBody('id="assets_iframe"')
      .find("#itemList")
      .find('[title="Actions"]')
      .click();
    cy.getIframeBody('id="assets_iframe"')
      .find("#itemList")
      .find("#dropdown-ACTION_TB > li")
      .as("dropdown");
    cy.get("@dropdown").eq(11).contains("Quick Move Item Request...").click();
  });

  it("Confirm the request", () => {
    cy.wait(8000);
    cy.getIframeBody('id="assets_iframe"')
      .find("#itemDetail")
      .find('[title="Save"]')
      .click();
    cy.wait(4000);
    cy.getIframeBody('id="assets_iframe"').find("#modal-btnOk").click();
    cy.wait(12000);
    cy.getIframeBody('id="assets_iframe"').find("#modal-btnCancel").click();
  });

  // NOTE: Approved Stage
  it("Choose item 102", () => {
    cy.wait(2000);
    cy.getIframeBody('id="assets_iframe"').contains("div", "102").eq(0).click();
  });

  it("Quick move item request", () => {
    cy.wait(4000);
    cy.getIframeBody('id="assets_iframe"')
      .find("#itemList")
      .find('[title="Actions"]')
      .click();
    cy.getIframeBody('id="assets_iframe"')
      .find("#itemList")
      .find("#dropdown-ACTION_TB > li")
      .as("dropdown");
    cy.get("@dropdown").eq(11).contains("Quick Move Item Request...").click();
  });

  it("Confirm the request", () => {
    cy.wait(8000);
    cy.getIframeBody('id="assets_iframe"')
      .find("#itemDetail")
      .find('[title="Save"]')
      .click();
    cy.wait(4000);
    cy.getIframeBody('id="assets_iframe"').find("#modal-btnOk").click();
    cy.wait(12000);
    cy.getIframeBody('id="assets_iframe"').find("#modal-btnCancel").click();
  });

  // NOTE: create work order
  it("Choose item 103", () => {
    cy.wait(2000);
    cy.getIframeBody('id="assets_iframe"').contains("div", "103").eq(0).click();
  });

  it("Quick move item request", () => {
    cy.wait(4000);
    cy.getIframeBody('id="assets_iframe"')
      .find("#itemList")
      .find('[title="Actions"]')
      .click();
    cy.getIframeBody('id="assets_iframe"')
      .find("#itemList")
      .find("#dropdown-ACTION_TB > li")
      .as("dropdown");
    cy.get("@dropdown").eq(11).contains("Quick Move Item Request...").click();
  });

  it("Confirm the request", () => {
    cy.wait(8000);
    cy.getIframeBody('id="assets_iframe"')
      .find("#itemDetail")
      .find('[title="Save"]')
      .click();
    cy.wait(4000);
    cy.getIframeBody('id="assets_iframe"').find("#modal-btnOk").click();
    cy.wait(12000);
    cy.getIframeBody('id="assets_iframe"').find("#modal-btnCancel").click();
  });

  // Process Requests
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

  it("Approve the first request", () => {
    cy.getIframeBody('id="change_iframe"')
      .find(".ui-grid-canvas > div")
      .eq(0)
      .click();
    cy.getIframeBody('id="change_iframe"')
      .find("#requests")
      .find('[title="Action for selected request."]')
      .click();
    cy.getIframeBody('id="change_iframe"')
      .find("#requests")
      .find("#dropdown-ACTION_TB > li")
      .as("dropdown");
    cy.get("@dropdown").eq(1).find("span", "Approve Request").click();
    cy.getIframeBody('id="change_iframe"').find("#modal-btnCancel").click();
  });

  it("Create work order for the approved request", () => {
    cy.getIframeBody('id="change_iframe"')
      .find("#requests")
      .find('[title="Refresh"]')
      .click();
    cy.wait(2000);
    cy.getIframeBody('id="change_iframe"')
      .find(".ui-grid-canvas > div")
      .eq(0)
      .click();
    cy.getIframeBody('id="change_iframe"')
      .find("#requests")
      .find('[title="Action for selected request."]')
      .click();
    cy.getIframeBody('id="change_iframe"')
      .find("#requests")
      .find("#dropdown-ACTION_TB > li")
      .as("dropdown");
    cy.get("@dropdown").eq(3).find("span", "Create Work Order").click();
    cy.getIframeBody('id="change_iframe"').find("#modal-btnCancel").click();
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

  it("Select the work order created (first) request", () => {
    cy.wait(2000);
    cy.getIframeBody('id="change_iframe"')
      .find("#requests")
      .find('[title="Refresh"]')
      .click();
    cy.wait(4000);
    cy.getIframeBody('id="change_iframe"')
      .find(".ui-grid-canvas > div")
      .eq(0)
      .click();
  });

  it("Cancel request", () => {
    cy.getIframeBody('id="change_iframe"')
      .find("#requests")
      .find('[title="Action for selected request."]')
      .click();
    cy.getIframeBody('id="change_iframe"')
      .find("#dropdown-ACTION_TB > li")
      .as("dropdown");
    cy.get("@dropdown").eq(7).contains("Cancel Request").click();
    cy.wait(4000);
    cy.getIframeBody('id="change_iframe"').find("#modal-btnCancel").click();
  });

  it("Approve the second request", () => {
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
      .find("#dropdown-ACTION_TB > li")
      .as("dropdown");
    cy.get("@dropdown").eq(1).find("span", "Approve Request").click();
    cy.getIframeBody('id="change_iframe"').find("#modal-btnCancel").click();
  });

  it("Select the approved (second) request", () => {
    cy.getIframeBody('id="change_iframe"')
      .find("#requests")
      .find('[title="Refresh"]')
      .click();
    cy.wait(4000);
    cy.getIframeBody('id="change_iframe"')
      .find(".ui-grid-canvas > div")
      .eq(1)
      .click();
  });

  it("Cancel request", () => {
    cy.getIframeBody('id="change_iframe"')
      .find("#requests")
      .find('[title="Action for selected request."]')
      .click();
    cy.getIframeBody('id="change_iframe"')
      .find("#dropdown-ACTION_TB > li")
      .as("dropdown");
    cy.get("@dropdown").eq(7).contains("Cancel Request").click();
    cy.wait(4000);
    cy.getIframeBody('id="change_iframe"').find("#modal-btnCancel").click();
  });

  it("Select the issued (third) request", () => {
    cy.getIframeBody('id="change_iframe"')
      .find("#requests")
      .find('[title="Refresh"]')
      .click();
    cy.wait(4000);
    cy.getIframeBody('id="change_iframe"')
      .find(".ui-grid-canvas > div")
      .eq(2)
      .click();
  });

  it("Cancel request", () => {
    cy.getIframeBody('id="change_iframe"')
      .find("#requests")
      .find('[title="Action for selected request."]')
      .click();
    cy.getIframeBody('id="change_iframe"')
      .find("#dropdown-ACTION_TB > li")
      .as("dropdown");
    cy.get("@dropdown").eq(7).contains("Cancel Request").click();
    cy.wait(4000);
    cy.getIframeBody('id="change_iframe"').find("#modal-btnCancel").click();
  });
});
