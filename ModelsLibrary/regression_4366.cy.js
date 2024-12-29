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

  it("Select 003-0116", () => {
    cy.wait(6000);
    cy.getIframeBody('id="models_iframe"')
      .contains("div", "003-0116")
      .dblclick();
    cy.wait(6000);
  });

  it("Create a Three Phase Why Inlet", () => {
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
    cy.wait(2000);
    cy.getIframeBody('id="models_iframe"')
      .find("#selectedPortType-selectized")
      .type("Inlet{enter}");
    cy.getIframeBody('id="models_iframe"')
      .find("#selectedPhase-selectized")
      .click();
    cy.getIframeBody('id="models_iframe"').find('[data-value="7023"]').click();
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
    cy.wait(1000);
    cy.getIframeBody('id="models_iframe"').find("#btnCancel").click();
  });

  it("Create an Outlet connected to the Inlet just created and verify it", () => {
    cy.getIframeBody('id="models_iframe"').find("#toolBarBtnNew").click();
    cy.wait(2000);
    cy.getIframeBody('id="models_iframe"')
      .find("#selectedPortType-selectized")
      .type("Outlet{enter}");
    cy.getIframeBody('id="models_iframe"')
      .find("#selectedInputCord-selectized")
      .click();
    cy.getIframeBody('id="models_iframe"')
      .find('[data-value="Inlet 2"]')
      .click();
    cy.wait(2000);
    cy.getIframeBody('id="models_iframe"')
      .find("#selectedPhaseLegs-selectized")
      .click();
    cy.getIframeBody('id="models_iframe"')
      .find('[data-value="20601"]') // A
      .click();
    cy.getIframeBody('id="models_iframe"')
      .find("#selectedVolts-selectized")
      .parent()
      .contains("div", "277");
    cy.getIframeBody('id="models_iframe"')
      .find("#selectedPhaseLegs-selectized")
      .click();
    cy.getIframeBody('id="models_iframe"')
      .find('[data-value="20602"]') // B
      .click();
    cy.getIframeBody('id="models_iframe"')
      .find("#selectedVolts-selectized")
      .parent()
      .contains("div", "277");
    cy.getIframeBody('id="models_iframe"')
      .find("#selectedPhaseLegs-selectized")
      .click();
    cy.getIframeBody('id="models_iframe"')
      .find('[data-value="20603"]') // C
      .click();
    cy.getIframeBody('id="models_iframe"')
      .find("#selectedVolts-selectized")
      .parent()
      .contains("div", "277");
    cy.getIframeBody('id="models_iframe"')
      .find("#selectedPhaseLegs-selectized")
      .click();
    cy.getIframeBody('id="models_iframe"')
      .find('[data-value="20604"]') // AB
      .click();
    cy.getIframeBody('id="models_iframe"')
      .find("#selectedVolts-selectized")
      .parent()
      .contains("div", "480");
    cy.getIframeBody('id="models_iframe"')
      .find("#selectedPhaseLegs-selectized")
      .click();
    cy.getIframeBody('id="models_iframe"')
      .find('[data-value="20605"]') // BC
      .click();
    cy.getIframeBody('id="models_iframe"')
      .find("#selectedVolts-selectized")
      .parent()
      .contains("div", "480");
    cy.getIframeBody('id="models_iframe"')
      .find("#selectedPhaseLegs-selectized")
      .click();
    cy.getIframeBody('id="models_iframe"')
      .find('[data-value="20606"]') // CA
      .click();
    cy.getIframeBody('id="models_iframe"')
      .find("#selectedVolts-selectized")
      .parent()
      .contains("div", "480");
  });
});
