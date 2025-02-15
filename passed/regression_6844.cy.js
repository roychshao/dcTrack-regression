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
    Cypress.config("defaultCommandTimeout", 40000);
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

  it("Create an planned temp cabinet", () => {
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
    cy.wait(1000);
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

  it("Create a chassis and put it in TEMP", () => {
    cy.getIframeBody('id="assets_iframe"')
      .find("#itemList")
      .find('[title="Add an Item"]')
      .click();
    cy.wait(4000);
    cy.getIframeBody('id="assets_iframe"')
      .find("#cmbModel-selectized")
      .type("CB500 Chassis");
    cy.wait(2000);
    cy.getIframeBody('id="assets_iframe"')
      .find("#cmbModel-selectized")
      .type("{enter}");
    cy.wait(8000);
    cy.getIframeBody('id="assets_iframe"')
      .find("#tiName")
      .type("TEMP CHASSIS{enter}");
    cy.wait(1000);
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
    cy.wait(10000);
    cy.getIframeBody('id="assets_iframe"').find("#btnRemoveTab").click();
    cy.getIframeBody('id="assets_iframe"')
      .find("#itemList")
      .find('[title="Refresh"]')
      .click();
    cy.wait(2000);
  });

  it("Create first blade server and put it in TEMP", () => {
    cy.getIframeBody('id="assets_iframe"')
      .find("#itemList")
      .find('[title="Add an Item"]')
      .click();
    cy.wait(4000);
    cy.getIframeBody('id="assets_iframe"')
      .find("#cmbModel-selectized")
      .type("VSP G1000 Front-end director blade, Fibre Channel");
    cy.wait(2000);
    cy.getIframeBody('id="assets_iframe"')
      .find("#cmbModel-selectized")
      .type("{enter}");
    cy.wait(8000);
    cy.getIframeBody('id="assets_iframe"')
      .find("#tiName")
      .type("TEMP BLADE SERVER1{enter}");
    cy.wait(1000);
    cy.getIframeBody('id="assets_iframe"')
      .find("#cmbCabinet-selectized")
      .type("TEMP{enter}");
    cy.wait(2000);
    cy.getIframeBody('id="assets_iframe"')
      .find("#itemDetail")
      .find('[title="Save"]')
      .click();
    cy.wait(10000);
    cy.getIframeBody('id="assets_iframe"').find("#btnRemoveTab").click();
    cy.getIframeBody('id="assets_iframe"')
      .find("#itemList")
      .find('[title="Refresh"]')
      .click();
    cy.wait(2000);
  });

  it("Create second blade server and put it in TEMP", () => {
    cy.getIframeBody('id="assets_iframe"')
      .find("#itemList")
      .find('[title="Add an Item"]')
      .click();
    cy.wait(4000);
    cy.getIframeBody('id="assets_iframe"')
      .find("#cmbModel-selectized")
      .type("VSP G1000 Front-end director blade, Fibre Channel");
    cy.wait(2000);
    cy.getIframeBody('id="assets_iframe"')
      .find("#cmbModel-selectized")
      .type("{enter}");
    cy.wait(8000);
    cy.getIframeBody('id="assets_iframe"')
      .find("#tiName")
      .type("TEMP BLADE SERVER2{enter}");
    cy.wait(1000);
    cy.getIframeBody('id="assets_iframe"')
      .find("#cmbCabinet-selectized")
      .type("TEMP{enter}");
    cy.wait(2000);
    cy.getIframeBody('id="assets_iframe"')
      .find("#itemDetail")
      .find('[title="Save"]')
      .click();
    cy.wait(16000);
    cy.getIframeBody('id="assets_iframe"').find("#btnRemoveTab").click();
    cy.getIframeBody('id="assets_iframe"')
      .find("#itemList")
      .find('[title="Refresh"]')
      .click();
    cy.wait(2000);
  });

  it("Toggle TEMP to installed stage directly", () => {
    cy.getIframeBody('id="assets_iframe"')
      .find("#filter_tiName")
      .type("TEMP{enter}");
    cy.wait(2000);
    cy.getIframeBody('id="assets_iframe"')
      .contains("div", "42RU-TeraFrame Cabinet 42D")
      .eq(0)
      .dblclick();
    cy.wait(6000);
    cy.getIframeBody('id="assets_iframe"')
      .find("#itemDetail")
      .find('[title="Edit"]')
      .click();
    cy.wait(1000);
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
    cy.wait(10000);
    cy.getIframeBody('id="assets_iframe"').find("#btnRemoveTab").click();
  });

  it("Toggle TEMP CHASSIS to installed stage directly", () => {
    cy.getIframeBody('id="assets_iframe"')
      .contains("div", "CB500 Chassis")
      .eq(0)
      .dblclick();
    cy.wait(6000);
    cy.getIframeBody('id="assets_iframe"')
      .find("#itemDetail")
      .find('[title="Edit"]')
      .click();
    cy.wait(1000);
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
    cy.getIframeBody('id="assets_iframe"').find("#btnRemoveTab").click();
  });

  it("Toggle TEMP BLADE SERVER1 to installed stage directly", () => {
    cy.getIframeBody('id="assets_iframe"')
      .contains("div", "VSP G1000 Front-end director blade, Fibre Channel")
      .eq(0)
      .dblclick();
    cy.wait(6000);
    cy.getIframeBody('id="assets_iframe"')
      .find("#itemDetail")
      .find('[title="Edit"]')
      .click();
    cy.wait(1000);
    cy.getIframeBody('id="assets_iframe"')
      .find("#placement_panel")
      .find('input[type="select-one"]')
      .eq(1)
      .click();
    cy.getIframeBody('id="assets_iframe"')
      .find(".selectize-dropdown-cmbChassis")
      .find(".option.active")
      .click();
    cy.wait(1000);
    cy.getIframeBody('id="assets_iframe"')
      .find("#cmbSlotPosition-selectized")
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
    cy.wait(10000);
    cy.getIframeBody('id="assets_iframe"').find("#btnRemoveTab").click();
  });

  it("Install TEMP Blade SERVER2 with issuing request", () => {
    cy.getIframeBody('id="assets_iframe"')
      .contains("div", "TEMP BLADE SERVER2")
      .dblclick();
    cy.wait(6000);
    cy.getIframeBody('id="assets_iframe"')
      .find("#itemDetail")
      .find('[title="Edit"]')
      .click();
    cy.wait(1000);
    cy.getIframeBody('id="assets_iframe"')
      .find("#placement_panel")
      .find('input[type="select-one"]')
      .eq(1)
      .click();
    cy.getIframeBody('id="assets_iframe"')
      .find(".selectize-dropdown-cmbChassis")
      .find(".option.active")
      .click();
    cy.wait(1000);
    cy.getIframeBody('id="assets_iframe"')
      .find("#cmbSlotPosition-selectized")
      .type("2{enter}");
    cy.getIframeBody('id="assets_iframe"')
      .find("#itemDetail")
      .find('[title="Save"]')
      .click();
    cy.wait(10000);
    // turn off RB
    cy.getIframeBody('id="assets_iframe"')
      .find("#itemDetail")
      .find('[title="Actions"]')
      .should("be.enabled")
      .click();
    cy.getIframeBody('id="assets_iframe"')
      .find("#dropdown-ACTION_TB > li")
      .as("dropdown");
    cy.get("@dropdown")
      .eq(14)
      .contains("Turn On Request Bypass")
      .click({ force: true });
    // install item
    cy.getIframeBody('id="assets_iframe"')
      .find("#itemDetail")
      .find('[title="Actions"]')
      .click();
    cy.getIframeBody('id="assets_iframe"')
      .find("#dropdown-ACTION_TB > li")
      .as("dropdown");
    cy.get("@dropdown")
      .eq(8)
      .contains("Install Item Request")
      .click({ force: true });
    cy.getIframeBody('id="assets_iframe"').find("#modal-btnOk").click();
    // verify it is issued
    cy.getIframeBody('id="assets_iframe"')
      .find("#idItemRequestTextAreaNoProgress")
      .should(($t) => {
        const value = $t.val();
        expect(value).to.include("Request Issued");
      });
    cy.getIframeBody('id="assets_iframe"').find("#modal-btnCancel").click();
    cy.getIframeBody('id="assets_iframe"').find("#btnRemoveTab").click();
  });

  it("Archive TEMP CHASSIS with issuing request", () => {
    // should be successful
    cy.getIframeBody('id="assets_iframe"')
      .contains("div", "CB500 Chassis")
      .eq(0)
      .dblclick();
    cy.wait(6000);
    // turn on RB
    cy.getIframeBody('id="assets_iframe"')
      .find("#itemDetail")
      .find('[title="Actions"]')
      .click();
    cy.getIframeBody('id="assets_iframe"')
      .find("#dropdown-ACTION_TB > li")
      .as("dropdown");
    cy.get("@dropdown")
      .eq(14)
      .contains("Turn On Request Bypass")
      .click({ force: true });
    cy.wait(2000);
    // archive chassis
    cy.getIframeBody('id="assets_iframe"')
      .find("#itemDetail")
      .find('[title="Actions"]')
      .click();
    cy.getIframeBody('id="assets_iframe"')
      .find("#dropdown-ACTION_TB > li")
      .as("dropdown");
    cy.get("@dropdown")
      .eq(6)
      .contains("Decommission Item to Archive Request")
      .click({ force: true });
    cy.getIframeBody('id="assets_iframe"').find("#modal-btnOk").click();
    // verify it is issued
    cy.getIframeBody('id="assets_iframe"')
      .find("#idItemRequestTextArea")
      .should(($t) => {
        const value = $t.val();
        expect(value).to.include(
          "Request could not be issued, Item has outstanding request.",
        );
      });
    cy.getIframeBody('id="assets_iframe"').find("#modal-btnCancel").click();
    cy.getIframeBody('id="assets_iframe"').find("#btnRemoveTab").click();
  });

  it("Remove the blades first", () => {
    cy.getIframeBody('id="assets_iframe"')
      .find("#itemList")
      .find('[title="Refresh"]')
      .click();
    cy.wait(2000);
    cy.getIframeBody('id="assets_iframe"')
      .contains("div", "TEMP BLADE SERVER1")
      .click({ ctrlKey: true });
    cy.getIframeBody('id="assets_iframe"')
      .contains("div", "TEMP BLADE SERVER2")
      .click({ ctrlKey: true });
    cy.getIframeBody('id="assets_iframe"')
      .find("#itemList")
      .find('[title="Delete selected items"]')
      .click({ force: true });
    cy.getIframeBody('id="assets_iframe"').find("#modal-btnOk").click();
    cy.wait(4000);
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

  it("Cancel the first (latest) request", () => {
    cy.wait(4000);
    cy.getIframeBody('id="change_iframe"')
      .find("#requests")
      .find('[title="Refresh"]')
      .click();
    cy.wait(4000);
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
      .contains("span", "Cancel Request")
      .click();
    cy.getIframeBody('id="change_iframe"').find("#modal-btnCancel").click();
  });

  it("Visit assets page", () => {
    cy.get(".menu-toggle").click();
    cy.get(".header-dropdown > li").as("dropdown");
    cy.get("@dropdown")
      .eq(3)
      .find("sun-icon.fa.fa-chevron-right")
      .should("exist")
      .click();
    cy.get("@dropdown").eq(3).contains("Items").click();
  });

  it("Remove cabinet and chassis", () => {
    cy.getIframeBody('id="assets_iframe"')
      .contains("div", "42RU-TeraFrame Cabinet 42D")
      .eq(0)
      .click();
    cy.getIframeBody('id="assets_iframe"')
      .contains("div", "CB500 Chassis")
      .eq(0)
      .click({ ctrlKey: true });
    cy.getIframeBody('id="assets_iframe"')
      .find("#itemList")
      .find('[title="Actions"]')
      .click();
    cy.getIframeBody('id="assets_iframe"')
      .find("#dropdown-ACTION_TB > li")
      .eq(6)
      .contains("Decommission Item to Archive Request")
      .click();
    cy.getIframeBody('id="assets_iframe"').find("#modal-btnOk").click();
    cy.wait(8000);
    cy.getIframeBody('id="assets_iframe"').find("#modal-btnCancel").click();
    cy.getIframeBody('id="assets_iframe"')
      .find("#itemList")
      .find('[title="Delete selected items"]')
      .click();
    cy.getIframeBody('id="assets_iframe"').find("#modal-btnOk").click();
    cy.wait(4000);
  });
});
