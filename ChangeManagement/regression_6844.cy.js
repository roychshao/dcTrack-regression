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
      .type("7206VXR Router");
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
      .type("Blade UCS B200 M4");
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
      .type("Blade UCS B200 M4");
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
    cy.wait(10000);
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
      .contains("div", "7206VXR Router")
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

  // ERROR: Save failed because slotPosition is empty
  // however, I cannot enter anything even if I do it manually
  it("Toggle TEMP BLADE SERVER1 to installed stage directly", () => {
    cy.getIframeBody('id="assets_iframe"')
      .contains("div", "Blade UCS B200 M4")
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

  it("Install TEMP Blade SERVER2 with issuing request", () => {
    // disable RB
    // issue install request
  });

  it("Archive TEMP CHASSIS with issuing request", () => {
    // should be successful
  });

  it("Remove all TEMP items", () => {
    // from the process which failed:
    cy.getIframeBody('id="assets_iframe"').find("#modal-btnCancel").click();
    cy.getIframeBody('id="assets_iframe"').find("#btnRemoveTab").click();
    cy.getIframeBody('id="assets_iframe"').find("#modal-btnOk").click();
    cy.getIframeBody('id="assets_iframe"')
      .contains("div", "Blade UCS B200 M4")
      .eq(0)
      .click();
    cy.getIframeBody('id="assets_iframe"')
      .contains("div", "42RU-TeraFrame Cabinet 42D")
      .eq(0)
      .click();
    cy.getIframeBody('id="assets_iframe"')
      .contains("div", "7206VXR Router")
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
    // Refresh
    cy.getIframeBody('id="assets_iframe"')
      .find("#itemList")
      .find('[title="Refresh"]')
      .click();
    cy.wait(4000);
    cy.getIframeBody('id="assets_iframe"')
      .contains("div", "42RU-TeraFrame Cabinet 42D")
      .eq(0)
      .click();
    cy.getIframeBody('id="assets_iframe"')
      .contains("div", "7206VXR Router")
      .eq(0)
      .click({ ctrlKey: true });
    cy.getIframeBody('id="assets_iframe"')
      .contains("div", "Blade UCS B200 M4")
      .eq(0)
      .click({ ctrlKey: true });
    cy.getIframeBody('id="assets_iframe"')
      .contains("div", "Blade UCS B200 M4")
      .eq(1)
      .click({ ctrlKey: true });
    cy.getIframeBody('id="assets_iframe"')
      .find("#itemList")
      .find('[title="Delete selected items"]')
      .click();
    cy.getIframeBody('id="assets_iframe"').find("#modal-btnOk").click();
    cy.wait(4000);
  });
});
