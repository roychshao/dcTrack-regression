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

  it("Visit Models Library Page", () => {
    cy.wait(4000);
    cy.get(".menu-toggle").click();
    cy.get(".header-dropdown > li").as("dropdown");
    cy.get("@dropdown")
      .eq(8)
      .find("sun-icon.fa.fa-chevron-right")
      .should("exist")
      .click();
    cy.get("@dropdown").eq(8).contains("Models Library").click();
  });

  // Device/Standard
  it("Filtering", () => {
    cy.wait(4000);
    cy.getIframeBody('id="models_iframe"')
      .find("#filter_class")
      .find("button")
      .click();
    cy.getIframeBody('id="models_iframe"').find("#option-6").click();
    cy.getIframeBody('id="models_iframe"')
      .find("#filter_class")
      .find("button")
      .click();
  });

  var x = 0;

  it("Select 100-887-110-01", () => {
    cy.wait(2000);
    cy.getIframeBody('id="models_iframe"')
      .contains("div", "100-887-110-01")
      .dblclick();
    cy.wait(4000);
    cy.getIframeBody('id="models_iframe"')
      .find("#subtab-PowerSupplyPorts")
      .click();
    cy.getIframeBody('id="models_iframe"')
      .find("#powerPortsGrid")
      .find(".ui-grid-cell-contents.ui-grid-disable-selection.clickable")
      .then(($elements) => {
        x = $elements.length;
        cy.getIframeBody('id="models_iframe"')
          .find("#subtab-PowerSupplyPorts")
          .contains("label", "Power Supply - " + x + " Ports");
        cy.getIframeBody('id="models_iframe"').find("#btnRemoveTab").click();
      });
  });

  // Device/Blade Chassis
  it("Select 121NF-X11", () => {
    cy.wait(2000);
    cy.getIframeBody('id="models_iframe"')
      .contains("div", "121NF-X11")
      .dblclick();
    cy.wait(4000);
    cy.getIframeBody('id="models_iframe"')
      .find("#subtab-PowerSupplyPorts")
      .click();
    cy.getIframeBody('id="models_iframe"')
      .find("#powerPortsGrid")
      .find(".ui-grid-cell-contents.ui-grid-disable-selection.clickable")
      .then(($elements) => {
        x = $elements.length;
        cy.getIframeBody('id="models_iframe"')
          .find("#subtab-PowerSupplyPorts")
          .contains("label", "Power Supply - " + x + " Ports");
        cy.getIframeBody('id="models_iframe"').find("#btnRemoveTab").click();
      });
  });

  // Probe
  it("Filtering", () => {
    cy.wait(4000);
    cy.getIframeBody('id="models_iframe"')
      .find("#filter_class")
      .find("button")
      .click();
    cy.getIframeBody('id="models_iframe"').find("#option-6").click();
    cy.getIframeBody('id="models_iframe"').find("#option-13").click();
    cy.getIframeBody('id="models_iframe"')
      .find("#filter_class")
      .find("button")
      .click();
  });

  it("Select AP9319", () => {
    cy.wait(2000);
    cy.getIframeBody('id="models_iframe"').contains("div", "AP9319").dblclick();
    cy.wait(4000);
    cy.getIframeBody('id="models_iframe"')
      .find("#subtab-PowerSupplyPorts")
      .click();
    cy.getIframeBody('id="models_iframe"')
      .find("#powerPortsGrid")
      .find(".ui-grid-cell-contents.ui-grid-disable-selection.clickable")
      .then(($elements) => {
        x = $elements.length;
        cy.getIframeBody('id="models_iframe"')
          .find("#subtab-PowerSupplyPorts")
          .contains("label", "Power Supply - " + x + " Ports");
        cy.getIframeBody('id="models_iframe"').find("#btnRemoveTab").click();
      });
  });

  // Network/Chassis
  it("Filtering", () => {
    cy.wait(4000);
    cy.getIframeBody('id="models_iframe"')
      .find("#filter_class")
      .find("button")
      .click();
    cy.getIframeBody('id="models_iframe"').find("#option-13").click();
    cy.getIframeBody('id="models_iframe"').find("#option-9").click();
    cy.getIframeBody('id="models_iframe"')
      .find("#filter_class")
      .find("button")
      .click();
  });

  it("Select 10008 Router", () => {
    cy.wait(2000);
    cy.getIframeBody('id="models_iframe"')
      .contains("div", "10008 Router")
      .dblclick();
    cy.wait(4000);
    cy.getIframeBody('id="models_iframe"')
      .find("#subtab-PowerSupplyPorts")
      .click();
    cy.getIframeBody('id="models_iframe"')
      .find("#powerPortsGrid")
      .find(".ui-grid-cell-contents.ui-grid-disable-selection.clickable")
      .should("not.exist")
      .then(() => {
        x = 0;
        cy.getIframeBody('id="models_iframe"')
          .find("#subtab-PowerSupplyPorts")
          .contains("label", "Power Supply - " + x + " Ports");
        cy.getIframeBody('id="models_iframe"').find("#btnRemoveTab").click();
      });
  });

  // Network/Network Stack
  it("Select 10350v/10350v-N/10350v-F", () => {
    cy.wait(2000);
    cy.getIframeBody('id="models_iframe"')
      .contains("div", "10350v/10350v-N/10350v-F")
      .dblclick();
    cy.wait(4000);
    cy.getIframeBody('id="models_iframe"')
      .find("#subtab-PowerSupplyPorts")
      .click();
    cy.getIframeBody('id="models_iframe"')
      .find("#powerPortsGrid")
      .find(".ui-grid-cell-contents.ui-grid-disable-selection.clickable")
      .then(($elements) => {
        x = $elements.length;
        cy.getIframeBody('id="models_iframe"')
          .find("#subtab-PowerSupplyPorts")
          .contains("label", "Power Supply - " + x + " Ports");
        cy.getIframeBody('id="models_iframe"').find("#btnRemoveTab").click();
      });
  });
});
