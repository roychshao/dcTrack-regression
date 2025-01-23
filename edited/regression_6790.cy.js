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

function change_request_bypass(bypass) {
  cy.getIframeBody('id="assets_iframe"')
    .find("#itemList")
    .find('[title="Actions"]')
    .click();
  cy.wait(4000);
  cy.getIframeBody('id="assets_iframe"')
    .find("#itemList")
    .find("#dropdown-ACTION_TB > li")
    .eq(14)
    .contains("Turn On Request Bypass")
    .children()
    .then(($ele) => {
      let on = true;
      console.log("length is: " + $ele.length);
      if ($ele.length == 2) {
        on = true;
      } else {
        on = false;
      }
      console.log("value of on: " + on);
      if (bypass !== on) {
        cy.getIframeBody('id="assets_iframe"')
          .find("#itemList")
          .find("#dropdown-ACTION_TB > li")
          .eq(14)
          .contains("Turn On Request Bypass")
          .click();
      } else {
        cy.getIframeBody('id="assets_iframe"')
          .find("#itemList")
          .find('[title="Actions"]')
          .click();
      }
    });
}

describe("dcTrack front-end testing ", () => {
  beforeEach(() => {
    cy.viewport(1100, 1100);
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

  it("Find AJ-N7K and power off this item", () => {
    cy.wait(8000);
    // Turn on RB
    change_request_bypass(true);
    // filtering
    cy.wait(6000);
    cy.getIframeBody('id="assets_iframe"')
      .find("#filter_tiName")
      .type("AJ-N7K{enter}");
    cy.wait(4000);
    cy.getIframeBody('id="assets_iframe"')
      .find('[aria-label="Row 1, Row Selection Checkbox"]')
      .click();
    cy.getIframeBody('id="assets_iframe"')
      .find("#itemList")
      .find('[title="Actions"]')
      .click();
    cy.wait(2000);
    cy.getIframeBody('id="assets_iframe"')
      .find("#dropdown-ACTION_TB > li")
      .as("dropdown");
    cy.wait(2000);
    cy.get("@dropdown").eq(3).contains("Power-off Item Request").click();
    cy.getIframeBody('id="assets_iframe"').find("#modal-btnOk").click();
    cy.getIframeBody('id="assets_iframe"').find("#modal-btnCancel").click();
  });

  it("Verify it is off and power on it to return to the origin status", () => {
    cy.wait(4000);
    cy.getIframeBody('id="assets_iframe"')
      .find("#itemList")
      .find('[title="Refresh"]')
      .click();
    cy.wait(4000);
    cy.getIframeBody('id="assets_iframe"')
      .find('[aria-label="Row 1, Row Selection Checkbox"]')
      .click();
    cy.wait(2000);
    cy.getIframeBody('id="assets_iframe"')
      .find("#itemList")
      .find('[title="Actions"]')
      .click();
    cy.wait(2000);
    cy.getIframeBody('id="assets_iframe"')
      .find("#itemList")
      .find("#dropdown-ACTION_TB > li")
      .eq(3)
      .contains("Power-off Item Request")
      .parent()
      .should("have.attr", "class", "disabled");
    cy.getIframeBody('id="assets_iframe"')
      .find("#dropdown-ACTION_TB > li")
      .as("dropdown");
    cy.get("@dropdown").eq(4).contains("Power-on Item Request").click();
    cy.getIframeBody('id="assets_iframe"').find("#modal-btnOk").click();
    cy.getIframeBody('id="assets_iframe"').find("#modal-btnCancel").click();
  });
});
