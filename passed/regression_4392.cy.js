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

  it("Select 009-7001-0104 TPC Demarcation Fuse Alarm Panel and create an inlet", () => {
    cy.getIframeBody('id="models_iframe"')
      .contains("div", "009-7001-0104 TPC Demarcation Fuse Alarm Panel")
      .dblclick();
    cy.wait(4000);
    cy.getIframeBody('id="models_iframe"')
      .find("#modeldetail")
      .find('[title="Edit"]')
      .click();
    cy.getIframeBody('id="models_iframe"')
      .find("#subtab-PowerPorts")
      .parent()
      .click();
    cy.getIframeBody('id="models_iframe"').find("#toolBarBtnNew").click();
    cy.getIframeBody('id="models_iframe"')
      .find("#selectedPortType-selectized")
      .type("Inlet{enter}");
    cy.getIframeBody('id="models_iframe"')
      .find("#selectedVolts-selectized")
      .type("480{enter}");
    cy.getIframeBody('id="models_iframe"')
      .find("#selectedAmpsNameplate-selectized")
      .type("15{enter}");
    cy.getIframeBody('id="models_iframe"')
      .find("#selectedConnector-selectized")
      .type("AC Terminal{enter}");
    cy.getIframeBody('id="models_iframe"').find("#btnCreate").click();
    cy.wait(2000);
    cy.getIframeBody('id="models_iframe"').find("#btnCancel").click();
  });

  it("Create an outlet and attach to the inlet just created", () => {
    cy.getIframeBody('id="models_iframe"').find("#toolBarBtnNew").click();
    cy.getIframeBody('id="models_iframe"')
      .find("#selectedPortType-selectized")
      .type("Outlet{enter}");
    cy.getIframeBody('id="models_iframe"')
      .find("#selectedAmpsNameplate-selectized")
      .type("15{enter}");
    cy.getIframeBody('id="models_iframe"')
      .find("#selectedConnector-selectized")
      .type("AC Terminal{enter}");
    cy.getIframeBody('id="models_iframe"').find("#btnCreate").click();
    cy.wait(2000);
    cy.getIframeBody('id="models_iframe"').find("#btnCancel").click();
  });

  it("Edit the volts of the inlet", () => {
    cy.getIframeBody('id="models_iframe"')
      .find("#powerPortsGrid")
      .find('[title="480"]')
      .eq(0)
      .parent()
      .click()
      .then(($div) => {
        cy.wrap($div).find("select").select("100");
      });
    cy.getIframeBody('id="models_iframe"')
      .find("#powerPortsGrid")
      .find('[title="480"]')
      .eq(0)
      .parent()
      .click();
    cy.getIframeBody('id="models_iframe"')
      .find("#powerPortsGrid")
      .find('[title="100"]')
      .should("have.length", 2);
  });
});
