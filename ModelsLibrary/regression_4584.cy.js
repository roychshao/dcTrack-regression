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

  it("Click Makes button", () => {
    cy.wait(4000);
    cy.getIframeBody('id="models_iframe"')
      .find("#modellist")
      .find('[title="Makes"]')
      .click();
    cy.wait(4000);
  });

  it("select a make and add a make", () => {
    cy.wait(2000);
    cy.getIframeBody('id="models_iframe"').contains("div", "2BM").click();
    cy.getIframeBody('id="models_iframe"')
      .find("#makesList")
      .find('[title="Add a Make"]')
      .click();
  });

  it("Add a make named TTTTTTTT and confirm that all fields are empty expect for name", () => {
    cy.wait(4000);
    cy.getIframeBody('id="models_iframe"')
      .find("#aliasInput")
      .should("have.value", "");
    cy.getIframeBody('id="models_iframe"')
      .find("#tiNotes")
      .should("have.value", "");
    cy.getIframeBody('id="models_iframe"')
      .find("#tiTelCustService")
      .should("have.value", "");
    cy.getIframeBody('id="models_iframe"')
      .find("#tiTelTechSupport")
      .should("have.value", "");
    cy.getIframeBody('id="models_iframe"')
      .find("#tiAccountNumber")
      .should("have.value", "");
    cy.getIframeBody('id="models_iframe"')
      .find("#cmbMake")
      .type("TTTTTTTT{enter}");
    cy.getIframeBody('id="models_iframe"').find("#modal-btnSave").click();
    cy.getIframeBody('id="models_iframe"').find("#modal-btnOk").click();
  });

  it("Verify if the new make has been created and delete it", () => {
    cy.wait(2000);
    cy.getIframeBody('id="models_iframe"')
      .find(".modal-content")
      .find("#myGrid")
      .find('[aria-label="Filter for column"]')
      .eq(0)
      .type("TTTTTTTT{enter}");
    cy.getIframeBody('id="models_iframe"')
      .find(".modal-content")
      .find("#myGrid")
      .contains("div", "TTTTTTTT");
    cy.getIframeBody('id="models_iframe"')
      .find(".modal-content")
      .find("#myGrid")
      .contains("div", "TTTTTTTT")
      .click();
    cy.getIframeBody('id="models_iframe"')
      .find("#makesList")
      .find('[title="Delete"]')
      .click();
  });
});
