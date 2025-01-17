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
    cy.wait(12000);
    cy.get(".menu-toggle").click();
    cy.get(".header-dropdown > li").as("dropdown");
    cy.get("@dropdown")
      .eq(8)
      .find("sun-icon.fa.fa-chevron-right")
      .should("exist")
      .click();
    cy.get("@dropdown").eq(8).contains("Models Library").click();
  });

  it("Clone 00YJ783 and remove its data port", () => {
    cy.wait(8000);
    cy.getIframeBody('id="models_iframe"').contains("div", "00YJ783").click();
    cy.wait(4000);
    cy.getIframeBody('id="models_iframe"')
      .find("#modellist")
      .find('[title="Clone selected model"]')
      .click();
    cy.wait(14000);
    cy.getIframeBody('id="models_iframe"').find("#subtab-DataPorts").click();
    cy.wait(2000);
    cy.getIframeBody('id="models_iframe"')
      .find("#dataPortsGrid")
      .find(".ui-grid-canvas")
      .eq(1)
      .find('[role="checkbox"]')
      .click();
    cy.getIframeBody('id="models_iframe"').find("#btnDelete").click();
    cy.wait(1000);
    cy.getIframeBody('id="models_iframe"')
      .find("#modeldetail")
      .find('[title="Save"]')
      .click();
    cy.wait(4000);
  });

  it("Verify result and remove this clone", () => {
    cy.wait(8000);
    cy.getIframeBody('id="models_iframe"')
      .find("#dataPortsGrid")
      .find(".ui-grid-canvas")
      .eq(2)
      .find('[role="checkbox"]')
      .should("not.exist");
    cy.getIframeBody('id="models_iframe"')
      .find("#modeldetail")
      .find('[title="Delete"]')
      .click();
    cy.getIframeBody('id="models_iframe"').find("#modal-btnOk").click();
  });
});
