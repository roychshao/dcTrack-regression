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
    cy.wait(8000);
    cy.get(".menu-toggle").click();
    cy.get(".header-dropdown > li").as("dropdown");
    cy.get("@dropdown")
      .eq(8)
      .find("sun-icon.fa.fa-chevron-right")
      .should("exist")
      .click();
    cy.get("@dropdown").eq(8).contains("Models Library").click();
  });

  it("Select 0000000111111", () => {
    cy.getIframeBody('id="models_iframe"')
      .contains("div", "0000000111111")
      .dblclick();
    cy.wait(4000);
    cy.getIframeBody('id="models_iframe"')
      .find("#modeldetail")
      .find('[title="Edit"]')
      .click();
    cy.getIframeBody('id="models_iframe"')
      .find("#tiDimWidth")
      .clear()
      .type("1.75");
    cy.getIframeBody('id="models_iframe"')
      .find("#tiWeight")
      .clear()
      .type("1.75");
    cy.getIframeBody('id="models_iframe"')
      .find("#tiDimDepth")
      .clear()
      .type("1.75");
    cy.getIframeBody('id="models_iframe"')
      .find("#modeldetail")
      .find('[title="Save"]')
      .click();
    cy.wait(10000);
  });

  it("Change unit", () => {
    cy.get("#headerToolbar_userAccount").click();
    cy.get("#headerToolbar_userAccount")
      .parent()
      .contains("a", "Preferences")
      .click();
    cy.wait(2000);
    cy.get("#user-profile-container").contains("span", " SI (Metric) ").click();
    cy.wait(2000);
    cy.get("#user-profile-container").contains("button", "Save").click();
  });

  it("Visit Models Library Page again", () => {
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

  it("Select 0000000111111 again and verify", () => {
    cy.wait(4000);
    cy.getIframeBody('id="models_iframe"')
      .find("#modeldetail")
      .find('[title="Refresh Model"]')
      .click();
    cy.wait(4000);
    cy.getIframeBody('id="models_iframe"')
      .find("#tiDimWidth")
      .should("have.value", "44.45");
    cy.getIframeBody('id="models_iframe"')
      .find("#tiDimHeight")
      .should("have.value", "44.45");
    cy.getIframeBody('id="models_iframe"')
      .find("#tiDimDepth")
      .should("have.value", "44.45");
    cy.getIframeBody('id="models_iframe"')
      .find("#tiWeight")
      .should("have.value", "0.79");
  });

  it("Rollback the unit system", () => {
    cy.get("#headerToolbar_userAccount").click();
    cy.get("#headerToolbar_userAccount")
      .parent()
      .contains("a", "Preferences")
      .click();
    cy.wait(2000);
    cy.get("#user-profile-container").contains("span", " U.S. ").click();
    cy.wait(2000);
    cy.get("#user-profile-container").contains("button", "Save").click();
  });

  it("Visit Models Library Page again", () => {
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

  it("Verify it is in the US unit and rollback", () => {
    cy.wait(4000);
    cy.getIframeBody('id="models_iframe"')
      .find("#modeldetail")
      .find('[title="Refresh Model"]')
      .click();
    cy.wait(4000);
    cy.getIframeBody('id="models_iframe"')
      .find("#tiDimWidth")
      .should("have.value", "1.75")
      .clear()
      .type("0{enter}");
    cy.getIframeBody('id="models_iframe"')
      .find("#tiDimHeight")
      .should("have.value", "1.75");
    cy.getIframeBody('id="models_iframe"')
      .find("#tiDimDepth")
      .should("have.value", "1.75")
      .clear()
      .type("0{enter}");
    cy.getIframeBody('id="models_iframe"')
      .find("#tiWeight")
      .should("have.value", "1.75")
      .clear()
      .type("0{enter}");
    cy.getIframeBody('id="models_iframe"')
      .find("#modeldetail")
      .find('[title="Save"]')
      .click();
    cy.wait(10000);
  });
});
