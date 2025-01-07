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

  it("Prepare Move item request for AMSTAD_T3 and check the origin cabinets length", () => {
    cy.wait(10000);
    cy.getIframeBody('id="assets_iframe"')
      .find("#filter_tiName")
      .type("AMSTAD_T3{enter}");
    cy.wait(4000);
    cy.getIframeBody('id="assets_iframe"')
      .find("#myGrid")
      .contains("div", "AMSTAD_T3")
      .eq(0)
      .click();
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
    cy.get("@dropdown").eq(12).contains("Prepare Move Item Request...").click();
    cy.wait(8000);
    cy.getIframeBody('id="assets_iframe"')
      .find("#dct-capacity-modal-content")
      .find(".dct-search-results")
      .find('[role="presentation"]')
      .eq(1)
      .find(".ui-grid-canvas")
      .find(".ui-grid-row")
      .as("rows");
    cy.get("@rows").should("have.length", 14);
  });

  it("Change a connection and verify if the cabinets length changes", () => {
    cy.getIframeBody('id="assets_iframe"')
      .find("#idPowerPortGridBlock")
      .find(".ui-grid-canvas")
      .find(".ui-grid-row")
      .eq(0)
      .contains("div", "To Rack PDU")
      .parent()
      .click()
      .then(($div) => {
        cy.wrap($div).find("select").select("To Power Outlet");
      });
    cy.getIframeBody('id="assets_iframe"').find("#modal-btnSearch").click();
    cy.wait(6000);
    cy.getIframeBody('id="assets_iframe"')
      .find("#dct-capacity-modal-content")
      .find(".dct-search-results")
      .find('[role="presentation"]')
      .eq(1)
      .find(".ui-grid-canvas")
      .find(".ui-grid-row")
      .as("rows");
    cy.get("@rows").should("have.length", 10);
    cy.getIframeBody('id="assets_iframe"').find("#modal-btnClose").click();
  });
});
