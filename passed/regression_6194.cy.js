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

  it("Visit Visualization Page", () => {
    cy.wait(8000);
    cy.get(".menu-toggle").click();
    cy.get(".header-dropdown > li").as("dropdown");
    cy.get("@dropdown")
      .eq(1)
      .find("sun-icon.fa.fa-chevron-right")
      .should("exist")
      .click();
    cy.get("@dropdown").eq(1).contains(" Floor Maps ").click();
  });

  it("Verify canvas displayed and zoomin", () => {
    cy.wait(8000);
    cy.getIframeBody('id="floormap_iframe"')
      .contains("div", "1A-01RU-SH-U19-FB")
      .parent()
      .parent()
      .parent()
      .parent()
      .find('[title="1A"]')
      .click();
    cy.wait(2000);
  });

  it("Take a snapshot and compare", () => {
    cy.wait(6000);
    cy.getIframeBody('id="floormap_iframe"')
      .find("#container3D")
      .compareSnapshot({ name: "cabinet", testThreshold: 0.05 });
  });
});
