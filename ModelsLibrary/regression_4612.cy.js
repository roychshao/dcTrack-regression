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

  it("Try to delete a make", () => {
    cy.wait(4000);
    cy.getIframeBody('id="models_iframe"')
      .find("#modellist")
      .find('[title="Makes"]')
      .click();
    cy.getIframeBody('id="models_iframe"')
      .find("#makes-list")
      .contains("div", "2BM")
      .click();
    cy.getIframeBody('id="models_iframe"')
      .find("#makesList")
      .find('[title="Delete"]')
      .click();
    cy.getIframeBody('id="models_iframe"')
      .find(".dct-msg-body")
      .contains("p", "[ 2BM ] has [ 22 ] models and it cannot be deleted.");
    cy.getIframeBody('id="models_iframe"').find("#modal-btnCancel").click();
    cy.getIframeBody('id="models_iframe"').find("#modal-btnX").click();
  });

  it("Verify if 2BM is still visible", () => {
    cy.getIframeBody('id="models_iframe"')
      .find("#filter_make")
      .type("2BM{enter}");
    cy.wait(4000);
    cy.getIframeBody('id="models_iframe"').contains("div", "2BM");
  });
});
