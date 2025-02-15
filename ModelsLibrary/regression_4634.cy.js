// WARN: cannot upload file
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

  it("Try to add front image of 0000000111111", () => {
    const file = "./cypress/fixtures/roger.png";
    cy.wait(4000);
    cy.getIframeBody('id="models_iframe"')
      .contains("div", "0000000111111")
      .dblclick();
    cy.wait(8000);
    cy.getIframeBody('id="models_iframe"')
      .find("#modeldetail")
      .find('[title="Port Placement and Model Images"]')
      .click();
    cy.getIframeBody('id="models_iframe"').find("#modal-btnEdit").click();
    cy.wait(2000);
    cy.getIframeBody('id="models_iframe"')
      .find("#frontImageTb")
      .find('[title="Add"]')
      .click();
    cy.getIframeBody('id="models_iframe"')
      .find("#btnUploadFrontImg")
      .selectFile(file, { force: true })
      .wait(4000);
  });

  it("Verify if the content of the new image is correct", () => {
    const fixtureImagePath = "roger.png";

    cy.getIframeBody('id="models_iframe"')
      .find("#image-front")
      .invoke("attr", "back-img")
      .then((imageURL) => {
        cy.request({
          url: imageURL,
          encoding: "binary",
        }).then((res) => {
          const imageBinary = res.body;
          cy.fixture(fixtureImagePath, "binary").then((fixtureBinary) => {
            expect(imageBinary).to.deep.equal(fixtureBinary);
          });
        });
      });
  });
});
