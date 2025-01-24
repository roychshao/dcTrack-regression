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
    cy.wait(4000);
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

  it("Mouseover on Item cabinet 1B", () => {
    cy.getIframeBody('id="floormap_iframe"')
      .find("#container3D")
      .should("be.visible")
      .then(($canvas) => {
        const canvas = $canvas[0];

        // For easier to verify the mouse moves
        canvas.addEventListener("mousedown", (event) => {
          console.log(
            `Mousedown position: (${event.clientX}, ${event.clientY})`,
          );
        });

        canvas.addEventListener("mousemove", (event) => {
          console.log(
            `Mousemove position: (${event.clientX}, ${event.clientY})`,
          );
        });

        cy.wrap(canvas).realMouseDown({ position: "center" });
        cy.wrap(canvas).realMouseUp();
        cy.wrap(canvas).realMouseMove(-168, 29, { position: "center" });
        cy.wrap(canvas).realMouseDown();
        cy.wrap(canvas).realMouseUp();
        cy.wait(1000);
      });
  });

  it("Take a snapshot and compare", () => {
    cy.wait(4000);
    cy.getIframeBody('id="floormap_iframe"')
      .find("#container3D")
      .compareSnapshot({ name: "drawing", testThreshold: 0.05 });
  });

  it("Click 1B on item list", () => {
    cy.wait(4000);
    cy.getIframeBody('id="floormap_iframe"')
      .contains("div", "1B-01RU-SH-U11-FB")
      .parent()
      .parent()
      .parent()
      .parent()
      .find('[title="1B"]')
      .click();
    cy.wait(2000);
    cy.getIframeBody('id="floormap_iframe"')
      .contains("div", "1B-01RU-SH-U11-FB")
      .parent()
      .parent()
      .parent()
      .parent()
      .find('[title="1B"]')
      .click();
    cy.wait(2000);
  });

  it("Take a snapshot and compare", () => {
    cy.wait(4000);
    cy.getIframeBody('id="floormap_iframe"')
      .find("#container3D")
      .compareSnapshot({ name: "itemlist", testThreshold: 0.05 });
  });

  it("Report mode", () => {
    cy.getIframeBody('id="floormap_iframe"')
      .find("#floormap")
      .find('[title="Select up to 5 reports to correlate their data"]')
      .click();
    cy.getIframeBody('id="floormap_iframe"').find("#option-0").click();
    cy.wait(2000);
    cy.getIframeBody('id="floormap_iframe"')
      .find("#report-grid")
      .contains("div", "1C")
      .click();
    cy.wait(2000);
    cy.getIframeBody('id="floormap_iframe"')
      .find("#report-grid")
      .contains("div", "1C")
      .click();
    cy.wait(4000);
    cy.getIframeBody('id="floormap_iframe"')
      .find("#container3D")
      .compareSnapshot({ name: "report-list", testThreshold: 0.05 });
  });
});
