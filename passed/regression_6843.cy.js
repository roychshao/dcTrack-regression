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
    cy.wait(8000);
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

  it("Create an installed temp cabinet", () => {
    cy.getIframeBody('id="assets_iframe"')
      .find("#itemList")
      .find('[title="Add an Item"]')
      .click();
    cy.wait(4000);
    cy.getIframeBody('id="assets_iframe"')
      .find("#cmbModel-selectized")
      .type("42RU-TeraFrame Cabinet 42D");
    cy.wait(2000);
    cy.getIframeBody('id="assets_iframe"')
      .find("#cmbModel-selectized")
      .type("{enter}");
    cy.wait(8000);
    cy.getIframeBody('id="assets_iframe"').find("#tiName").type("TEMP{enter}");
    cy.getIframeBody('id="assets_iframe"')
      .find("#cmbRowLabel-selectized")
      .type("1{enter}");
    cy.getIframeBody('id="assets_iframe"')
      .find("#cmbStatus-selectized")
      .parent()
      .click();
    cy.getIframeBody('id="assets_iframe"').find('[data-value="5082"]').click();
    cy.getIframeBody('id="assets_iframe"')
      .find("#itemDetail")
      .find('[title="Save"]')
      .click();
    cy.wait(8000);
    cy.getIframeBody('id="assets_iframe"').find("#btnRemoveTab").click();
    cy.getIframeBody('id="assets_iframe"')
      .find("#itemList")
      .find('[title="Refresh"]')
      .click();
    cy.wait(2000);
  });

  it("Filter devices", () => {
    cy.getIframeBody('id="assets_iframe"').find("#filter_tiClass").click();
    cy.getIframeBody('id="assets_iframe"').find("#option-6").click();
    cy.getIframeBody('id="assets_iframe"').find("#filter_tiClass").click();
  });

  it("Select 360 WITHOUT PORTS", () => {
    cy.getIframeBody('id="assets_iframe"')
      .contains("div", "360 WITHOUT PORTS")
      .click();
    cy.getIframeBody('id="assets_iframe"')
      .find("#itemList")
      .find('[title="Edit"]')
      .click();
  });

  it("Add Cabinet TEMP on this device", () => {
    cy.wait(6000);
    cy.getIframeBody('id="assets_iframe"')
      .find("#cmbCabinet-selectized")
      .type("TEMP{enter}");
    cy.wait(2000);
    cy.getIframeBody('id="assets_iframe"')
      .find("#cmbUPosition-selectized")
      .type("Above{enter}");
    cy.getIframeBody('id="assets_iframe"')
      .find("#itemDetail")
      .find('[title="Save"]')
      .click();
  });

  it("Turn off RB and issue install request", () => {
    cy.wait(4000);
    cy.getIframeBody('id="assets_iframe"')
      .find("#itemDetail")
      .find('[title="Actions"]')
      .click();
    cy.getIframeBody('id="assets_iframe"')
      .find("#itemDetail")
      .find("#dropdown-ACTION_TB > li")
      .eq(14)
      .contains("Turn On Request Bypass")
      .click();
    cy.getIframeBody('id="assets_iframe"')
      .find("#itemDetail")
      .find('[title="Actions"]')
      .click();
    cy.getIframeBody('id="assets_iframe"')
      .find("#itemDetail")
      .find("#dropdown-ACTION_TB > li")
      .eq(8)
      .contains("Install Item Request")
      .click();
    cy.getIframeBody('id="assets_iframe"').find("#modal-btnOk").click();
    cy.getIframeBody('id="assets_iframe"')
      .find("#idItemRequestTextAreaNoProgress")
      .should(($t) => {
        const value = $t.val();
        expect(value).to.include("Request Issued");
      });
    cy.getIframeBody('id="assets_iframe"').find("#modal-btnCancel").click();
  });

  it("Visit TEMP detail page", () => {
    cy.getIframeBody('id="assets_iframe"').find("#btnRemoveTab").click();
    cy.getIframeBody('id="assets_iframe"')
      .find("#itemListFilter")
      .find('[title="Clear"]')
      .click();
    cy.wait(2000);
    cy.getIframeBody('id="assets_iframe"')
      .find("#filter_tiName")
      .type("TEMP{enter}");
    cy.getIframeBody('id="assets_iframe"')
      .contains("div", "42RU-TeraFrame Cabinet 42D")
      .dblclick();
  });

  it("TEMP issue decommission to archive", () => {
    cy.wait(6000);
    cy.getIframeBody('id="assets_iframe"')
      .find("#itemDetail")
      .find('[title="Actions"]')
      .click();
    cy.getIframeBody('id="assets_iframe"')
      .find("#itemDetail")
      .find("#dropdown-ACTION_TB > li")
      .eq(14)
      .contains("Turn On Request Bypass")
      .click();
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
  });

  it("Verify error message", () => {
    cy.wait(8000);
    cy.getIframeBody('id="assets_iframe"')
      .find("#idItemRequestTextArea")
      .should(($t) => {
        const value = $t.val();
        expect(value).to.include(
          "Decommission to Archive: TEMP. Item TEMP cannot be Archived because at least one Device / Standard is not in the Archived status and is not included in this work order.",
        );
      });
    cy.getIframeBody('id="assets_iframe"').find("#modal-btnCancel").click();
    cy.getIframeBody('id="assets_iframe"').find("#btnRemoveTab").click();
    cy.getIframeBody('id="assets_iframe"')
      .find("#itemListFilter")
      .find('[title="Clear"]')
      .click();
  });

  it("Cancel the install device and decommission cabinet requests", () => {
    cy.wait(2000);
    cy.get(".menu-toggle").click();
    cy.get(".header-dropdown > li").as("dropdown");
    cy.get("@dropdown")
      .eq(5)
      .find("sun-icon.fa.fa-chevron-right")
      .should("exist")
      .click();
    cy.get("@dropdown").eq(5).contains("Requests").click();
    cy.wait(4000);
    cy.getIframeBody('id="change_iframe"')
      .find(".ui-grid-canvas > div")
      .eq(0)
      .click();
    cy.getIframeBody('id="change_iframe"')
      .find(".ui-grid-canvas > div")
      .eq(1)
      .click({ ctrlKey: true });
    cy.getIframeBody('id="change_iframe"')
      .find("#requests")
      .find('[title="Action for selected request."]')
      .click();
    cy.getIframeBody('id="change_iframe"')
      .find("#dropdown-ACTION_TB > li")
      .eq(7)
      .contains("Cancel Request")
      .click();
    cy.wait(4000);
    cy.getIframeBody('id="change_iframe"').find("#modal-btnCancel").click();
  });

  it("Visit 360 WITHOUT PORTS again", () => {
    cy.get(".menu-toggle").click();
    cy.get(".header-dropdown > li").as("dropdown");
    cy.get("@dropdown")
      .eq(3)
      .find("sun-icon.fa.fa-chevron-right")
      .should("exist")
      .click();
    cy.get("@dropdown").eq(3).contains("Items").click();
    cy.wait(4000);
    cy.getIframeBody('id="assets_iframe"').find("#filter_tiClass").click();
    cy.getIframeBody('id="assets_iframe"').find("#option-6").click();
    cy.getIframeBody('id="assets_iframe"').find("#filter_tiClass").click();
    cy.getIframeBody('id="assets_iframe"')
      .contains("div", "360 WITHOUT PORTS")
      .click();
    cy.getIframeBody('id="assets_iframe"')
      .find("#itemList")
      .find('[title="Edit"]')
      .click();
  });

  it("Toggle to Archive status directly", () => {
    cy.wait(8000);
    cy.getIframeBody('id="assets_iframe"')
      .find("#cmbStatus-selectized")
      .parent()
      .click();
    cy.getIframeBody('id="assets_iframe"').find('[data-value="5085"]').click();
    cy.getIframeBody('id="assets_iframe"')
      .find("#itemDetail")
      .find('[title="Save"]')
      .click();
    cy.wait(8000);
  });

  it("Visit TEMP detail page again", () => {
    cy.getIframeBody('id="assets_iframe"').find("#btnRemoveTab").click();
    cy.getIframeBody('id="assets_iframe"')
      .find("#itemListFilter")
      .find('[title="Clear"]')
      .click();
    cy.wait(2000);
    cy.getIframeBody('id="assets_iframe"')
      .find("#filter_tiName")
      .type("TEMP{enter}");
    cy.getIframeBody('id="assets_iframe"')
      .contains("div", "42RU-TeraFrame Cabinet 42D")
      .dblclick();
  });

  it("TEMP issue decommission to archive again", () => {
    cy.wait(6000);
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
  });

  it("Verify request success", () => {
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

  it("Remove TEMP cabinet", () => {
    cy.wait(4000);
    cy.getIframeBody('id="assets_iframe"')
      .find("#itemDetail")
      .find('[title="Delete selected items"]')
      .click();
    cy.getIframeBody('id="assets_iframe"').find("#modal-btnOk").click();
    cy.getIframeBody('id="assets_iframe"')
      .find("#itemListFilter")
      .find('[title="Clear"]')
      .click();
  });

  it("Rollback 360 WITHOUT PORTS", () => {
    cy.getIframeBody('id="assets_iframe"').find("#filter_tiClass").click();
    cy.getIframeBody('id="assets_iframe"').find("#option-6").click();
    cy.getIframeBody('id="assets_iframe"').find("#filter_tiClass").click();
    cy.getIframeBody('id="assets_iframe"')
      .contains("div", "360 WITHOUT PORTS")
      .click();
    cy.getIframeBody('id="assets_iframe"')
      .find("#itemList")
      .find('[title="Edit"]')
      .click();
    cy.getIframeBody('id="assets_iframe"')
      .find("#cmbStatus-selectized")
      .parent()
      .click();
    cy.getIframeBody('id="assets_iframe"').find('[data-value="5081"]').click();
    cy.getIframeBody('id="assets_iframe"')
      .find("#itemDetail")
      .find('[title="Save"]')
      .click();
    cy.wait(6000);
  });
});
