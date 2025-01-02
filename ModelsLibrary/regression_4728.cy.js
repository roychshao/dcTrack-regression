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
    cy.getIframeBody('id="models_iframe"')
      .find("#tiDimHeight")
      .clear()
      .type("3.6{enter}");
    cy.getIframeBody('id="models_iframe"')
      .find("#tiRuHeight")
      .should("have.value", 3);
  });
});
