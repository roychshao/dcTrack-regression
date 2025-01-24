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
        cy.wait(1000);
      });
  });

  it("Enable isolated mode", () => {
    cy.getIframeBody('id="floormap_iframe"')
      .find("#floormap")
      .find(
        '[title="Click to enable this mode. Use left mouse button to drag and select floor object to isolate. This mode can also be enabled by holding down SHIFT key"]',
      )
      .click();
    cy.wait(2000);
    cy.getIframeBody('id="floormap_iframe"')
      .find("#container3D")
      .should("be.visible")
      .then(($canvas) => {
        const canvas = $canvas[0];
        cy.wait(2000);
        // it have to move again
        cy.wrap(canvas).realMouseMove(0, 350, { position: "center" });
        cy.wrap(canvas).realMouseDown();
        cy.wrap(canvas).realMouseUp();
      });
  });

  it("Click nothing and compare snapshot", () => {
    cy.wait(2000);
    cy.getIframeBody('id="floormap_iframe"')
      .find("#container3D")
      .should("be.visible")
      .then(($canvas) => {
        const canvas = $canvas[0];
        cy.wrap(canvas).realMouseMove(-100, 44, { position: "center" });
      });
    cy.wait(4000);
    cy.getIframeBody('id="floormap_iframe"')
      .find("#container3D")
      .compareSnapshot({ name: "before-rotate", testThreshold: 0.05 });
  });

  it("Rotate it", () => {
    cy.wait(2000);
    cy.getIframeBody('id="floormap_iframe"')
      .contains("div", "1B-01RU-SH-U11-FB")
      .parent()
      .parent()
      .parent()
      .parent()
      .find('[title="1B"]')
      .dblclick();
    cy.wait(8000);
    cy.getIframeBody('id="assets_iframe"')
      .find("#itemDetail")
      .find('[title="Edit"]')
      .click();
    cy.getIframeBody('id="assets_iframe"')
      .find('input[type="radio"][value="5021"]')
      .click();
    cy.wait(4000);
    cy.getIframeBody('id="assets_iframe"')
      .find("#itemDetail")
      .find('[title="Save"]')
      .click();
    cy.wait(10000);
    // twice
    cy.getIframeBody('id="assets_iframe"')
      .find('input[type="radio"][value="5021"]')
      .click();
    cy.wait(4000);
    cy.getIframeBody('id="assets_iframe"')
      .find("#itemDetail")
      .find('[title="Save"]')
      .click();
    cy.wait(10000);
  });

  it("Back to Visualization page and refresh it", () => {
    cy.get(".menu-toggle").click();
    cy.get(".header-dropdown > li").as("dropdown");
    cy.get("@dropdown")
      .eq(1)
      .find("sun-icon.fa.fa-chevron-right")
      .should("exist")
      .click();
    cy.get("@dropdown").eq(1).contains(" Floor Maps ").click();
    cy.wait(2000);
    cy.getIframeBody('id="floormap_iframe"')
      .find("#floormap")
      .find('[title="Refresh"]')
      .click();
    cy.wait(10000);
  });

  // Isolate 1B and take another picture
  it("Verify canvas displayed and zoomin", () => {
    cy.getIframeBody('id="floormap_iframe"')
      .find("#left-item-list")
      .find(".ui-grid-viewport")
      .scrollTo("top");
    cy.wait(2000);
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
        cy.wrap(canvas).realMouseDown({ position: "center" });
        cy.wrap(canvas).realMouseUp();
        cy.wrap(canvas).realMouseMove(-168, 29, { position: "center" });
        cy.wait(1000);
      });
  });

  it("Enable isolated mode", () => {
    cy.getIframeBody('id="floormap_iframe"')
      .find("#floormap")
      .find(
        '[title="Click to enable this mode. Use left mouse button to drag and select floor object to isolate. This mode can also be enabled by holding down SHIFT key"]',
      )
      .click();
    cy.wait(2000);
    cy.getIframeBody('id="floormap_iframe"')
      .find("#container3D")
      .should("be.visible")
      .then(($canvas) => {
        const canvas = $canvas[0];
        cy.wait(2000);
        // it have to move again
        cy.wrap(canvas).realMouseMove(0, 350, { position: "center" });
        cy.wrap(canvas).realMouseDown();
        cy.wrap(canvas).realMouseUp();
      });
  });

  it("Click nothing and compare snapshot", () => {
    cy.wait(2000);
    cy.getIframeBody('id="floormap_iframe"')
      .find("#container3D")
      .should("be.visible")
      .then(($canvas) => {
        const canvas = $canvas[0];
        cy.wrap(canvas).realMouseMove(-100, 44, { position: "center" });
      });
    cy.wait(4000);
    cy.getIframeBody('id="floormap_iframe"')
      .find("#container3D")
      .compareSnapshot({ name: "after-rotate", testThreshold: 0.05 });
  });

  it("Rollback rotation", () => {
    cy.wait(2000);
    cy.getIframeBody('id="floormap_iframe"')
      .contains("div", "1B-01RU-SH-U11-FB")
      .parent()
      .parent()
      .parent()
      .parent()
      .find('[title="1B"]')
      .dblclick();
    cy.wait(8000);
    cy.getIframeBody('id="assets_iframe"')
      .find("#itemDetail")
      .find('[title="Edit"]')
      .click();
    cy.getIframeBody('id="assets_iframe"')
      .find('input[type="radio"][value="5024"]')
      .click();
    cy.getIframeBody('id="assets_iframe"')
      .find("#itemDetail")
      .find('[title="Save"]')
      .click();
    cy.wait(10000);
  });
});
