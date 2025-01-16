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

  it("Take a snapshot and compare", () => {
    cy.wait(6000);
    cy.getIframeBody('id="floormap_iframe"').contains(
      "div",
      "1A-01RU-SH-U19-FB",
    );
    // zoomin ten times
    for (let i = 0; i < 10; ++i) {
      cy.getIframeBody('id="floormap_iframe"')
        .find("#floormapZoom")
        .find('[title="Zoom In"]')
        .click();
    }
    cy.wait(2000);
    cy.getIframeBody('id="floormap_iframe"')
      .find("#container3D")
      .compareSnapshot({ name: "cabinet-front", testThreshold: 0.05 });
  });

  it("Change view: bottom", () => {
    cy.getIframeBody('id="floormap_iframe"').contains(
      "div",
      "1A-01RU-SH-U19-FB",
    );
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

        cy.wrap(canvas).realMouseDown({ position: "bottom" });
        cy.wrap(canvas).realMouseMove(0, -300, { position: "bottom" });
        cy.wrap(canvas).realMouseUp();
        cy.wait(1000);
      });
  });

  it("Take a snapshot and compare", () => {
    cy.wait(2000);
    cy.getIframeBody('id="floormap_iframe"')
      .find("#container3D")
      .compareSnapshot({ name: "cabinet-bottom", testThreshold: 0.05 });
  });

  it("Change view: left", () => {
    cy.wait(4000);
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
        cy.wrap(canvas).realMouseMove(150, 0, { position: "center" });
        cy.wrap(canvas).realMouseUp();
        cy.wait(1000);
      });
  });

  it("Take a snapshot and compare", () => {
    cy.wait(2000);
    cy.getIframeBody('id="floormap_iframe"')
      .find("#container3D")
      .compareSnapshot({ name: "cabinet-left", testThreshold: 0.05 });
  });

  it("Change view: top", () => {
    cy.wait(4000);
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
        cy.wrap(canvas).realMouseMove(150, 0, { position: "center" });
        cy.wrap(canvas).realMouseUp();
        cy.wait(1000);
      });
  });

  it("Take a snapshot and compare", () => {
    cy.wait(2000);
    cy.getIframeBody('id="floormap_iframe"')
      .find("#container3D")
      .compareSnapshot({ name: "cabinet-top", testThreshold: 0.05 });
  });

  it("Change view: right", () => {
    cy.wait(4000);
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
        cy.wrap(canvas).realMouseMove(150, 0, { position: "center" });
        cy.wrap(canvas).realMouseUp();
        cy.wait(1000);
      });
  });

  it("Take a snapshot and compare", () => {
    cy.wait(2000);
    cy.getIframeBody('id="floormap_iframe"')
      .find("#container3D")
      .compareSnapshot({ name: "cabinet-right", testThreshold: 0.05 });
  });
});
