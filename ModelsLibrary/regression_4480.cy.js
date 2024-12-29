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

  it("Select 00YJ783", () => {
    cy.getIframeBody('id="models_iframe"')
      .contains("div", "00YJ783")
      .dblclick();
    cy.wait(6000);
  });

  it("Verify the columns of the grid", () => {
    cy.wait(4000);
    cy.getIframeBody('id="models_iframe"')
      .find("#subtab-PowerPorts")
      .parent()
      .click();
    cy.wait(2000);
    cy.getIframeBody('id="models_iframe"')
      .find("#powerPortsGrid")
      .contains("span", "Port Name");
    cy.getIframeBody('id="models_iframe"')
      .find("#powerPortsGrid")
      .contains("span", "Index");
    cy.getIframeBody('id="models_iframe"')
      .find("#powerPortsGrid")
      .contains("span", "Connector");
    cy.getIframeBody('id="models_iframe"')
      .find("#powerPortsGrid")
      .contains("span", "Phase Type");
    cy.getIframeBody('id="models_iframe"')
      .find("#powerPortsGrid")
      .contains("span", "Volts");
    cy.getIframeBody('id="models_iframe"')
      .find("#powerPortsGrid")
      .contains("span", "Power Factor");
    cy.getIframeBody('id="models_iframe"')
      .find("#powerPortsGrid")
      .contains("span", "Watts (N)");
    cy.getIframeBody('id="models_iframe"')
      .find("#powerPortsGrid")
      .contains("span", "Watts (B)");
    cy.getIframeBody('id="models_iframe"')
      .find("#powerPortsGrid")
      .contains("span", "Optional");
    cy.getIframeBody('id="models_iframe"')
      .find("#powerPortsGrid")
      .contains("span", "Version");
    cy.getIframeBody('id="models_iframe"')
      .find("#powerPortsGrid")
      .contains("span", "Origin");
  });
});
