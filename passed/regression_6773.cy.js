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

  it("Visit Assets Page", () => {
    cy.wait(8000);
    cy.get(".menu-toggle").click();
    cy.get(".header-dropdown > li").as("dropdown");
    cy.get("@dropdown")
      .eq(3)
      .find("sun-icon.fa.fa-chevron-right")
      .should("exist")
      .click();
    cy.get("@dropdown").eq(3).contains("Items").click();
  });

  var requestTime = "";

  it("Clone A NEW BLADE1 and bring it to off-site", () => {
    cy.wait(8000);
    // filtering
    cy.getIframeBody('id="assets_iframe"').find("#filter_tiSubclass").click();
    cy.getIframeBody('id="assets_iframe"').find("#option-24").click();
    cy.getIframeBody('id="assets_iframe"').find("#filter_tiSubclass").click();
    cy.wait(4000);
    cy.getIframeBody('id="assets_iframe"')
      .contains("div", "A NEW BLADE")
      .should("exist")
      .click();
    cy.getIframeBody('id="assets_iframe"')
      .find("#itemList")
      .find('[title="Clone"]')
      .click();
    cy.getIframeBody('id="assets_iframe"').find('[value="5088"]').click(); // status: Storage
    cy.getIframeBody('id="assets_iframe"').find("#chkIncludeChildren").click();
    cy.wait(2000);
    cy.getIframeBody('id="assets_iframe"').find("#modal-btnClone").click();
    cy.wait(2000);
    cy.getIframeBody('id="assets_iframe"')
      .contains("div", "A NEW BLADE")
      .dblclick();
    cy.wait(4000);
    cy.getIframeBody('id="assets_iframe"')
      .find("#itemDetail")
      .find('[title="Edit"]')
      .click();
    cy.getIframeBody('id="assets_iframe"')
      .find("#tiName")
      .clear()
      .type("A NEW BLADE-CLONE1{enter}");
    cy.getIframeBody('id="assets_iframe"')
      .find("#cmbCabinet-selectized")
      .type("7C{enter}");
    cy.getIframeBody('id="assets_iframe"')
      .find("#cmbChassis")
      .parent()
      .find("input")
      .type("CB500-7C-CHASSIS1{enter}");
    cy.getIframeBody('id="assets_iframe"')
      .find("#cmbSlotPosition-selectized")
      .click()
      .type("1{enter}");
    cy.wait(4000);
    cy.getIframeBody('id="assets_iframe"')
      .find("#itemDetail")
      .find('[title="Save"]')
      .click();
    cy.wait(10000);
    cy.getIframeBody('id="assets_iframe"')
      .find("#itemDetail")
      .find('[title="Actions"]')
      .click();
    cy.getIframeBody('id="assets_iframe"')
      .find("#itemDetail")
      .find("#dropdown-ACTION_TB > li")
      .as("dropdown");
    cy.get("@dropdown")
      .eq(1)
      .find("span", "Take Item Off-site Request")
      .click();
    cy.wait(2000);
    cy.getIframeBody('id="assets_iframe"').find("#modal-btnOk").click();
    requestTime = new Date();
    console.log(requestTime);
    cy.wait(6000);
    cy.getIframeBody('id="assets_iframe"').find("#modal-btnCancel").click();
  });

  it("Visit Change page", () => {
    cy.get(".menu-toggle").click();
    cy.get(".header-dropdown > li").as("dropdown");
    cy.get("@dropdown")
      .eq(5)
      .find("sun-icon.fa.fa-chevron-right")
      .should("exist")
      .click();
    cy.get("@dropdown").eq(5).contains("Requests").click();
  });

  const formatDate = (date) => {
    let month = date.getMonth() + 1;
    let day = date.getDate();
    let year = date.getFullYear();
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let seconds = date.getSeconds();
    let ampm = hours >= 12 ? "PM" : "AM";

    hours = hours % 12;
    hours = hours ? hours : 12;
    // rounding minutes
    if (seconds >= 30) {
      minutes += 1;
    }
    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = "00"; // ignore seconds

    return `${month}/${day}/${year} ${hours}:${minutes}:${seconds} ${ampm}`;
  };

  it("Verify the date and time is logged and correct", () => {
    cy.wait(2000);
    cy.getIframeBody('id="change_iframe"')
      .find("#requests")
      .find('[title="Refresh"]')
      .click();
    cy.wait(4000);
    cy.getIframeBody('id="change_iframe"')
      .find(".ui-grid-viewport")
      .eq(1)
      .find(".ui-grid-canvas > div")
      .eq(0)
      .contains("div", formatDate(requestTime));
  });

  it("Visit Assets Page again", () => {
    cy.wait(8000);
    cy.get(".menu-toggle").click();
    cy.get(".header-dropdown > li").as("dropdown");
    cy.get("@dropdown")
      .eq(3)
      .find("sun-icon.fa.fa-chevron-right")
      .should("exist")
      .click();
    cy.get("@dropdown").eq(3).contains("Items").click();
  });

  it("Remove the clone1 blades", () => {
    cy.wait(2000);
    cy.getIframeBody('id="assets_iframe"')
      .find("#cmbStatus-selectized")
      .parent()
      .dblclick();
    cy.getIframeBody('id="assets_iframe"').find('[data-value="5085"]').click();
    cy.getIframeBody('id="assets_iframe"')
      .find("#itemDetail")
      .find('[title="Save"]')
      .click();
    cy.wait(8000);
    cy.getIframeBody('id="assets_iframe"')
      .find("#itemDetail")
      .find('[title="Delete selected items"]')
      .click();
    cy.getIframeBody('id="assets_iframe"').find("#modal-btnOk").click();
  });
});
