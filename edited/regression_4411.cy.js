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

  it("Visit Models Library Page", () => {
    cy.wait(16000);
    cy.get(".menu-toggle").click();
    cy.get(".header-dropdown > li").as("dropdown");
    cy.get("@dropdown")
      .eq(8)
      .find("sun-icon.fa.fa-chevron-right")
      .should("exist")
      .click();
    cy.get("@dropdown").eq(8).contains("Models Library").click();
  });

  it("Find 00YJ783", () => {
    cy.wait(8000);
    cy.getIframeBody('id="models_iframe"')
      .contains("div", "00YJ783")
      .dblclick();
    cy.wait(4000);
    cy.getIframeBody('id="models_iframe"')
      .find("#modeldetail")
      .find('[title="Edit"]')
      .click();
    cy.wait(6000);
    cy.getIframeBody('id="models_iframe"').find("#subtab-PowerPorts").click();
    cy.wait(2000);
    cy.getIframeBody('id="models_iframe"')
      .find("#powerPortsGrid")
      .find(".ui-grid-canvas")
      .eq(3)
      .children()
      .eq(1)
      .find('[title="20"]')
      .parent()
      .click()
      .clear();
    // To make it savable
    cy.getIframeBody('id="models_iframe"').find("#tiDontUpgrade").click();
    cy.getIframeBody('id="models_iframe"').find("#tiDontUpgrade").click();

    cy.wait(1000);
    cy.getIframeBody('id="models_iframe"')
      .find("#modeldetail")
      .find('[title="Save"]')
      .click();
    cy.wait(4000);
  });

  it("Verify error message and cancel this modification", () => {
    cy.wait(8000);
    const errMsg =
      "RPDU Outlet [ Outlet 1 ] Fuse and Fuse Amps should both be filled or left empty.";
    cy.getIframeBody('id="models_iframe"')
      .find(".modal-content")
      .contains("p", errMsg);
    cy.getIframeBody('id="models_iframe"').find("#modal-btnCancel").click();
    cy.getIframeBody('id="models_iframe"').find("#btnRemoveTab").click();
    cy.getIframeBody('id="models_iframe"').find("#modal-btnOk").click();
  });
});
