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

  it("Add a user: 13477-user3", () => {
    cy.wait(2000);
    cy.contains("button", " Add ").click();
    cy.get('input[formcontrolname="login"]').type("13477-user3");
    cy.get('input[formcontrolname="firstname"]').type("13477");
    cy.get('input[formcontrolname="lastname"]').type("user3");
    cy.get('input[formcontrolname="password"]').type("Selab305!");
    cy.get('input[formcontrolname="passwordConfirm"]').type("Selab305!");
    cy.get('input[formcontrolname="roles"]').click();
    cy.get('sun-option[role="option"]').eq(17).click(); // user3 is gloabal operator
    cy.get("#save-btn").click();
    cy.wait(4000);
    cy.contains("button", " Cancel").click();
    cy.get("#back-to-list-btn").click();
  });

  it("Add a user: 13477-user2", () => {
    cy.wait(2000);
    cy.contains("button", " Add ").click();
    cy.get('input[formcontrolname="login"]').type("13477-user2");
    cy.get('input[formcontrolname="firstname"]').type("13477");
    cy.get('input[formcontrolname="lastname"]').type("user2");
    cy.get('input[formcontrolname="password"]').type("Selab305!");
    cy.get('input[formcontrolname="passwordConfirm"]').type("Selab305!");
    cy.get('input[formcontrolname="roles"]').click();
    cy.get('sun-option[role="option"]').eq(23).click(); // user2 is global viewer
    cy.get("#save-btn").click();
    cy.wait(4000);
    cy.contains("button", " Cancel").click();
    cy.get("#back-to-list-btn").click();
  });

  it("Add a group: group3", () => {
    cy.get('a[href="#/settings/groups"]').click();
    cy.wait(2000);
    cy.get("#add-btn").click();
    cy.get('input[formcontrolname="name"]').type("group3");
    cy.get('input[formcontrolname="users"]').click();
    cy.get('sun-option[role="option"]').eq(3).click(); // select user3 (fourth)
    cy.get("#saveGroupDetails").click();
    cy.wait(4000);
    cy.contains("button", " Cancel").click();
    cy.contains("button", " Back To List ").click();
  });

  it("Setting Permissions: CustomField1, user3 has inherit role, remove all_user's inherit role", () => {
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
    // remove all_user's inherit role
    cy.getIframeBody('id="fieldmgmt_iframe"')
      .find("#dct-custom-permission")
      .find('[aria-label="Row 1, Row Selection Checkbox"]')
      .click();
    cy.getIframeBody('id="fieldmgmt_iframe"')
      .find("#dct-custom-permission")
      .find('button[title="Delete selected permission"]')
      .eq(0)
      .click();
    // continue adding permission
    cy.getIframeBody('id="fieldmgmt_iframe"')
      .find("#dct-custom-permission")
      .find('button[title="Add Permission"]')
      .eq(0)
      .click();
    cy.getIframeBody('id="fieldmgmt_iframe"').find("#user-select").click();
    cy.getIframeBody('id="fieldmgmt_iframe"')
      .contains("span", "13477-user3")
      .parent()
      .click();
    cy.getIframeBody('id="fieldmgmt_iframe"').find("#role-select").click();
    cy.getIframeBody('id="fieldmgmt_iframe"')
      .contains("span", "Inherit")
      .parent()
      .click();
    cy.getIframeBody('id="fieldmgmt_iframe"').find("#btnAddPerm").click();
    cy.wait(3000);
    cy.getIframeBody('id="fieldmgmt_iframe"').find("#modal-btnClose").click();
  });

  it("Setting Permissions: CustomField2, group3 has inherit role", () => {
    cy.getIframeBody('id="fieldmgmt_iframe"')
      .find('[aria-label="Row 1, Row Selection Checkbox"]') // customField2: HG-checkbox
      .eq(1)
      .click();
    cy.getIframeBody('id="fieldmgmt_iframe"')
      .find("#custom-fields-toolbar")
      .find('[title="Permissions"]')
      .click();
    // remove all_user's inherit role
    cy.getIframeBody('id="fieldmgmt_iframe"')
      .find("#dct-custom-permission")
      .find('[aria-label="Row 1, Row Selection Checkbox"]')
      .click();
    cy.getIframeBody('id="fieldmgmt_iframe"')
      .find("#dct-custom-permission")
      .find('button[title="Delete selected permission"]')
      .eq(0)
      .click();
    // continue adding permission
    cy.getIframeBody('id="fieldmgmt_iframe"')
      .find("#dct-custom-permission")
      .find('button[title="Add Permission"]')
      .eq(0)
      .click();
    cy.getIframeBody('id="fieldmgmt_iframe"').find("#group").click();
    cy.getIframeBody('id="fieldmgmt_iframe"').find("#user-select").click();
    cy.getIframeBody('id="fieldmgmt_iframe"')
      .contains("span", "group3")
      .parent()
      .click();
    cy.getIframeBody('id="fieldmgmt_iframe"').find("#role-select").click();
    cy.getIframeBody('id="fieldmgmt_iframe"')
      .contains("span", "Inherit")
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

  it("log in with 13477-user3", () => {
    cy.on("fail", (err, runnable) => {
      cy.log("already log in");
      return false;
    });

    cy.get(".login").type("13477-user3");
    cy.get(".password").type("Selab305!");
    cy.contains("Log in").click();
    cy.wait(8000);
    cy.get(".login").type("13477-user3");
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

  it("Verify customFields1 - 3 are editable", () => {
    cy.wait(16000);
    cy.getIframeBody('id="assets_iframe"')
      .contains("div", "48RU-Cabinet GlobalFrame-3A-400")
      .dblclick();
    cy.wait(10000);
    cy.getIframeBody('id="assets_iframe"')
      .find("#itemDetail")
      .find('[title="Edit"]')
      .click();
    cy.wait(4000);
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
  });

  it("Logoff", () => {
    cy.get("#headerToolbar_userAccount").click();
    cy.contains("a", "Logoff").click();
  });

  it("log in with 13477-user2", () => {
    cy.on("fail", (err, runnable) => {
      cy.log("already log in");
      return false;
    });

    cy.get(".login").type("13477-user2");
    cy.get(".password").type("Selab305!");
    cy.contains("Log in").click();
    cy.wait(8000);
    cy.get(".login").type("13477-user2");
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

  it("Verify customFields1 - 3 are hidden, hidden, readonly", () => {
    cy.wait(16000);
    cy.getIframeBody('id="assets_iframe"')
      .contains("div", "48RU-Cabinet GlobalFrame-3A-400")
      .dblclick();
    cy.wait(8000);
    cy.getIframeBody('id="assets_iframe"')
      .find("#tiCustomField_HG-example-selectized")
      .should("not.exist");
    cy.getIframeBody('id="assets_iframe"')
      .find("#tiCustomField_HG-checkbox")
      .should("not.exist");
    cy.getIframeBody('id="assets_iframe"')
      .find("#5034Details")
      .scrollTo("bottom");
    cy.getIframeBody('id="assets_iframe"')
      .find("#tiCustomField_Text-1")
      .should("have.attr", "readonly", "readonly");
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

  it("Delete user: 13477-user2, 13477-user3", () => {
    cy.get("mat-checkbox").eq(1).click();
    cy.get("mat-checkbox").eq(2).click({ ctrlKey: true });
    cy.wait(2000);
    cy.get("#delete-btn").click();
    cy.get(".cdk-overlay-pane").contains("button", " Delete ").click();
    cy.wait(8000);
  });

  it("Delete group3", () => {
    cy.get('a[href="#/settings/groups"]').click();
    cy.wait(2000);
    cy.contains("a", " group3 ").click();
    cy.contains("button", " Delete ").click();
    cy.get(".panel-actions-end").find("button").eq(1).click();
    cy.wait(4000);
  });

  it("Visit HG-example and rollbakc the role of all_users", () => {
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
    // adding permission
    cy.getIframeBody('id="fieldmgmt_iframe"')
      .find("#dct-custom-permission")
      .find('button[title="Add Permission"]')
      .eq(0)
      .click();
    cy.getIframeBody('id="fieldmgmt_iframe"').find("#group").click();
    cy.getIframeBody('id="fieldmgmt_iframe"').find("#user-select").click();
    cy.getIframeBody('id="fieldmgmt_iframe"')
      .contains("span", "all_users")
      .parent()
      .click();
    cy.getIframeBody('id="fieldmgmt_iframe"').find("#role-select").click();
    cy.getIframeBody('id="fieldmgmt_iframe"')
      .contains("span", "Inherit")
      .parent()
      .click();
    cy.getIframeBody('id="fieldmgmt_iframe"').find("#btnAddPerm").click();
    cy.wait(3000);
    cy.getIframeBody('id="fieldmgmt_iframe"').find("#modal-btnClose").click();
  });

  it("Visit HG-checkbox and rollback the role of all_users", () => {
    cy.getIframeBody('id="fieldmgmt_iframe"')
      .find('[aria-label="Row 1, Row Selection Checkbox"]') // customField2: HG-checkbox
      .eq(1)
      .click();
    cy.getIframeBody('id="fieldmgmt_iframe"')
      .find("#custom-fields-toolbar")
      .find('[title="Permissions"]')
      .click();

    // adding permission
    cy.getIframeBody('id="fieldmgmt_iframe"')
      .find("#dct-custom-permission")
      .find('button[title="Add Permission"]')
      .eq(0)
      .click();
    cy.getIframeBody('id="fieldmgmt_iframe"').find("#group").click();
    cy.getIframeBody('id="fieldmgmt_iframe"').find("#user-select").click();
    cy.getIframeBody('id="fieldmgmt_iframe"')
      .contains("span", "all_users")
      .parent()
      .click();
    cy.getIframeBody('id="fieldmgmt_iframe"').find("#role-select").click();
    cy.getIframeBody('id="fieldmgmt_iframe"')
      .contains("span", "Inherit")
      .parent()
      .click();
    cy.getIframeBody('id="fieldmgmt_iframe"').find("#btnAddPerm").click();
    cy.wait(3000);
    cy.getIframeBody('id="fieldmgmt_iframe"').find("#modal-btnClose").click();
  });
});
