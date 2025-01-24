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

  it("Find CB500-7C-CHASSIS1 and send Decommision to Archive request", () => {
    cy.wait(4000);
    // Turn on RB
    change_request_bypass(true);
    // filtering
    cy.getIframeBody('id="assets_iframe"')
      .find("#filter_tiName")
      .type("CB500-7C-CHASSIS1{enter}");
    cy.wait(4000);
    cy.getIframeBody('id="assets_iframe"')
      .find(".ui-grid-canvas")
      .eq(1)
      .find(".ui-grid-row")
      .eq(0)
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
      .as("dropdown");
    cy.get("@dropdown")
      .eq(6)
      .contains("Decommission Item to Archive Request")
      .click();
    cy.wait(4000);
    cy.getIframeBody('id="assets_iframe"').find("#modal-btnOk").click();
  });

  it("Verify the messages indicates completed", () => {
    const issuedMsg = "Request Issued: Successful.";
    const approvedMsg = "Request Approved: Successful.";
    const workOrderIssuedMsg = "Work Order Issued: Successful.";
    const workOrderCompleteMsg = "Work Order Complete: Successful.";
    const requestCompleteMsg = "Request Complete: Successful.";
    // verify error message contained
    cy.getIframeBody('id="assets_iframe"')
      .find("#idItemRequestTextArea")
      .should(($t) => {
        const value = $t.val();
        expect(value).to.include(issuedMsg);
        expect(value).to.include(approvedMsg);
        expect(value).to.include(workOrderIssuedMsg);
        expect(value).to.include(workOrderCompleteMsg);
        expect(value).to.include(requestCompleteMsg);
      });

    cy.getIframeBody('id="assets_iframe"').find("#modal-btnCancel").click();
  });

  it("Make this item back to be installed", () => {
    cy.wait(4000);
    cy.getIframeBody('id="assets_iframe"')
      .find("#itemList")
      .find('[title="Edit"]')
      .click();
    cy.wait(4000);
    cy.getIframeBody('id="assets_iframe"').find("#cmbStatus").parent().click();
    cy.getIframeBody('id="assets_iframe"').find('[data-value="5081"]').click();
    cy.getIframeBody('id="assets_iframe"')
      .find("#itemDetail")
      .find('[title="Save"]')
      .click();
    cy.wait(8000);
    cy.getIframeBody('id="assets_iframe"')
      .find("#itemDetail")
      .find('[title="Refresh"]')
      .click();
    cy.wait(4000);
    cy.getIframeBody('id="assets_iframe"')
      .find("#cmbCabinet-selectized")
      .type("7C{enter}");
    cy.getIframeBody('id="assets_iframe"')
      .find("#cmbUPosition-selectized")
      .type("1{enter}");
    cy.getIframeBody('id="assets_iframe"').find("#cmbStatus").parent().click();
    cy.getIframeBody('id="assets_iframe"').find('[data-value="5082"]').click();
    cy.getIframeBody('id="assets_iframe"')
      .find("#itemDetail")
      .find('[title="Save"]')
      .click();
    cy.wait(8000);
  });
});
