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

  it("Filtering", () => {
    cy.wait(4000);
    cy.getIframeBody('id="models_iframe"')
      .find("#filter_class")
      .find("button")
      .click();
    cy.getIframeBody('id="models_iframe"').find("#option-14").click();
    cy.getIframeBody('id="models_iframe"')
      .find("#filter_formFactor")
      .find("button")
      .click();
    cy.getIframeBody('id="models_iframe"')
      .find("#filter_subclass")
      .find("button")
      .click();
    cy.getIframeBody('id="models_iframe"').find("#option-35").click();
    cy.getIframeBody('id="models_iframe"')
      .find("#filter_formFactor")
      .find("button")
      .click();
    cy.getIframeBody('id="models_iframe"')
      .find("#filter_subclass")
      .find("button")
      .click();
  });

  it("Select 00YJ776 ATZY", () => {
    cy.getIframeBody('id="models_iframe"')
      .contains("div", "00YJ776 ATZY")
      .dblclick();
  });

  it("Verify the Phase Legs field of a Single Phase outlet is empty", () => {
    cy.wait(6000);
    cy.getIframeBody('id="models_iframe"')
      .find("#subtab-PowerPorts")
      .parent()
      .click();
    cy.getIframeBody('id="models_iframe"')
      .find("#powerPortsGrid")
      .contains("span", "Phase Legs")
      .should("not.exist");
  });
});
