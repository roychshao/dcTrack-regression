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
    cy.wait(6000);
    cy.get(".menu-toggle").click();
    cy.get(".header-dropdown > li").as("dropdown");
    cy.get("@dropdown")
      .eq(8)
      .find("sun-icon.fa.fa-chevron-right")
      .should("exist")
      .click();
    cy.get("@dropdown").eq(8).contains("Models Library").click();
  });

  it("Try to upload models library", () => {
    cy.wait(4000);

    // if version has been 3.172, jump to next
    cy.getIframeBody('id="models_iframe"')
      .find("#modellist")
      .contains("label", "Last update version: 3.172")
      .then((label) => {
        if (label) {
          return;
        } else {
          cy.getIframeBody('id="models_iframe"')
            .find("#modellist")
            .find('[title="Actions"]')
            .click();
          cy.getIframeBody('id="models_iframe"')
            .find("#dropdown-MODEL_ACTIONS > li")
            .eq(0)
            .find("a")
            .click();
          cy.getIframeBody('id="models_iframe"').find("#btnUpload").click();
        }
      });
  });

  it("Upload file", () => {
    // if version has been 3.172, jump to next
    cy.getIframeBody('id="models_iframe"')
      .find("#modellist")
      .contains("label", "Last update version: 3.172")
      .then((label) => {
        if (label) {
          return;
        } else {
          const file =
            "/mnt/c/Users/roych/OneDrive/Desktop/Sunbird-RegressionTest/3_172/3.172/dcTrack_Library_3.172.mlu";
          cy.getIframeBody('id="models_iframe"')
            .find('[uploader="vm.uploader"]')
            .eq(0)
            .find('input[type="file"][id="raritan-file-input"]')
            .selectFile(file, { force: true });
          cy.wait(65000);
          cy.getIframeBody('id="models_iframe"')
            .find('[ui-view="modellibview"]')
            .find("textarea")
            .should(
              "have.value",
              "Models Library Staging is successful without any errors or warnings. You may now proceed to the next step.",
            );
          // just to models step
          for (let i = 0; i < 7; ++i) {
            cy.getIframeBody('id="models_iframe"').find("#btnNext").click();
            cy.wait(2000);
          }
          cy.getIframeBody('id="models_iframe"')
            .find("#dropdown-export")
            .contains("a", "Actions on Models in this Update");
          cy.getIframeBody('id="models_iframe"').find("#btnRemoveTab").click();
          cy.getIframeBody('id="models_iframe"').find("#modal-btnOk").click();
        }
      });
  });
});
