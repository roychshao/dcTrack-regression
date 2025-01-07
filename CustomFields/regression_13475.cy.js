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
    cy.visit("192.168.56.105");
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

  it("Add a user: 13475-user1", () => {
    cy.wait(2000);
    cy.contains("button", " Add ").click();
    cy.get('input[formcontrolname="login"]').type("13475-user1");
    cy.get('input[formcontrolname="firstname"]').type("13475");
    cy.get('input[formcontrolname="lastname"]').type("user1");
    cy.get('input[formcontrolname="password"]').type("Selab305!");
    cy.get('input[formcontrolname="passwordConfirm"]').type("Selab305!");
    cy.get('input[formcontrolname="roles"]').click();
    cy.get('sun-option[role="option"]').eq(17).click();
    cy.get("#save-btn").click();
    cy.wait(4000);
    cy.contains("button", " Cancel").click();
    cy.get("#back-to-list-btn").click();
  });

  it("Add a group: group1", () => {
    cy.get('a[href="#/settings/groups"]').click();
    cy.wait(2000);
    cy.get("#add-btn").click();
    cy.get('input[formcontrolname="name"]').type("group1");
    cy.get('input[formcontrolname="users"]').click();
    cy.get('sun-option[role="option"]').eq(2).click();
    cy.get("#saveGroupDetails").click();
    cy.wait(4000);
    cy.contains("button", " Cancel").click();
    cy.contains("button", " Back To List ").click();
  });

  it("Setting Permissions: CustomField1, user has operator and viewer role", () => {
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
    cy.wait(10000);
    // WARN: when filtering HG, it is not stable
    cy.getIframeBody('id="fieldmgmt_iframe"').find("#idFilterLabel").type("HG");
    cy.getIframeBody('id="fieldmgmt_iframe"')
      .find('[aria-label="Row 3, Row Selection Checkbox"]') // customField1: HG-example
      .eq(1)
      .click();
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
      .contains("span", "13475-user1")
      .parent()
      .click();
    cy.getIframeBody('id="fieldmgmt_iframe"').find("#role-select").click();
    cy.getIframeBody('id="fieldmgmt_iframe"')
      .contains("span", "Operator")
      .parent()
      .click();
    cy.getIframeBody('id="fieldmgmt_iframe"').find("#btnAddPerm").click();
    cy.wait(3000);
    cy.getIframeBody('id="fieldmgmt_iframe"').find("#user-select").click();
    cy.getIframeBody('id="fieldmgmt_iframe"')
      .contains("span", "13475-user1")
      .parent()
      .click();
    cy.getIframeBody('id="fieldmgmt_iframe"').find("#role-select").click();
    cy.getIframeBody('id="fieldmgmt_iframe"')
      .contains("span", "Viewer")
      .parent()
      .click();
    cy.getIframeBody('id="fieldmgmt_iframe"').find("#btnAddPerm").click();
    cy.wait(3000);
    cy.getIframeBody('id="fieldmgmt_iframe"').find("#modal-btnClose").click();
  });

  it("Setting Permissions: CustomField2, group1 has operator", () => {
    cy.getIframeBody('id="fieldmgmt_iframe"')
      .find('[aria-label="Row 1, Row Selection Checkbox"]') // customField2: HG-checkbox
      .eq(1)
      .click();
    cy.getIframeBody('id="fieldmgmt_iframe"')
      .find("#custom-fields-toolbar")
      .find('[title="Permissions"]')
      .click();
    cy.getIframeBody('id="fieldmgmt_iframe"')
      .find("#dct-custom-permission")
      .find('button[title="Add Permission"]')
      .eq(0)
      .click();
    cy.getIframeBody('id="fieldmgmt_iframe"').find("#group").click();
    cy.getIframeBody('id="fieldmgmt_iframe"').find("#user-select").click();
    cy.getIframeBody('id="fieldmgmt_iframe"')
      .contains("span", "group1")
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

  it("Setting Permissions: CustomField3, user has operator and group1 has viewer", () => {
    cy.getIframeBody('id="fieldmgmt_iframe"')
      .find("#idFilterLabel")
      .clear()
      .type("Text-1");
    cy.getIframeBody('id="fieldmgmt_iframe"')
      .find('[aria-label="Row 1, Row Selection Checkbox"]') // customField3: Text-1
      .eq(1)
      .click();
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
      .contains("span", "13475-user1")
      .parent()
      .click();
    cy.getIframeBody('id="fieldmgmt_iframe"').find("#role-select").click();
    cy.getIframeBody('id="fieldmgmt_iframe"')
      .contains("span", "Operator")
      .parent()
      .click();
    cy.getIframeBody('id="fieldmgmt_iframe"').find("#btnAddPerm").click();
    cy.wait(3000);
    cy.getIframeBody('id="fieldmgmt_iframe"').find("#group").click();
    cy.getIframeBody('id="fieldmgmt_iframe"').find("#user-select").click();
    cy.getIframeBody('id="fieldmgmt_iframe"')
      .contains("span", "group1")
      .parent()
      .click();
    cy.getIframeBody('id="fieldmgmt_iframe"').find("#role-select").click();
    cy.getIframeBody('id="fieldmgmt_iframe"')
      .contains("span", "Viewer")
      .parent()
      .click();
    cy.getIframeBody('id="fieldmgmt_iframe"').find("#btnAddPerm").click();
    cy.wait(3000);
    cy.getIframeBody('id="fieldmgmt_iframe"').find("#modal-btnClose").click();
  });

  it("Setting Permissions: CustomField4, user has operator and group1 has viewer", () => {
    cy.getIframeBody('id="fieldmgmt_iframe"')
      .find("#idFilterLabel")
      .clear()
      .type("Text Area-2");
    cy.getIframeBody('id="fieldmgmt_iframe"')
      .find('[aria-label="Row 1, Row Selection Checkbox"]') // customField3: Text-1
      .eq(1)
      .click();
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
      .contains("span", "13475-user1")
      .parent()
      .click();
    cy.getIframeBody('id="fieldmgmt_iframe"').find("#role-select").click();
    cy.getIframeBody('id="fieldmgmt_iframe"')
      .contains("span", "Viewer")
      .parent()
      .click();
    cy.getIframeBody('id="fieldmgmt_iframe"').find("#btnAddPerm").click();
    cy.wait(3000);
    cy.getIframeBody('id="fieldmgmt_iframe"').find("#group").click();
    cy.getIframeBody('id="fieldmgmt_iframe"').find("#user-select").click();
    cy.getIframeBody('id="fieldmgmt_iframe"')
      .contains("span", "group1")
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

  it("log in with 13475-user1", () => {
    cy.on("fail", (err, runnable) => {
      cy.log("already log in");
      return false;
    });

    cy.get(".login").type("13475-user1");
    cy.get(".password").type("Selab305!");
    cy.contains("Log in").click();
    cy.wait(8000);
    cy.get(".login").type("13475-user1");
    cy.get(".password").type("Selab305!");
    cy.contains("Log in").click();
  });

  it("Visit Assets Page", () => {
    cy.wait(16000);
    cy.get(".menu-toggle").click();
    cy.get(".header-dropdown > li").as("dropdown");
    cy.get("@dropdown")
      .eq(3)
      .find("sun-icon.fa.fa-chevron-right")
      .should("exist")
      .click();
    cy.get("@dropdown").eq(3).contains("Items").click();
  });

  it("Verify customFields1 - 4 are editable", () => {
    cy.wait(16000);
    cy.getIframeBody('id="assets_iframe"')
      .contains("div", "48RU-Cabinet GlobalFrame-3A-400")
      .dblclick();
    cy.wait(8000);
    cy.getIframeBody('id="assets_iframe"')
      .find("#itemDetail")
      .find('[title="Edit"]')
      .click();
    cy.getIframeBody('id="assets_iframe"')
      .find("#tiCustomField_HG-example-selectized")
      .should("not.have.attr", "readonly", "readonly");
    cy.getIframeBody('id="assets_iframe"')
      .find("#tiCustomField_HG-checkbox")
      .should("not.have.attr", "readonly", "readonly");
    cy.getIframeBody('id="assets_iframe"')
      .find("#5034Details")
      .scrollTo("bottom");
    cy.getIframeBody('id="assets_iframe"')
      .find("#tiCustomField_Text-1")
      .should("not.have.attr", "readonly", "readonly");
    cy.getIframeBody('id="assets_iframe"')
      .find('[id="tiCustomField_Text Area-2"]')
      .should("not.have.attr", "readonly", "readonly");
  });

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

  it("Delete user: 13475-user1", () => {
    cy.get("mat-checkbox").eq(1).click();
    cy.wait(2000);
    cy.get("#delete-btn").click();
    cy.get(".cdk-overlay-pane").contains("button", " Delete ").click();
    cy.wait(8000);
  });

  it("Delete group1", () => {
    cy.get('a[href="#/settings/groups"]').click();
    cy.wait(2000);
    cy.contains("a", " group1 ").click();
    cy.contains("button", " Delete ").click();
    cy.get(".panel-actions-end").find("button").eq(1).click();
    cy.wait(4000);
  });
});
