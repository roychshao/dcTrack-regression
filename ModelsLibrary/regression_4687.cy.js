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

  it("Clone 0000000111111 and rename it to 00000001111111", () => {
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
      .type("00000001111111{enter}");
    cy.wait(2000);
    cy.getIframeBody('id="models_iframe"')
      .find("#modeldetail")
      .find('[title="Save"]')
      .click();
    cy.wait(8000);
    cy.getIframeBody('id="models_iframe"').find("#btnRemoveTab").click();
  });

  it("Clone 001 ENC-02 and rename it to 001 ENC-021", () => {
    cy.getIframeBody('id="models_iframe"')
      .contains("div", "001 ENC-02")
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
      .type("001 ENC-021{enter}");
    cy.wait(2000);
    cy.getIframeBody('id="models_iframe"')
      .find("#modeldetail")
      .find('[title="Save"]')
      .click();
    cy.wait(8000);
    cy.getIframeBody('id="models_iframe"').find("#btnRemoveTab").click();
  });

  it("Delete them and verify it", () => {
    cy.getIframeBody('id="models_iframe"')
      .contains("div", "00000001111111")
      .click();
    cy.getIframeBody('id="models_iframe"')
      .contains("div", "001 ENC-021")
      .click({ ctrlKey: true });
    cy.getIframeBody('id="models_iframe"')
      .find("#modellist")
      .find('[title="Actions"]')
      .click();
    cy.getIframeBody('id="models_iframe"')
      .find("#dropdown-MODEL_ACTIONS > li")
      .as("dropdown");
    cy.get("@dropdown").contains("span", "Delete").parent().click();
    cy.getIframeBody('id="models_iframe"').find("#modal-btnOk").click();
    cy.wait(4000);
    cy.getIframeBody('id="models_iframe"')
      .find('[title="00000001111111"]')
      .should("not.exist");
    cy.getIframeBody('id="models_iframe"')
      .find('[title="001 ENC-021"]')
      .should("not.exist");
  });
});
