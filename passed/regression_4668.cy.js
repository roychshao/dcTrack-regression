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

  // NOTE: test db do not have model with 2-Post Frame, ignore it

  it("Verify form factor: 4-Post Enclosure", () => {
    cy.wait(4000);
    cy.getIframeBody('id="models_iframe"')
      .find("#filter_formFactor")
      .find("button")
      .click();
    cy.getIframeBody('id="models_iframe"').find("#option-1").click();
    cy.getIframeBody('id="models_iframe"')
      .find("#filter_formFactor")
      .find("button")
      .click();
    cy.wait(2000);
    cy.getIframeBody('id="models_iframe"')
      .find(".ui-grid-canvas > div")
      .eq(0)
      .dblclick();
    cy.wait(4000);
    cy.getIframeBody('id="models_iframe"')
      .find("#subtab-SlotSetup")
      .parent()
      .parent()
      .should("have.class", "ng-hide");
    cy.getIframeBody('id="models_iframe"').find("#btnRemoveTab").click();
  });

  it("Verify form factor: Blanking Plate", () => {
    cy.wait(4000);
    cy.getIframeBody('id="models_iframe"')
      .find("#filter_formFactor")
      .find("button")
      .click();
    cy.getIframeBody('id="models_iframe"').find("#option-1").click();
    cy.getIframeBody('id="models_iframe"').find("#option-2").click();
    cy.getIframeBody('id="models_iframe"')
      .find("#filter_formFactor")
      .find("button")
      .click();
    cy.wait(2000);
    cy.getIframeBody('id="models_iframe"')
      .find(".ui-grid-canvas > div")
      .eq(0)
      .dblclick();
    cy.wait(4000);
    cy.getIframeBody('id="models_iframe"')
      .find("#subtab-SlotSetup")
      .parent()
      .parent()
      .should("have.class", "ng-hide");
    cy.getIframeBody('id="models_iframe"').find("#btnRemoveTab").click();
  });

  it("Verify form factor: Chassis", () => {
    cy.wait(4000);
    cy.getIframeBody('id="models_iframe"')
      .find("#filter_formFactor")
      .find("button")
      .click();
    cy.getIframeBody('id="models_iframe"').find("#option-2").click();
    cy.getIframeBody('id="models_iframe"').find("#option-3").click();
    cy.getIframeBody('id="models_iframe"')
      .find("#filter_formFactor")
      .find("button")
      .click();
    cy.wait(2000);
    cy.getIframeBody('id="models_iframe"')
      .find(".ui-grid-canvas > div")
      .eq(0)
      .dblclick();
    cy.wait(4000);
    cy.getIframeBody('id="models_iframe"')
      .find("#subtab-SlotSetup")
      .parent()
      .parent()
      .should("not.have.class", "ng-hide");
    cy.getIframeBody('id="models_iframe"').find("#btnRemoveTab").click();
  });

  it("Verify form factor: Fixed", () => {
    cy.wait(4000);
    cy.getIframeBody('id="models_iframe"')
      .find("#filter_formFactor")
      .find("button")
      .click();
    cy.getIframeBody('id="models_iframe"').find("#option-3").click();
    cy.getIframeBody('id="models_iframe"').find("#option-4").click();
    cy.getIframeBody('id="models_iframe"')
      .find("#filter_formFactor")
      .find("button")
      .click();
    cy.wait(2000);
    cy.getIframeBody('id="models_iframe"')
      .find(".ui-grid-canvas > div")
      .eq(0)
      .dblclick();
    cy.wait(4000);
    cy.getIframeBody('id="models_iframe"')
      .find("#subtab-SlotSetup")
      .parent()
      .parent()
      .should("have.class", "ng-hide");
    cy.getIframeBody('id="models_iframe"').find("#btnRemoveTab").click();
  });

  it("Verify form factor: Full", () => {
    cy.wait(4000);
    cy.getIframeBody('id="models_iframe"')
      .find("#filter_formFactor")
      .find("button")
      .click();
    cy.getIframeBody('id="models_iframe"').find("#option-4").click();
    cy.getIframeBody('id="models_iframe"').find("#option-5").click();
    cy.getIframeBody('id="models_iframe"')
      .find("#filter_formFactor")
      .find("button")
      .click();
    cy.wait(2000);
    cy.getIframeBody('id="models_iframe"')
      .find(".ui-grid-canvas > div")
      .eq(0)
      .dblclick();
    cy.wait(4000);
    cy.getIframeBody('id="models_iframe"')
      .find("#subtab-SlotSetup")
      .parent()
      .parent()
      .should("have.class", "ng-hide");
    cy.getIframeBody('id="models_iframe"').find("#btnRemoveTab").click();
  });

  it("Verify form factor: Full-Double", () => {
    cy.wait(4000);
    cy.getIframeBody('id="models_iframe"')
      .find("#filter_formFactor")
      .find("button")
      .click();
    cy.getIframeBody('id="models_iframe"').find("#option-5").click();
    cy.getIframeBody('id="models_iframe"').find("#option-6").click();
    cy.getIframeBody('id="models_iframe"')
      .find("#filter_formFactor")
      .find("button")
      .click();
    cy.wait(2000);
    cy.getIframeBody('id="models_iframe"')
      .find(".ui-grid-canvas > div")
      .eq(0)
      .dblclick();
    cy.wait(4000);
    cy.getIframeBody('id="models_iframe"')
      .find("#subtab-SlotSetup")
      .parent()
      .parent()
      .should("have.class", "ng-hide");
    cy.getIframeBody('id="models_iframe"').find("#btnRemoveTab").click();
  });

  it("Verify form factor: Half", () => {
    cy.wait(4000);
    cy.getIframeBody('id="models_iframe"')
      .find("#filter_formFactor")
      .find("button")
      .click();
    cy.getIframeBody('id="models_iframe"').find("#option-6").click();
    cy.getIframeBody('id="models_iframe"').find("#option-7").click();
    cy.getIframeBody('id="models_iframe"')
      .find("#filter_formFactor")
      .find("button")
      .click();
    cy.wait(2000);
    cy.getIframeBody('id="models_iframe"')
      .find(".ui-grid-canvas > div")
      .eq(0)
      .dblclick();
    cy.wait(4000);
    cy.getIframeBody('id="models_iframe"')
      .find("#subtab-SlotSetup")
      .parent()
      .parent()
      .should("have.class", "ng-hide");
    cy.getIframeBody('id="models_iframe"').find("#btnRemoveTab").click();
  });

  it("Verify form factor: Half-Double", () => {
    cy.wait(4000);
    cy.getIframeBody('id="models_iframe"')
      .find("#filter_formFactor")
      .find("button")
      .click();
    cy.getIframeBody('id="models_iframe"').find("#option-7").click();
    cy.getIframeBody('id="models_iframe"').find("#option-8").click();
    cy.getIframeBody('id="models_iframe"')
      .find("#filter_formFactor")
      .find("button")
      .click();
    cy.wait(2000);
    cy.getIframeBody('id="models_iframe"')
      .find(".ui-grid-canvas > div")
      .eq(0)
      .dblclick();
    cy.wait(4000);
    cy.getIframeBody('id="models_iframe"')
      .find("#subtab-SlotSetup")
      .parent()
      .parent()
      .should("have.class", "ng-hide");
    cy.getIframeBody('id="models_iframe"').find("#btnRemoveTab").click();
  });

  it("Verify form factor: Quarter", () => {
    cy.wait(4000);
    cy.getIframeBody('id="models_iframe"')
      .find("#filter_formFactor")
      .find("button")
      .click();
    cy.getIframeBody('id="models_iframe"').find("#option-8").click();
    cy.getIframeBody('id="models_iframe"').find("#option-9").click();
    cy.getIframeBody('id="models_iframe"')
      .find("#filter_formFactor")
      .find("button")
      .click();
    cy.wait(2000);
    cy.getIframeBody('id="models_iframe"')
      .find(".ui-grid-canvas > div")
      .eq(0)
      .dblclick();
    cy.wait(4000);
    cy.getIframeBody('id="models_iframe"')
      .find("#subtab-SlotSetup")
      .parent()
      .parent()
      .should("have.class", "ng-hide");
    cy.getIframeBody('id="models_iframe"').find("#btnRemoveTab").click();
  });

  it("Verify form factor: Shelf", () => {
    cy.wait(4000);
    cy.getIframeBody('id="models_iframe"')
      .find("#filter_formFactor")
      .find("button")
      .click();
    cy.getIframeBody('id="models_iframe"').find("#option-9").click();
    cy.getIframeBody('id="models_iframe"').find("#option-10").click();
    cy.getIframeBody('id="models_iframe"')
      .find("#filter_formFactor")
      .find("button")
      .click();
    cy.wait(2000);
    cy.getIframeBody('id="models_iframe"')
      .find(".ui-grid-canvas > div")
      .eq(0)
      .dblclick();
    cy.wait(4000);
    cy.getIframeBody('id="models_iframe"')
      .find("#subtab-SlotSetup")
      .parent()
      .parent()
      .should("have.class", "ng-hide");
    cy.getIframeBody('id="models_iframe"').find("#btnRemoveTab").click();
  });
});
