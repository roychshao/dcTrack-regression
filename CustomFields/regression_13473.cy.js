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

  it("log in with admin", () => {
    cy.on("fail", (err, runnable) => {
      cy.log("already log in");
      return false;
    });

    cy.get(".login").type("admin");
    cy.get(".password").type("sunbird");
    cy.contains("Log in").click();
  });

  it("Visit dcTrack Settings Page", () => {
    cy.wait(12000);
    cy.get(".menu-toggle").click();
    cy.get(".header-dropdown > li").as("dropdown");
    cy.get("@dropdown")
      .eq(8)
      .find("sun-icon.fa.fa-chevron-right")
      .should("exist")
      .click();
    cy.get("@dropdown").eq(8).contains("dcTrack Settings").click();
  });

  it("Go Authorization & Authentication", () => {
    cy.wait(4000);
    cy.contains("span", " Authorization & Authentication").parent().click();
  });

  it("Add a user: 13473-user3", () => {
    cy.wait(2000);
    cy.contains("button", " Add ").click();
    cy.get('input[formcontrolname="login"]').type("13473-user3");
    cy.get('input[formcontrolname="firstname"]').type("13473");
    cy.get('input[formcontrolname="lastname"]').type("user3");
    cy.get('input[formcontrolname="password"]').type("Selab305!");
    cy.get('input[formcontrolname="passwordConfirm"]').type("Selab305!");
    cy.get("#save-btn").click();
    cy.wait(4000);
    cy.contains("button", " Cancel").click();
    cy.get("#back-to-list-btn").click();
  });

  it("Setting Permissions: global operator on SITE C", () => {
    // Visit location page
    cy.get(".menu-toggle").click();
    cy.get(".header-dropdown > li").as("dropdown");
    cy.get("@dropdown")
      .eq(3)
      .find("sun-icon.fa.fa-chevron-right")
      .should("exist")
      .click();
    cy.get("@dropdown").eq(3).contains("Locations").click();
    cy.wait(12000);
    cy.getIframeBody('id="locations_iframe"').contains("div", "SITE C").click();
    cy.getIframeBody('id="locations_iframe"')
      .find("#locationList")
      .find('[title="Permission"]')
      .click();
    cy.getIframeBody('id="locations_iframe"')
      .find("#permissionsToolbar")
      .find('button[title="Add Permission"]')
      .eq(0)
      .click();
    cy.getIframeBody('id="locations_iframe"').find("#user-select").click();
    cy.getIframeBody('id="locations_iframe"')
      .contains("span", "13473-user3")
      .parent()
      .click();
    cy.getIframeBody('id="locations_iframe"').find("#role-select").click();
    cy.getIframeBody('id="locations_iframe"')
      .contains("span", "Operator")
      .parent()
      .click();
    cy.getIframeBody('id="locations_iframe"').find("#btnAddPerm").click();
    cy.wait(3000);
    cy.getIframeBody('id="locations_iframe"').find("#modal-btnClose").click();
  });

  it("Setting Permissions: some fields in CustomField1", () => {
    cy.get(".menu-toggle").click();
    cy.get(".header-dropdown > li").as("dropdown");
    cy.get("@dropdown")
      .eq(8)
      .find("sun-icon.fa.fa-chevron-right")
      .should("exist")
      .click();
    cy.get("@dropdown").eq(8).contains("Field Management").click();
    cy.wait(6000);
    cy.getIframeBody('id="fieldmgmt_iframe"')
      .find("#fieldmgmt-container")
      .find("ul > li")
      .eq(1)
      .find("a")
      .click();
    cy.wait(15000);
    // WARN: when filtering HG, it is not stable
    cy.getIframeBody('id="fieldmgmt_iframe"').find("#idFilterLabel").type("HG");
    cy.getIframeBody('id="fieldmgmt_iframe"')
      .find('[aria-label="Row 2, Row Selection Checkbox"]')
      .eq(1)
      .click();
    cy.getIframeBody('id="fieldmgmt_iframe"')
      .find('[aria-label="Row 3, Row Selection Checkbox"]')
      .eq(1)
      .click({ ctrlKey: true });
    cy.getIframeBody('id="fieldmgmt_iframe"')
      .find('[aria-label="Row 5, Row Selection Checkbox"]')
      .click({ ctrlKey: true });
    cy.getIframeBody('id="fieldmgmt_iframe"')
      .find('[aria-label="Row 7, Row Selection Checkbox"]')
      .click({ ctrlKey: true });
    cy.getIframeBody('id="fieldmgmt_iframe"')
      .find('[aria-label="Row 8, Row Selection Checkbox"]')
      .click({ ctrlKey: true });
    cy.getIframeBody('id="fieldmgmt_iframe"')
      .find("#custom-fields-toolbar")
      .find('[title="Permissions"]')
      .click();
    cy.getIframeBody('id="fieldmgmt_iframe"')
      .find("#dct-custom-permission")
      .find('button[title="Add Permission"]')
      .eq(0)
      .click();
    cy.getIframeBody('id="fieldmgmt_iframe"').find("#user-select").click();
    cy.getIframeBody('id="fieldmgmt_iframe"')
      .contains("span", "13473-user3")
      .parent()
      .click();
    cy.getIframeBody('id="fieldmgmt_iframe"').find("#role-select").click();
    cy.getIframeBody('id="fieldmgmt_iframe"')
      .contains("span", "Operator")
      .parent()
      .click();
    cy.getIframeBody('id="fieldmgmt_iframe"').find("#btnAddPerm").click();
    cy.wait(3000);
    cy.getIframeBody('id="fieldmgmt_iframe"').find("#modal-btnClose").click();
  });

  it("Logoff", () => {
    cy.get("#headerToolbar_userAccount").click();
    cy.contains("a", "Logoff").click();
  });

  it("log in with 13473-user3", () => {
    cy.on("fail", (err, runnable) => {
      cy.log("already log in");
      return false;
    });

    cy.get(".login").type("13473-user3");
    cy.get(".password").type("Selab305!");
    cy.contains("Log in").click();
    cy.wait(8000);
    cy.get(".login").type("13473-user3");
    cy.get(".password").type("Selab305!");
    cy.contains("Log in").click();
  });

  it("Visit Assets Page", () => {
    cy.wait(14000);
    cy.get(".menu-toggle").click();
    cy.get(".header-dropdown > li").as("dropdown");
    cy.get("@dropdown")
      .eq(3)
      .find("sun-icon.fa.fa-chevron-right")
      .should("exist")
      .click();
    cy.get("@dropdown").eq(3).contains("Items").click();
  });

  it("Verify only SITE C is visible", () => {
    cy.wait(16000);
    cy.getIframeBody('id="assets_iframe"').find("#filter_cmbLocation").click();
    cy.getIframeBody('id="assets_iframe"')
      .find("#option-0")
      .contains("span", "SITE C");
    cy.getIframeBody('id="assets_iframe"')
      .find("#option-1")
      .should("not.exist");
    cy.getIframeBody('id="assets_iframe"')
      .contains("span", "SITE A")
      .should("not.exist");
  });

  it("Try to update customField1 for items in SITE COLO (101) through api", () => {});

  it("Logoff", () => {
    cy.get("#headerToolbar_userAccount").click();
    cy.contains("a", "Logoff").click();
  });

  it("Login with admin", () => {
    cy.on("fail", (err, runnable) => {
      cy.log("already log in");
      return false;
    });

    cy.get(".login").type("admin");
    cy.get(".password").type("sunbird");
    cy.contains("Log in").click();
    cy.wait(8000);
    cy.get(".login").type("admin");
    cy.get(".password").type("sunbird");
    cy.contains("Log in").click();
  });

  it("Visit asset page", () => {});

  it("Verify the customField1 of 101 is not modified", () => {});

  it("Visit dcTrack Settings Page", () => {
    cy.wait(12000);
    cy.get(".menu-toggle").click();
    cy.get(".header-dropdown > li").as("dropdown");
    cy.get("@dropdown")
      .eq(8)
      .find("sun-icon.fa.fa-chevron-right")
      .should("exist")
      .click();
    cy.get("@dropdown").eq(8).contains("dcTrack Settings").click();
  });

  it("Go Authorization & Authentication", () => {
    cy.wait(4000);
    cy.contains("span", " Authorization & Authentication").parent().click();
  });

  it("Delete user: 13473-user3", () => {
    cy.get("mat-checkbox").eq(1).click();
    cy.wait(2000);
    cy.get("#delete-btn").click();
    cy.get(".cdk-overlay-pane").contains("button", " Delete ").click();
    cy.wait(8000);
  });
});
