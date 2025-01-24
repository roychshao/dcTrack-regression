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

  it("Find an item which is in the storage status and take it off-site", () => {
    cy.wait(8000);
    // filtering
    cy.getIframeBody('id="assets_iframe"').find("#filter_cmbStatus").click();
    cy.getIframeBody('id="assets_iframe"').find("#option-6").click();
    cy.getIframeBody('id="assets_iframe"').find("#filter_cmbStatus").click();
    cy.wait(8000);
    cy.getIframeBody('id="assets_iframe"')
      .contains("div", "CRICK-SE3310")
      .eq(0)
      .click();
    cy.getIframeBody('id="assets_iframe"')
      .find("#itemList")
      .find('[title="Actions"]')
      .click();
    cy.getIframeBody('id="assets_iframe"')
      .find("#dropdown-ACTION_TB > li")
      .as("dropdown");
    cy.get("@dropdown").eq(1).contains("Take Item Off-site Request").click();
    cy.getIframeBody('id="assets_iframe"').find("#modal-btnOk").click();
    cy.wait(4000);
    cy.getIframeBody('id="assets_iframe"').find("#modal-btnCancel").click();
  });

  it("Verify if the Quick move menu item is disabled for an off-site item", () => {
    cy.getIframeBody('id="assets_iframe"')
      .find("#itemListFilter")
      .find('[title="Clear"]')
      .click();
    cy.wait(2000);
    cy.getIframeBody('id="assets_iframe"').find("#filter_cmbStatus").click();
    cy.getIframeBody('id="assets_iframe"').find("#option-2").click();
    cy.getIframeBody('id="assets_iframe"').find("#filter_cmbStatus").click();
    cy.getIframeBody('id="assets_iframe"')
      .contains("div", "CRICK-SE3310")
      .eq(0)
      .click();
    cy.getIframeBody('id="assets_iframe"')
      .find("#itemList")
      .find('[title="Actions"]')
      .click();
    cy.getIframeBody('id="assets_iframe"')
      .find("#dropdown-ACTION_TB > li")
      .as("dropdown");
    cy.get("@dropdown")
      .eq(11)
      .contains("span", "Quick Move Item Request")
      .parent()
      .should("have.attr", "disabled", "disabled");
  });

  it("Bring this item storage status", () => {
    cy.getIframeBody('id="assets_iframe"')
      .find("#itemList")
      .find('[title="Actions"]')
      .click();
    cy.getIframeBody('id="assets_iframe"')
      .contains("div", "CRICK-SE3310")
      .eq(0)
      .dblclick();
    cy.wait(6000);
    cy.getIframeBody('id="assets_iframe"')
      .find("#itemDetail")
      .find('[title="Edit"]')
      .click();
    cy.wait(2000);
    cy.getIframeBody('id="assets_iframe"')
      .find("#cmbCabinet-selectized")
      .type("N01{enter}");
    cy.getIframeBody('id="assets_iframe"')
      .find("#cmbUPosition-selectized")
      .type("1{enter}");
    cy.getIframeBody('id="assets_iframe"')
      .find("#itemDetail")
      .find('[title="Save"]')
      .click();
    cy.wait(6000);
    cy.getIframeBody('id="assets_iframe"')
      .find("#itemDetail")
      .find('[title="Actions"]')
      .click();
    cy.getIframeBody('id="assets_iframe"')
      .find("#itemDetail")
      .find("#dropdown-ACTION_TB > li")
      .as("dropdown");
    cy.get("@dropdown")
      .eq(5)
      .contains("span", "Decommission Item to Storage Request")
      .click();
    cy.getIframeBody('id="assets_iframe"').find("#modal-btnOk").click();
    cy.wait(6000);
    cy.getIframeBody('id="assets_iframe"').find("#modal-btnCancel").click();
  });
});
