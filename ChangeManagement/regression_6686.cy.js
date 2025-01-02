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
    cy.visit("192.168.56.104");
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

  it("Create a clone of 101 and install it", () => {
    cy.wait(8000);
    cy.getIframeBody('id="assets_iframe"')
      .contains("div", "48RU-Cabinet GlobalFrame-3A-400")
      .eq(0)
      .click();
    cy.getIframeBody('id="assets_iframe"')
      .find("#itemList")
      .find('[title="Clone"]')
      .click();
    cy.wait(2000);
    cy.getIframeBody('id="assets_iframe"').find("#modal-btnClone").click();
    cy.wait(4000);
    cy.getIframeBody('id="assets_iframe"')
      .contains("div", "48RU-Cabinet GlobalFrame-3A-400")
      .eq(0)
      .dblclick();
    cy.wait(6000);
    cy.getIframeBody('id="assets_iframe"')
      .find("#itemDetail")
      .find('[title="Edit"]')
      .click();
    cy.getIframeBody('id="assets_iframe"')
      .find('[uib-tooltip="Planned"]')
      .click();
    cy.getIframeBody('id="assets_iframe"').find('[data-value="5082"]').click();
    cy.wait(2000);
    cy.getIframeBody('id="assets_iframe"')
      .find("#tiName")
      .clear()
      .type("101-CLONE1{enter}");
    cy.getIframeBody('id="assets_iframe"')
      .find("#cmbRowLabel-selectized")
      .type("01{enter}");
    cy.getIframeBody('id="assets_iframe"')
      .find("#itemDetail")
      .find('[title="Save"]')
      .click();
    cy.wait(8000);
    cy.getIframeBody('id="assets_iframe"').find("#btnRemoveTab").click();
    cy.getIframeBody('id="assets_iframe"')
      .find("#itemListFilter")
      .find('[title="Clear"]')
      .click();
  });

  it("Create another clone of 101 and install it", () => {
    cy.wait(4000);
    cy.getIframeBody('id="assets_iframe"')
      .contains("div", "48RU-Cabinet GlobalFrame-3A-400")
      .eq(0)
      .click();
    cy.getIframeBody('id="assets_iframe"')
      .find("#itemList")
      .find('[title="Clone"]')
      .click();
    cy.wait(2000);
    cy.getIframeBody('id="assets_iframe"').find("#modal-btnClone").click();
    cy.wait(4000);
    cy.getIframeBody('id="assets_iframe"')
      .contains("div", "48RU-Cabinet GlobalFrame-3A-400")
      .eq(0)
      .dblclick();
    cy.wait(6000);
    cy.getIframeBody('id="assets_iframe"')
      .find("#itemDetail")
      .find('[title="Edit"]')
      .click();
    cy.getIframeBody('id="assets_iframe"')
      .find('[uib-tooltip="Planned"]')
      .click();
    cy.getIframeBody('id="assets_iframe"').find('[data-value="5082"]').click();
    cy.wait(2000);
    cy.getIframeBody('id="assets_iframe"')
      .find("#tiName")
      .clear()
      .type("101-CLONE2{enter}");
    cy.getIframeBody('id="assets_iframe"')
      .find("#cmbRowLabel-selectized")
      .type("01{enter}");
    cy.getIframeBody('id="assets_iframe"')
      .find("#itemDetail")
      .find('[title="Save"]')
      .click();
    cy.wait(8000);
    cy.getIframeBody('id="assets_iframe"').find("#btnRemoveTab").click();
  });

  it("Archive the two cloning", () => {
    cy.getIframeBody('id="assets_iframe"')
      .find("#itemListFilter")
      .find('[title="Clear"]')
      .click();
    cy.wait(2000);
    cy.getIframeBody('id="assets_iframe"')
      .contains("div", "101-CLONE1")
      .click();
    cy.getIframeBody('id="assets_iframe"')
      .contains("div", "101-CLONE2")
      .click({ ctrlKey: true });
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
    cy.wait(2000);
    cy.getIframeBody('id="assets_iframe"').find("#modal-btnOk").click();
  });

  it("Verify the messages indicates completed", () => {
    cy.wait(4000);
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

  it("Issue quick move request for 101", () => {
    cy.getIframeBody('id="assets_iframe"')
      .contains("div", "48RU-Cabinet GlobalFrame-3A-400")
      .eq(0)
      .click();
    cy.getIframeBody('id="assets_iframe"')
      .find("#itemList")
      .find('[title="Actions"]')
      .click();
    cy.wait(2000);
    cy.getIframeBody('id="assets_iframe"')
      .find("#dropdown-ACTION_TB > li")
      .as("dropdown");
    cy.get("@dropdown")
      .eq(11)
      .contains("span", "Quick Move Item Request...")
      .click();
  });

  it("Confirm the request", () => {
    cy.wait(4000);
    cy.getIframeBody('id="assets_iframe"')
      .find("#itemDetail")
      .find('[title="Save"]')
      .click();
    cy.getIframeBody('id="assets_iframe"').find("#modal-btnOk").click();
    cy.wait(8000);
  });

  it("Verify the error message in the dialog", () => {
    cy.getIframeBody('id="assets_iframe"')
      .find("#idItemRequestTextArea")
      .should(($t) => {
        const value = $t.val();
        const errMsg1 =
          "The field [ Row Label ] is mandatory for the Item Status Installed. Please fill in the Row Label before submitting request. If request was approved, delete work order and request before editing record.";
        const errMsg2 =
          "The field [ Position in Row ] is mandatory for the Item Status Installed. Please fill in the Position in Row before submitting request. If request was approved, delete work order and request before editing record.";
        expect(value).to.include(errMsg1);
        expect(value).to.include(errMsg2);
      });
    cy.getIframeBody('id="assets_iframe"').find("#modal-btnCancel").click();
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

  it("Verify the first (error) request", () => {
    cy.getIframeBody('id="change_iframe"')
      .find(".ui-grid-canvas > div")
      .eq(0)
      .dblclick();
    cy.wait(4000);
    cy.getIframeBody('id="change_iframe"')
      .find("#subtab-reqHistory")
      .parent()
      .click();
    cy.getIframeBody('id="change_iframe"')
      .find(".dct_details_subtab")
      .find(".tab-pane.active")
      .find(".ui-grid-canvas > div")
      .as("ng-repeat");
    cy.get("@ng-repeat")
      .eq(1)
      .find(".ui-grid-cell-contents")
      .should(
        "include.text",
        "The field [ Row Label ] is mandatory for the Item Status Installed. Please fill in the Row Label before submitting request. If request was approved, delete work order and request before editing record.",
      );
    cy.get("@ng-repeat")
      .eq(2)
      .find(".ui-grid-cell-contents")
      .should(
        "include.text",
        "The field [ Position in Row ] is mandatory for the Item Status Installed. Please fill in the Position in Row before submitting request. If request was approved, delete work order and request before editing record.",
      );
    cy.getIframeBody('id="change_iframe"').find("#btnRemoveTab").click();
  });

  it("Verify the other two archive request should success", () => {
    cy.getIframeBody('id="change_iframe"')
      .find(".ui-grid-canvas")
      .eq(3)
      .children()
      .eq(1)
      .contains("div", "Request Complete");
    cy.getIframeBody('id="change_iframe"')
      .find(".ui-grid-canvas")
      .eq(3)
      .children()
      .eq(2)
      .contains("div", "Request Complete");
  });

  it("Cancel the issued request", () => {
    cy.getIframeBody('id="change_iframe"')
      .find(".ui-grid-canvas > div")
      .eq(0)
      .click();
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
    cy.wait(2000);
  });

  it("Visit Assets Page", () => {
    cy.wait(2000);
    cy.get(".menu-toggle").click();
    cy.get(".header-dropdown > li").as("dropdown");
    cy.get("@dropdown")
      .eq(3)
      .find("sun-icon.fa.fa-chevron-right")
      .should("exist")
      .click();
    cy.get("@dropdown").eq(3).contains("Items").click();
  });

  it("Remove cloned items", () => {
    cy.getIframeBody('id="assets_iframe"')
      .contains("div", "101-CLONE1")
      .click();
    cy.getIframeBody('id="assets_iframe"')
      .contains("div", "101-CLONE2")
      .click({ ctrlKey: true });
    cy.getIframeBody('id="assets_iframe"')
      .find("#itemList")
      .find('[title="Delete selected items"]')
      .click();
    cy.getIframeBody('id="assets_iframe"').find("#modal-btnOk").click();
    cy.wait(4000);
  });
});
