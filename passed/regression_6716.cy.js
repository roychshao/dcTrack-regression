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

  it("Visit Assets Page", () => {
    cy.wait(8000);
    cy.get(".menu-toggle").click();
    cy.get(".header-dropdown > li").as("dropdown");
    cy.get("@dropdown")
      .eq(3)
      .find("sun-icon.fa.fa-chevron-right")
      .should("exist")
      .click();
    cy.get("@dropdown").eq(3).contains("Items").click();
  });

  it("Choose item 101", () => {
    cy.wait(4000);
    cy.getIframeBody('id="assets_iframe"')
      .contains("div", "48RU-Cabinet GlobalFrame-3A-400")
      .eq(0)
      .dblclick();
    cy.wait(4000);
  });

  it("Move Item Request", () => {
    cy.wait(4000);
    cy.getIframeBody('id="assets_iframe"')
      .find('div[class="tab-pane active"]')
      .find('[title="Actions"]')
      .click();
    cy.getIframeBody('id="assets_iframe"')
      .find('div[class="tab-pane active"]')
      .find("#dropdown-ACTION_TB > li")
      .as("dropdown");
    cy.get("@dropdown").eq(11).contains("Quick Move Item Request...").click();
  });

  it("Fill up the Row Label field and save", () => {
    cy.wait(4000);
    cy.getIframeBody('id="assets_iframe"')
      .find("#cmbRowLabel-selectized")
      .click()
      .type("01{enter}");
    cy.getIframeBody('id="assets_iframe"')
      .find('div[class="tab-pane active"]')
      .find('[title="Save"]')
      .click();
    cy.wait(2000);
    cy.getIframeBody('id="assets_iframe"').find("#modal-btnOk").click();
    cy.wait(4000);
    cy.getIframeBody('id="assets_iframe"').find("#modal-btnCancel").click();
  });

  it("Check if the WHEN MOVE tab still exist, which can means that no more dialogs", () => {
    cy.wait(4000);
    cy.getIframeBody('id="assets_iframe"')
      .find("#inner-scroller")
      .find("ul > li")
      .should("have.length", 3);
  });
});
