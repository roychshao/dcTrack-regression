// NOTE: process unstable

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
    cy.wait(4000);
  });

  it("Filtering", () => {
    cy.getIframeBody('id="assets_iframe"')
      .find("#filter_tiSubclass")
      .find("button")
      .click();
    cy.getIframeBody('id="assets_iframe"').find("#option-25").click();
    cy.getIframeBody('id="assets_iframe"')
      .find("#filter_tiSubclass")
      .find("button")
      .click();
  });

  it("Clone AJ-N7K", () => {
    cy.getIframeBody('id="assets_iframe"').contains("div", "AJ-N7K").click();
    cy.getIframeBody('id="assets_iframe"')
      .find("#itemList")
      .find('[title="Clone"]')
      .click();
    cy.getIframeBody('id="assets_iframe"').find("#modal-btnClone").click();
  });

  it("Rename it to be AJ-N7K-CLONE1 and install it", () => {
    // Clone a chassis
    cy.wait(2000);
    cy.getIframeBody('id="assets_iframe"').contains("div", "AJ-N7K").dblclick();
    cy.wait(4000);
    cy.getIframeBody('id="assets_iframe"')
      .find("#itemDetail")
      .find('[title="Edit"]')
      .click();
    cy.wait(2000);
    cy.getIframeBody('id="assets_iframe"')
      .find("#cmbStatus-selectized")
      .parent()
      .click();
    cy.getIframeBody('id="assets_iframe"').find('[data-value="5082"]').click();
    cy.getIframeBody('id="assets_iframe"')
      .find("#tiName")
      .clear()
      .type("AJ-N7K-CLONE1{enter}");
    cy.getIframeBody('id="assets_iframe"')
      .find("#cmbCabinet-selectized")
      .type("7C{enter}");
    cy.getIframeBody('id="assets_iframe"')
      .find("#cmbUPosition-selectized")
      .type("Above{enter}");
    cy.wait(2000);
    cy.getIframeBody('id="assets_iframe"')
      .find("#itemDetail")
      .find('[title="Save"]')
      .click();
    cy.wait(12000);
    // add a installed blade
    cy.getIframeBody('id="assets_iframe"')
      .find("#subtab-blades")
      .parent()
      .click();
    cy.getIframeBody('id="assets_iframe"')
      .find("#bladesTab")
      .find('[title="Add a Blade"]')
      .click();
    cy.wait(8000);
    cy.getIframeBody('id="assets_iframe"')
      .find(".tab-pane.active")
      .find("#tiClass")
      .should("have.value", "Network / Blade");
    cy.getIframeBody('id="assets_iframe"')
      .find(".tab-pane.active")
      .find("#tiName")
      .type("INSTALLED BLADE{enter}");
    cy.getIframeBody('id="assets_iframe"')
      .find(".tab-pane.active")
      .find("#cmbSlotPosition-selectized")
      .type("2{enter}");
    cy.getIframeBody('id="assets_iframe"')
      .find(".tab-pane.active")
      .find("#cmbStatus-selectized")
      .parent()
      .click();
    cy.getIframeBody('id="assets_iframe"')
      .find('[data-value="5082"]')
      .eq(2)
      .click();
    cy.getIframeBody('id="assets_iframe"').find('[title="Save"]').eq(1).click();
    cy.wait(12000);
    cy.getIframeBody('id="assets_iframe"')
      .contains("label", "INSTALLED BLADE")
      .parent()
      .find("button")
      .click();
    cy.getIframeBody('id="assets_iframe"').find("#btnRemoveTab").click();
    cy.getIframeBody('id="assets_iframe"')
      .find("#itemListFilter")
      .find('[title="Clear"]')
      .click();
  });

  // Clone another one
  it("Filtering", () => {
    cy.getIframeBody('id="assets_iframe"')
      .find("#filter_tiSubclass")
      .find("button")
      .click();
    cy.getIframeBody('id="assets_iframe"').find("#option-25").click();
    cy.getIframeBody('id="assets_iframe"')
      .find("#filter_tiSubclass")
      .find("button")
      .click();
  });

  it("Clone AJ-N7K", () => {
    cy.getIframeBody('id="assets_iframe"').contains("div", "AJ-N7K").click();
    cy.getIframeBody('id="assets_iframe"')
      .find("#itemList")
      .find('[title="Clone"]')
      .click();
    cy.getIframeBody('id="assets_iframe"').find("#modal-btnClone").click();
  });

  it("Rename it to be AJ-N7K-CLONE2 and install it", () => {
    // Clone a chassis
    cy.wait(2000);
    cy.getIframeBody('id="assets_iframe"')
      .contains("div", "AJ-N7K")
      .eq(0)
      .dblclick();
    cy.wait(4000);
    cy.getIframeBody('id="assets_iframe"')
      .find("#itemDetail")
      .find('[title="Edit"]')
      .click();
    cy.wait(2000);
    cy.getIframeBody('id="assets_iframe"')
      .find("#cmbStatus-selectized")
      .parent()
      .click();
    cy.getIframeBody('id="assets_iframe"').find('[data-value="5082"]').click();
    cy.getIframeBody('id="assets_iframe"')
      .find("#tiName")
      .clear()
      .type("AJ-N7K-CLONE2{enter}");
    cy.getIframeBody('id="assets_iframe"')
      .find("#cmbCabinet-selectized")
      .type("7C{enter}");
    cy.getIframeBody('id="assets_iframe"')
      .find("#cmbUPosition-selectized")
      .type("Above{enter}");
    cy.wait(2000);
    cy.getIframeBody('id="assets_iframe"')
      .find("#itemDetail")
      .find('[title="Save"]')
      .click();
    cy.wait(12000);
    // add a installed blade
    cy.getIframeBody('id="assets_iframe"')
      .find("#subtab-blades")
      .parent()
      .click();
    cy.getIframeBody('id="assets_iframe"')
      .find("#bladesTab")
      .find('[title="Add a Blade"]')
      .click();
    cy.wait(8000);
    cy.getIframeBody('id="assets_iframe"')
      .find(".tab-pane.active")
      .find("#tiClass")
      .should("have.value", "Network / Blade");
    cy.getIframeBody('id="assets_iframe"')
      .find(".tab-pane.active")
      .find("#tiName")
      .type("OFF-SITE BLADE{enter}");
    cy.getIframeBody('id="assets_iframe"')
      .find(".tab-pane.active")
      .find("#cmbSlotPosition-selectized")
      .type("2{enter}");
    cy.getIframeBody('id="assets_iframe"')
      .find(".tab-pane.active")
      .find("#cmbStatus-selectized")
      .parent()
      .click();
    cy.getIframeBody('id="assets_iframe"')
      .find('[data-value="5082"]')
      .eq(2)
      .click();
    cy.getIframeBody('id="assets_iframe"').find('[title="Save"]').eq(1).click();
    cy.wait(12000);
    // take this blade to off-site
    cy.getIframeBody('id="assets_iframe"')
      .find('[title="Actions"]')
      .eq(2)
      .click();
    cy.getIframeBody('id="assets_iframe"')
      .find('[title="Actions"]')
      .eq(2)
      .parent()
      .find("#dropdown-ACTION_TB > li")
      .eq(1)
      .contains("Take Item Off-site Request")
      .click();
    cy.getIframeBody('id="assets_iframe"').find("#modal-btnOk").click();
    cy.wait(12000);
    cy.getIframeBody('id="assets_iframe"').find("#modal-btnCancel").click();
    // quit
    cy.getIframeBody('id="assets_iframe"')
      .contains("label", "OFF-SITE BLADE")
      .parent()
      .find("button")
      .click();
    cy.getIframeBody('id="assets_iframe"').find("#btnRemoveTab").click();
  });

  it("Take the two chassis to off-site", () => {
    cy.getIframeBody('id="assets_iframe"')
      .contains("div", "AJ-N7K-CLONE1")
      .click();
    cy.getIframeBody('id="assets_iframe"')
      .contains("div", "AJ-N7K-CLONE2")
      .click({ ctrlKey: true });
    cy.wait(2000);
    cy.getIframeBody('id="assets_iframe"')
      .find("#itemList")
      .find('[title="Actions"]')
      .click();
    cy.getIframeBody('id="assets_iframe"')
      .find("#itemList")
      .find("#dropdown-ACTION_TB > li")
      .eq(1)
      .contains("Take Item Off-site Request")
      .should("be.enabled") // ERROR: here will failed since it is disabled
      .click();
  });

  it("Delete clone1 and clone2", () => {
    // commented since the dropdown still there
    // cy.getIframeBody('id="assets_iframe"')
    //   .find("#itemList")
    //   .find('[title="Actions"]')
    //   .click();
    cy.getIframeBody('id="assets_iframe"')
      .find("#itemList")
      .find("#dropdown-ACTION_TB > li")
      .eq(6)
      .contains("Decommission Item to Archive Request")
      .click();
    cy.getIframeBody('id="assets_iframe"').find("#modal-btnOk").click();
    cy.wait(16000);
    cy.getIframeBody('id="assets_iframe"').find("#modal-btnCancel").click();
    cy.getIframeBody('id="assets_iframe"')
      .find("#itemList")
      .find('[title="Refresh"]')
      .click();
    cy.wait(2000);
    cy.getIframeBody('id="assets_iframe"')
      .contains("div", "AJ-N7K-CLONE1")
      .click();
    cy.getIframeBody('id="assets_iframe"')
      .contains("div", "AJ-N7K-CLONE2")
      .click({ ctrlKey: true });
    cy.getIframeBody('id="assets_iframe"')
      .find("#itemList")
      .find('[title="Delete selected items"]')
      .click();
    cy.getIframeBody('id="assets_iframe"').find("#modal-btnOk").click();
  });

  it("Delete archived blades", () => {
    cy.getIframeBody('id="assets_iframe"')
      .find("#itemListFilter")
      .find('[title="Clear"]')
      .click();
    cy.wait(2000);
    cy.getIframeBody('id="assets_iframe"')
      .find("#filter_tiName")
      .type("BLADE{enter}");
    cy.wait(2000);
    cy.getIframeBody('id="assets_iframe"')
      .contains("div", "INSTALLED BLADE")
      .click();
    cy.getIframeBody('id="assets_iframe"')
      .contains("div", "OFF-SITE BLADE")
      .click({ ctrlKey: true });
    cy.getIframeBody('id="assets_iframe"')
      .find("#itemList")
      .find('[title="Delete selected items"]')
      .click();
    cy.getIframeBody('id="assets_iframe"').find("#modal-btnOk").click();
  });
});
