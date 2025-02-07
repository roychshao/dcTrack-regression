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

  it("Clone 0000000111111 and rename it to CLONED MODEL", () => {
    cy.getIframeBody('id="models_iframe"')
      .contains("div", "0000000111111")
      .click();
    cy.getIframeBody('id="models_iframe"')
      .find("#modellist")
      .find('[title="Clone selected model"]')
      .click();
    cy.wait(4000);
    cy.getIframeBody('id="models_iframe"').find("#tiPartNumber").clear();
    cy.getIframeBody('id="models_iframe"')
      .find("#cmbModel")
      .clear()
      .type("CLONED MODEL{enter}");
    cy.wait(2000);
    cy.getIframeBody('id="models_iframe"')
      .find("#modeldetail")
      .find('[title="Save"]')
      .click();
    cy.wait(4000);
  });

  it("Filter, verify, delete and verify again", () => {
    cy.wait(2000);
    cy.getIframeBody('id="models_iframe"').find("#btnRemoveTab").click();
    cy.getIframeBody('id="models_iframe"')
      .find("#filter_model")
      .type("CLONED MODEL{enter}");
    cy.wait(2000);
    cy.getIframeBody('id="models_iframe"')
      .find("#models-content")
      .contains("div", "CLONED MODEL")
      .click();
    cy.wait(2000);
    cy.getIframeBody('id="models_iframe"')
      .find("#modellist")
      .find('[title="Actions"]')
      .click();
    cy.getIframeBody('id="models_iframe"')
      .find("#modellist")
      .find("#dropdown-MODEL_ACTIONS > li")
      .as("dropdown");
    cy.get("@dropdown").eq(5).contains("Delete").click();
    cy.wait(2000);
    cy.getIframeBody('id="models_iframe"').find("#modal-btnOk").click();
    cy.wait(2000);
    cy.getIframeBody('id="models_iframe"')
      .find("#models-content")
      .contains("div", "CLONED MODEL")
      .should("not.exist");
  });
});
