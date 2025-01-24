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
    Cypress.config("defaultCommandTimeout", 20000);
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

  it("Edit the index of Outlet 2 to be 1 and try to save it", () => {
    cy.wait(4000);
    cy.getIframeBody('id="models_iframe"')
      .find("#modeldetail")
      .find('[title="Edit"]')
      .click();
    cy.getIframeBody('id="models_iframe"')
      .find("#subtab-PowerPorts")
      .parent()
      .click();
    cy.getIframeBody('id="models_iframe"')
      .find("#powerPortsGrid")
      .find(".ui-grid-canvas")
      .eq(3)
      .find('[title="2"]')
      // .parent()
      .click()
      // .should("have.attr", "aria-selected", "true")
      .wait(1000)
      .click()
      // .wait(1000)
      .type("{selectall}{backspace}1")
      .type("{selectall}{backspace}1");
    cy.wait(2000);
    // cy.getIframeBody('id="models_iframe"')
    //   .find("#powerPortsGrid")
    //   .find(".ui-grid-canvas")
    //   .eq(3)
    //   .find('[title="2"]')
    //   .parent()
    //   .find("input")
    //   .clear()
    //   .type("1{enter}");
    cy.getIframeBody('id="models_iframe"')
      .find("#modeldetail")
      .find('[title="Save"]')
      .click();
  });

  it("Verify the error message should displayed", () => {
    cy.wait(6000);
    cy.getIframeBody('id="models_iframe"')
      .find(".dct-msg-body")
      .contains("p", "Power Port Index [ Output 1 ] is/are already used.");
    cy.getIframeBody('id="models_iframe"').find("#modal-btnCancel").click();
  });

  it("Fix the duplicated index and save it again", () => {
    cy.getIframeBody('id="models_iframe"')
      .find("#powerPortsGrid")
      .find(".ui-grid-canvas")
      .eq(3)
      .find('[title="1"]')
      .eq(4)
      // .parent()
      .click()
      .wait(1000)
      .click()
      .type("{selectall}{backspace}2")
      .type("{selectall}{backspace}2");
    cy.wait(2000);
    cy.getIframeBody('id="models_iframe"')
      .find("#modeldetail")
      .find('[title="Save"]')
      .click();
  });

  it("Verify the dialog and error message should not exist", () => {
    cy.wait(8000);
    cy.getIframeBody('id="models_iframe"')
      .find(".dct-msg-body")
      .should("not.exist");
  });
});
