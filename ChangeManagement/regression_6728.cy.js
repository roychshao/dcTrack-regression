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

  it("Visit Circuits Page", () => {
    cy.wait(8000);
    cy.get(".menu-toggle").click();
    cy.get(".header-dropdown > li").as("dropdown");
    cy.get("@dropdown")
      .eq(4)
      .find("sun-icon.fa.fa-chevron-right")
      .should("exist")
      .click();
    cy.get("@dropdown").eq(4).contains("Circuits").click();
  });

  it("Filtering", () => {
    cy.getIframeBody('id="circuits_iframe"').find("#filter_cmbStatus").click();
    cy.getIframeBody('id="circuits_iframe"').find("#option-0").click();
    cy.getIframeBody('id="circuits_iframe"').find("#filter_cmbStatus").click();
  });

  it("Edit a connected circuit", () => {
    cy.wait(2000);
    cy.getIframeBody('id="circuits_iframe"')
      .contains("div", "NJESX11:Net2a ~ DATA-01-01:P04")
      .dblclick();
    cy.wait(4000);
    cy.getIframeBody('id="circuits_iframe"')
      .find("#circuitTraceTb")
      .find('[title="Edit"]')
      .click();
    cy.getIframeBody('id="circuits_iframe"')
      .find('[title="RJ45"]')
      .eq(1)
      .click();
    cy.wait(4000);
    cy.getIframeBody('id="circuits_iframe"')
      .find('[aria-label="Row 2, Row Selection Checkbox"]')
      .eq(1)
      .click();
  });

  it("Verify that the action menu should be disabled", () => {
    cy.wait(2000);
    cy.getIframeBody('id="circuits_iframe"')
      .find("#circuitTraceTb")
      .find('[title="Actions"]')
      .should("be.disabled");
  });

  it("Save the modification", () => {
    cy.wait(2000);
    cy.getIframeBody('id="circuits_iframe"')
      .find("#circuitTraceTb")
      .find('[title="Save"]')
      .click();
    cy.getIframeBody('id="circuits_iframe"')
      .find(".dct-dialog-footer")
      .find("button")
      .eq(0)
      .click();
  });

  it("Verify the messages are completed", () => {
    cy.wait(4000);
    cy.getIframeBody('id="circuits_iframe"')
      .find("#idItemRequestTextArea")
      .should(($t) => {
        const value = $t.val();
        const issued = "Request Issued: Successful.";
        const approved = "Request Approved: Successful.";
        const woIssued = "Work Order Issued: Successful.";
        const woComplete = "Work Order Complete: Successful.";
        const requestComplete = "Request Complete: Successful.";
        expect(value).to.include(issued);
        expect(value).to.include(approved);
        expect(value).to.include(woIssued);
        expect(value).to.include(woComplete);
        expect(value).to.include(requestComplete);
      });
    cy.getIframeBody('id="circuits_iframe"').find("#modal-btnCancel").click();
  });

  it("Verify that the action menu should be disabled", () => {
    cy.wait(2000);
    cy.getIframeBody('id="circuits_iframe"')
      .find("#circuitTraceTb")
      .find('[title="Actions"]')
      .should("be.disabled");
  });

  it("Refresh and the action menu should be enabled", () => {
    cy.wait(2000);
    cy.getIframeBody('id="circuits_iframe"')
      .find("#circuitTraceTb")
      .find('[title="Refresh"]')
      .click();
  });

  it("Verify that the action menu should be enabled", () => {
    cy.wait(2000);
    cy.getIframeBody('id="circuits_iframe"')
      .find("#circuitTraceTb")
      .find('[title="Actions"]')
      .should("be.enabled");
  });

  it("Edit back", () => {
    cy.getIframeBody('id="circuits_iframe"')
      .find('[title="RJ45"]')
      .eq(1)
      .click();
    cy.wait(4000);
    cy.getIframeBody('id="circuits_iframe"')
      .find('[aria-label="Row 4, Row Selection Checkbox"]')
      .eq(1)
      .click();
  });

  it("Save the modification", () => {
    cy.wait(2000);
    cy.getIframeBody('id="circuits_iframe"')
      .find("#circuitTraceTb")
      .find('[title="Save"]')
      .click();
    cy.getIframeBody('id="circuits_iframe"')
      .find(".dct-dialog-footer")
      .find("button")
      .eq(0)
      .click();
    cy.wait(4000);
    cy.getIframeBody('id="circuits_iframe"').find("#modal-btnCancel").click();
    cy.wait(8000);
  });
});
