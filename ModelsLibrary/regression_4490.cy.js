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
    Cypress.config("defaultCommandTimeout", 5000);
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
    cy.wait(6000);
  });

  // make some change
  it("Visit asset page", () => {
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

  it("Make some change: modify the name of 101 to 101-modified", () => {
    cy.getIframeBody('id="assets_iframe"').contains("div", "101").dblclick();
    cy.wait(6000);
    cy.getIframeBody('id="assets_iframe"').find("#tiName").should("exist");
    cy.getIframeBody('id="assets_iframe"')
      .find("#itemDetail")
      .find('[title="Edit"]')
      .click();
    cy.getIframeBody('id="assets_iframe"')
      .find("#tiName")
      .clear()
      .type("101-modified{enter}");
    cy.getIframeBody('id="assets_iframe"')
      .find("#itemDetail")
      .find('[title="Save"]')
      .click();
    cy.wait(10000);
  });

  it("Go To dcTrack Settings page", () => {
    cy.get(".menu-toggle").click();
    cy.get(".header-dropdown > li").as("dropdown");
    cy.get("@dropdown")
      .eq(8)
      .find("sun-icon.fa.fa-chevron-right")
      .should("exist")
      .click();
    cy.get("@dropdown").eq(8).contains("dcTrack Settings").click();
    cy.wait(2000);
  });

  it("Go To View Data Backups page", () => {
    cy.contains("Appliance Administration").click();
    cy.get('div[class="scrollable ng-star-inserted"]')
      .contains(" Data Backups ")
      .parent()
      .click();
  });

  it("Create back up and wait", () => {
    cy.debug();
    cy.wait(1500);
    cy.contains("button", "Create Backup").click();
    // Wait 10 min
    cy.wait(600000);
  });

  it("Restore back up", () => {
    cy.get(".menu-toggle").click();
    cy.get(".header-dropdown > li").as("dropdown");
    cy.get("@dropdown")
      .eq(8)
      .find("sun-icon.fa.fa-chevron-right")
      .should("exist")
      .click();
    cy.get("@dropdown").eq(8).contains("dcTrack Settings").click();
    cy.wait(6000);
    cy.contains("Appliance Administration").click();
    cy.get('div[class="scrollable ng-star-inserted"]')
      .contains(" Data Backups ")
      .parent()
      .click();
    cy.contains("button", "Restore Backup").click();
    cy.get("appliance-restore-backup-dialog")
      .find("appliance-backup-choice-list")
      .find("sun-table")
      .children("sun-row")
      .eq(0)
      .find("sun-checkbox")
      .click();
    cy.get("appliance-restore-backup-dialog")
      .contains("button", "Restore Backup")
      .click();
    cy.get("appliance-restore-confirm-dialog")
      .contains("button", "Continue")
      .click();
    // Wait 30 minutes
    cy.wait(1800000);
    // ERROR: running backup permanently?
  });

  it("Verify the changes are restored and rollback", () => {
    cy.get(".login").type("admin");
    cy.get(".password").type("sunbird");
    cy.contains("Log in").click();
    cy.wait(10000);
    cy.get(".menu-toggle").click();
    cy.get(".header-dropdown > li").as("dropdown");
    cy.get("@dropdown")
      .eq(3)
      .find("sun-icon.fa.fa-chevron-right")
      .should("exist")
      .click();
    cy.get("@dropdown").eq(3).contains("Items").click();
    cy.getIframeBody('id="assets_iframe"')
      .contains("div", "101-MODIFIED")
      .dblclick();
    cy.wait(6000);
    cy.getIframeBody('id="assets_iframe"').find("#tiName").should("exist");
    cy.getIframeBody('id="assets_iframe"')
      .find("#itemDetail")
      .find('[title="Edit"]')
      .click();
    cy.getIframeBody('id="assets_iframe"')
      .find("#tiName")
      .clear()
      .type("101{enter}");
    cy.getIframeBody('id="assets_iframe"')
      .find("#itemDetail")
      .find('[title="Save"]')
      .click();
    cy.wait(10000);
  });
});
