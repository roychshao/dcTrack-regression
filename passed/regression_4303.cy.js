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

const host = Cypress.config("url");

describe("dcTrack front-end testing ", () => {
  beforeEach(() => {
    Cypress.config("defaultCommandTimeout", 10000);
  });

  it("Visit page", () => {
    cy.visit(host);
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

  it("Clone 0000000111111", () => {
    cy.wait(4000);
    cy.getIframeBody('id="models_iframe"')
      .contains("div", "0000000111111")
      .click();
    cy.getIframeBody('id="models_iframe"')
      .find("#modellist")
      .find('[title="Clone selected model"]')
      .click();
  });

  it("Verify the image is cloned correctly", () => {
    cy.wait(8000);
    cy.getIframeBody('id="models_iframe"')
      .find("#modeldetail")
      .find('[title="Save"]')
      .click();
    cy.wait(6000);
    cy.getIframeBody('id="models_iframe"')
      .find("#modeldetail")
      .find('[title="Port Placement and Model Images"]')
      .click();
    cy.wait(4000);
    cy.getIframeBody('id="models_iframe"')
      .find("#image-front")
      .invoke("attr", "back-img")
      .then((path1) => {
        const url1 = "http://192.168.56.105" + path1;
        cy.request(url1).then((res1) => {
          const imgBuffer1 = res1.body;
          const url2 =
            "http://192.168.56.105/images/devices/frontpngimages/30817_F.png";
          cy.request(url2).then((res2) => {
            const imgBuffer2 = res2.body;
            expect(imgBuffer1).to.deep.equal(imgBuffer2);
          });
        });
      });
    cy.getIframeBody('id="models_iframe"')
      .find("#image-back")
      .invoke("attr", "back-img")
      .then((path1) => {
        const url1 = host + path1;
        cy.request(url1).then((res1) => {
          const imgBuffer1 = res1.body;
          const url2 = host + "/images/devices/rearpngimages/30817_R.png";
          cy.request(url2).then((res2) => {
            const imgBuffer2 = res2.body;
            expect(imgBuffer1).to.deep.equal(imgBuffer2);
          });
        });
      });
  });

  it("Delete the clone", () => {
    cy.getIframeBody('id="models_iframe"').find("#modal-btnX").click();
    cy.getIframeBody('id="models_iframe"')
      .find("#modeldetail")
      .find('[title="Delete"]')
      .click();
    cy.getIframeBody('id="models_iframe"').find("#modal-btnOk").click();
  });
});
