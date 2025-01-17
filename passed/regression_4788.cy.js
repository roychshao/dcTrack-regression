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
    cy.wait(8000);
    cy.get(".menu-toggle").click();
    cy.get(".header-dropdown > li").as("dropdown");
    cy.get("@dropdown")
      .eq(8)
      .find("sun-icon.fa.fa-chevron-right")
      .should("exist")
      .click();
    cy.get("@dropdown").eq(8).contains("Models Library").click();
  });

  it("Edit 0000000111111, save and inspect data", () => {
    cy.getIframeBody('id="models_iframe"')
      .contains("div", "0000000111111")
      .dblclick();
    cy.wait(4000);
    cy.getIframeBody('id="models_iframe"')
      .find("#modeldetail")
      .find('[title="Edit"]')
      .click();
    cy.getIframeBody('id="models_iframe"')
      .find("#tiMounting-selectized")
      .parent()
      .click();
    cy.getIframeBody('id="models_iframe"')
      .find('[data-value="Non-Rackable"]')
      .click();
    cy.getIframeBody('id="models_iframe"')
      .find("#modeldetail")
      .find('[title="Save"]')
      .click();
    cy.wait(10000);
    cy.getIframeBody('id="models_iframe"')
      .find("#tiMounting-selectized")
      .parent()
      .contains("div", "Non-Rackable");
  });

  it("Rollback", () => {
    cy.wait(4000);
    cy.getIframeBody('id="models_iframe"')
      .find("#tiMounting-selectized")
      .parent()
      .click();
    cy.getIframeBody('id="models_iframe"')
      .find('[data-value="Rackable"]')
      .click();
    cy.getIframeBody('id="models_iframe"')
      .find("#modeldetail")
      .find('[title="Save"]')
      .click();
  });

  it("Back to model list", () => {
    cy.wait(8000);
    cy.getIframeBody('id="models_iframe"').find("#back-to-list-btn").click();
  });

  it("Edit 001 ENC-02, save and inspect data", () => {
    cy.getIframeBody('id="models_iframe"')
      .contains("div", "001 ENC-02")
      .dblclick();
    cy.wait(8000);
    cy.getIframeBody('id="models_iframe"')
      .find("#subtab-heading-1")
      .find("#btnRemoveTab")
      .click();
    cy.getIframeBody('id="models_iframe"')
      .find("#modeldetail")
      .find('[title="Edit"]')
      .click();
    cy.getIframeBody('id="models_iframe"')
      .find("#tiMounting-selectized")
      .parent()
      .click();
    cy.getIframeBody('id="models_iframe"')
      .find('[data-value="Non-Rackable"]')
      .click();
    cy.getIframeBody('id="models_iframe"')
      .find("#modeldetail")
      .find('[title="Save"]')
      .click();
    cy.wait(10000);
    cy.getIframeBody('id="models_iframe"')
      .find("#tiMounting-selectized")
      .parent()
      .contains("div", "Non-Rackable");
  });

  it("Rollback", () => {
    cy.getIframeBody('id="models_iframe"')
      .find("#tiMounting-selectized")
      .parent()
      .click();
    cy.getIframeBody('id="models_iframe"')
      .find('[data-value="Rackable"]')
      .click();
    cy.getIframeBody('id="models_iframe"')
      .find("#modeldetail")
      .find('[title="Save"]')
      .click();
  });
});
