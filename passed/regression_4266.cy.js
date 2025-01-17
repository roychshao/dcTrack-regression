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
    cy.getIframeBody('id="models_iframe"')
      .find("#filter_model")
      .type("00YJ783{enter}");
  });

  it("Verify the dataPortsCount and powerPortsCount on the list", () => {
    cy.getIframeBody('id="models_iframe"')
      .find("#myGrid")
      .find(".ui-grid-viewport")
      .eq(1)
      .scrollTo("right");
    cy.getIframeBody('id="models_iframe"')
      .find('div.ui-grid-cell-contents[title="25"]')
      .should("exist");
    cy.getIframeBody('id="models_iframe"')
      .find('div.ui-grid-cell-contents[title="1"]')
      .should("exist");
    cy.getIframeBody('id="models_iframe"')
      .find("#myGrid")
      .find(".ui-grid-viewport")
      .eq(1)
      .scrollTo("left");
  });

  it("Verify the counts in detail page", () => {
    cy.wait(2000);
    cy.getIframeBody('id="models_iframe"')
      .find('[aria-label="Row 1, Row Selection Checkbox"]')
      .dblclick();
    cy.wait(4000);
    cy.getIframeBody('id="models_iframe"').find("#subtab-DataPorts").click();
    cy.wait(2000);
    cy.getIframeBody('id="models_iframe"')
      .find("#dataPortsGrid")
      .find(".ui-grid-canvas")
      .eq(1)
      .children()
      .should("have.length", 1);
    cy.getIframeBody('id="models_iframe"').find("#subtab-PowerPorts").click();
    cy.wait(2000);
    // scroll to bottom
    cy.getIframeBody('id="models_iframe"')
      .find("#powerPortsGrid")
      .find(".ui-grid-viewport")
      .eq(1)
      .scrollTo("bottom");
    cy.getIframeBody('id="models_iframe"')
      .find('[aria-label="Row 25, Row Selection Checkbox"]')
      .should("exist");
    // 25 exist and 26 do not exist means there are exactly 25
    cy.getIframeBody('id="models_iframe"')
      .find('[aria-label="Row 25, Row Selection Checkbox"]')
      .should("exist");
    cy.getIframeBody('id="models_iframe"')
      .find('[aria-label="Row 26, Row Selection Checkbox"]')
      .should("not.exist");
  });
});
