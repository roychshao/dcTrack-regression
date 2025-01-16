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

  it("Add an Item", () => {
    cy.wait(4000);
    cy.getIframeBody('id="circuits_iframe"')
      .find("#circuitList")
      .find('[title="Add a Circuit"]')
      .click();
    cy.wait(8000);
    cy.getIframeBody('id="circuits_iframe"')
      .find("#circuit-trace-item-list")
      .contains("div", "1A1")
      .click();
    cy.wait(12000);
    cy.getIframeBody('id="circuits_iframe"')
      .find("#dataPortsGrid")
      .find(".ui-grid-canvas")
      .eq(1)
      .find(".ui-grid-row")
      .eq(1)
      .find('[role="rowheader"]')
      .click(); // A0004
    cy.wait(10000);
    cy.getIframeBody('id="circuits_iframe"')
      .find("#itemsListGrid")
      .contains("div", "DATA-01-01")
      .click(); // DATA-01-01
    cy.wait(4000);
    cy.getIframeBody('id="circuits_iframe"')
      .find("#dataPortsGrid")
      .find(".ui-grid-canvas")
      .eq(1)
      .find(".ui-grid-row")
      .eq(0)
      .find('[role="rowheader"')
      .click(); //P01
    // here will create a circuit with trace:  "Data AF1:A0004"
    cy.wait(2000);
    cy.getIframeBody('id="circuits_iframe"')
      .find("#circuitTraceTb")
      .find('[title="Save"]')
      .click();
    cy.wait(8000);
  });

  it("Connect it and verify the messages", () => {
    cy.getIframeBody('id="circuits_iframe"')
      .find("#circuitTraceTb")
      .find('[title="Actions"]')
      .click();
    cy.getIframeBody('id="circuits_iframe"')
      .find("#circuitTraceTb")
      .find("#dropdown-ACTION_TB > li")
      .as("dropdown");
    cy.get("@dropdown").eq(0).contains("span", "Connect").click();
    cy.getIframeBody('id="circuits_iframe"')
      .find(".dct-dialog-footer")
      .find("button")
      .eq(0)
      .click();
    cy.wait(4000);
    cy.getIframeBody('id="circuits_iframe"')
      .find("#idItemRequestTextArea")
      .should(($t) => {
        const issuedMsg = "Request Issued: Successful.";
        const approvedMsg = "Request Approved: Successful.";
        const woIssuedMsg = "Work Order Issued: Successful.";
        const woCompleteMsg = "Work Order Complete: Successful.";
        const requestCompleteMsg = "Request Complete: Successful.";
        const value = $t.val();
        expect(value).to.include(issuedMsg);
        expect(value).to.include(approvedMsg);
        expect(value).to.include(woIssuedMsg);
        expect(value).to.include(woCompleteMsg);
        expect(value).to.include(requestCompleteMsg);
      });
    cy.getIframeBody('id="circuits_iframe"').find("#modal-btnCancel").click();
  });

  it("Disconnect the circuit", () => {
    cy.getIframeBody('id="circuits_iframe"')
      .find("#inner-scroller > ul")
      .find("li")
      .eq(1)
      .find("button")
      .click();
    cy.wait(2000);
    cy.getIframeBody('id="circuits_iframe"')
      .contains("div", "AF1:A0004 - 1A1:A0004 ~ DATA-01-01:P01")
      .click();
    cy.wait(2000);
    cy.getIframeBody('id="circuits_iframe"')
      .find("#circuitList")
      .find('[title="Actions"]')
      .click();
    cy.getIframeBody('id="circuits_iframe"')
      .find("#circuitList")
      .find("#dropdown-ACTION_TB > li")
      .as("dropdown");
    cy.get("@dropdown").eq(1).contains("span", "Disconnect").click();
    cy.getIframeBody('id="circuits_iframe"')
      .find(".dct-dialog-footer")
      .find("button")
      .eq(0)
      .click();
    cy.wait(4000);
    cy.getIframeBody('id="circuits_iframe"').find("#modal-btnCancel").click();
  });
});
