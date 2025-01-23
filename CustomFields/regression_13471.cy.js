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
    cy.viewport(1100, 1100);
    Cypress.config("defaultCommandTimeout", 60000);
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

  it("Visit assets page", () => {
    cy.wait(10000);
    cy.get(".menu-toggle").click();
    cy.get(".header-dropdown > li").as("dropdown");
    cy.get("@dropdown")
      .eq(3)
      .find("sun-icon.fa.fa-chevron-right")
      .should("exist")
      .click();
    cy.get("@dropdown").eq(3).contains("Items").click();
  });

  it("Make 101 HG-example has value and save it", () => {
    cy.wait(6000);
    cy.getIframeBody('id="assets_iframe"').contains("div", "101").dblclick();
    cy.wait(8000);
    cy.getIframeBody('id="assets_iframe"')
      .find("#itemDetail")
      .find('[title="Edit"]')
      .click();
    cy.getIframeBody('id="assets_iframe"')
      .find("#tiCustomField_HG-example-selectized")
      .click();
    cy.getIframeBody('id="assets_iframe"').find('[data-value="8"]').click();
    cy.getIframeBody('id="assets_iframe"')
      .find("#itemDetail")
      .find('[title="Save"]')
      .click();
    cy.wait(10000);
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

  it("Add a user: 13471-user1", () => {
    cy.wait(2000);
    cy.contains("button", " Add ").click();
    cy.get('input[formcontrolname="login"]').type("13471-user1");
    cy.get('input[formcontrolname="firstname"]').type("13471");
    cy.get('input[formcontrolname="lastname"]').type("user1");
    cy.get('input[formcontrolname="password"]').type("Selab305!");
    cy.get('input[formcontrolname="passwordConfirm"]').type("Selab305!");
    cy.get('input[formcontrolname="roles"]').click();
    cy.get('sun-option[role="option"]').eq(17).click(); // user3 is gloabal operator
    cy.get("#save-btn").click();
    cy.wait(4000);
    cy.contains("button", " Cancel").click();
    cy.get("#back-to-list-btn").click();
  });

  it("Add a user: 13471-user2", () => {
    cy.wait(2000);
    cy.contains("button", " Add ").click();
    cy.get('input[formcontrolname="login"]').type("13471-user2");
    cy.get('input[formcontrolname="firstname"]').type("13471");
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

  it("Add a user: 13471-user3", () => {
    cy.wait(2000);
    cy.contains("button", " Add ").click();
    cy.get('input[formcontrolname="login"]').type("13471-user3");
    cy.get('input[formcontrolname="firstname"]').type("13471");
    cy.get('input[formcontrolname="lastname"]').type("user3");
    cy.get('input[formcontrolname="password"]').type("Selab305!");
    cy.get('input[formcontrolname="passwordConfirm"]').type("Selab305!");
    cy.get('input[formcontrolname="roles"]').click();
    cy.get('sun-option[role="option"]').eq(17).click(); // user2 is global operator
    cy.get("#save-btn").click();
    cy.wait(4000);
    cy.contains("button", " Cancel").click();
    cy.get("#back-to-list-btn").click();
  });

  it("Setting Permissions: CustomField1, user1 has operator, user2 has viewer role and remove the all_user inherit role", () => {
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
    // remove the inherit all_user permission
    cy.getIframeBody('id="fieldmgmt_iframe"')
      .find("#dct-custom-permission")
      .find('[aria-label="Row 1, Row Selection Checkbox"]')
      .click();
    cy.getIframeBody('id="fieldmgmt_iframe"')
      .find("#dct-custom-permission")
      .find('[title="Delete selected permission"]')
      .click();
    // continue
    cy.getIframeBody('id="fieldmgmt_iframe"')
      .find("#dct-custom-permission")
      .find('button[title="Add Permission"]')
      .eq(0)
      .click();
    cy.getIframeBody('id="fieldmgmt_iframe"').find("#user-select").click();
    cy.getIframeBody('id="fieldmgmt_iframe"')
      .contains("span", "13471-user1")
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
      .contains("span", "13471-user2")
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

  it("Visit Dashboard", () => {
    cy.wait(2000);
    cy.get(".menu-toggle").click();
    cy.get(".header-dropdown > li").as("dropdown");
    cy.get("@dropdown").eq(0).click();
  });

  it("Create a SQL grid in custom", () => {
    cy.wait(12000);
    cy.getIframeBody('id="dashboard_iframe"').find("#menu-Custom").click();
    cy.wait(4000);
    cy.getIframeBody('id="dashboard_iframe"').find("#btnAddWidget").click();
    cy.getIframeBody('id="dashboard_iframe"')
      .find("#dropdown-add-widget")
      .contains("a", "Add SQL Grid Widget")
      .click();
    cy.getIframeBody('id="dashboard_iframe"')
      .find("#main_panel")
      .find("#name")
      .clear()
      .type("13471 SQL Grid Widget{enter}");
    cy.getIframeBody('id="dashboard_iframe"')
      .find("#grid_query")
      .type('SELECT * from "dcCustomFields"');
    cy.wait(1000);
    cy.getIframeBody('id="dashboard_iframe"')
      .find("#modal-btnSaveClose")
      .click();
    cy.getIframeBody('id="dashboard_iframe"')
      .find("#page-wrapper")
      .scrollTo("bottom");
    cy.wait(12000); // wait for loading data
  });

  it("Make sure user1, user2 and user3 share the permission", () => {
    cy.getIframeBody('id="dashboard_iframe"')
      .contains("h4", "13471 SQL Grid Widget")
      .trigger("mouseover");
    cy.getIframeBody('id="dashboard_iframe"')
      .contains("h4", "13471 SQL Grid Widget")
      .closest('[content="widget"]')
      .find("#btnUpdateMenu")
      .click();
    cy.getIframeBody('id="dashboard_iframe"')
      .contains("h4", "13471 SQL Grid Widget")
      .closest('[content="widget"]')
      .find("#menuOpenPermission")
      .click();
    cy.getIframeBody('id="dashboard_iframe"')
      .find("#dct-custom-permission")
      .contains("div", "13471-user1");
    cy.getIframeBody('id="dashboard_iframe"')
      .find("#dct-custom-permission")
      .contains("div", "13471-user2");
    cy.getIframeBody('id="dashboard_iframe"')
      .find("#dct-custom-permission")
      .contains("div", "13471-user3");
    cy.getIframeBody('id="dashboard_iframe"').find("#modal-btnClose").click();
  });

  it("Create another SQL grid in custom", () => {
    cy.getIframeBody('id="dashboard_iframe"').find("#btnAddWidget").click();
    cy.getIframeBody('id="dashboard_iframe"')
      .find("#dropdown-add-widget")
      .contains("a", "Add SQL Grid Widget")
      .click();
    cy.getIframeBody('id="dashboard_iframe"')
      .find("#main_panel")
      .find("#name")
      .clear()
      .type("13471 Audit Trail SQL Grid Widget{enter}");
    cy.getIframeBody('id="dashboard_iframe"')
      .find("#grid_query")
      .type('SELECT * from "dcAuditTrail"');
    cy.wait(1000);
    cy.getIframeBody('id="dashboard_iframe"')
      .find("#modal-btnSaveClose")
      .click();
    cy.getIframeBody('id="dashboard_iframe"')
      .find("#page-wrapper")
      .scrollTo("bottom");
    cy.wait(12000); // wait for loading data
  });

  it("Make sure user1, user2 and user3 share the permission", () => {
    cy.getIframeBody('id="dashboard_iframe"')
      .contains("h4", "13471 Audit Trail SQL Grid Widget")
      .trigger("mouseover");
    cy.getIframeBody('id="dashboard_iframe"')
      .contains("h4", "13471 Audit Trail SQL Grid Widget")
      .closest('[content="widget"]')
      .find("#btnUpdateMenu")
      .click();
    cy.getIframeBody('id="dashboard_iframe"')
      .contains("h4", "13471 Audit Trail SQL Grid Widget")
      .closest('[content="widget"]')
      .find("#menuOpenPermission")
      .click();
    cy.getIframeBody('id="dashboard_iframe"')
      .find("#dct-custom-permission")
      .contains("div", "13471-user1");
    cy.getIframeBody('id="dashboard_iframe"')
      .find("#dct-custom-permission")
      .contains("div", "13471-user2");
    cy.getIframeBody('id="dashboard_iframe"')
      .find("#dct-custom-permission")
      .contains("div", "13471-user3");
    cy.getIframeBody('id="dashboard_iframe"').find("#modal-btnClose").click();
  });

  it("Logoff", () => {
    cy.get("#headerToolbar_userAccount").click();
    cy.contains("a", "Logoff").click();
  });

  it("Login with user1", () => {
    cy.on("fail", (err, runnable) => {
      cy.log("already log in");
      return false;
    });

    cy.get(".login").type("13471-user1");
    cy.get(".password").type("Selab305!");
    cy.contains("Log in").click();
    cy.wait(8000);
    cy.get(".login").type("13471-user1");
    cy.get(".password").type("Selab305!");
    cy.contains("Log in").click();
  });

  it("Mazimize the widget", () => {
    cy.wait(12000);
    cy.getIframeBody('id="dashboard_iframe"').find("#menu-Custom").click();
    cy.wait(4000);
    cy.getIframeBody('id="dashboard_iframe"')
      .find("#page-wrapper")
      .scrollTo("bottom");
    cy.getIframeBody('id="dashboard_iframe"')
      .contains("h4", "13471 SQL Grid Widget")
      .trigger("mouseover");
    cy.getIframeBody('id="dashboard_iframe"')
      .contains("h4", "13471 SQL Grid Widget")
      .closest('[content="widget"]')
      .find("#btnUpdateMenu")
      .click();
    cy.getIframeBody('id="dashboard_iframe"')
      .contains("h4", "13471 SQL Grid Widget")
      .closest('[content="widget"]')
      .find("#menuMaximizeWidget")
      .click();
  });

  it("Verify custom field1", () => {
    cy.wait(12000);
    cy.getIframeBody('id="dashboard_iframe"')
      .find("#filter_CustomFieldName")
      .type("HG-example");
    cy.wait(8000);
    cy.getIframeBody('id="dashboard_iframe"')
      .contains("h4", "13471 SQL Grid Widget")
      .closest('[content="widget"]')
      .find(".ui-grid-canvas")
      .eq(3)
      .children()
      .should("not.have.length", 0);
  });

  it("Maximize Audit Trail widget", () => {
    cy.getIframeBody('id="dashboard_iframe"')
      .find("#page-wrapper")
      .scrollTo("bottom");
    cy.getIframeBody('id="dashboard_iframe"')
      .contains("h4", "13471 Audit Trail SQL Grid Widget")
      .trigger("mouseover");
    cy.getIframeBody('id="dashboard_iframe"')
      .contains("h4", "13471 Audit Trail SQL Grid Widget")
      .closest('[content="widget"]')
      .find("#btnUpdateMenu")
      .click();
    cy.getIframeBody('id="dashboard_iframe"')
      .contains("h4", "13471 Audit Trail SQL Grid Widget")
      .closest('[content="widget"]')
      .find("#menuMaximizeWidget")
      .click();
  });

  it("Verify custom field1 and action", () => {
    cy.wait(50000);
    cy.getIframeBody('id="dashboard_iframe"')
      .find("#filter_Field")
      .type("HG-example");
    cy.getIframeBody('id="dashboard_iframe"')
      .find("#filter_Action")
      .type("UPDATE");
    cy.wait(8000);
    cy.getIframeBody('id="dashboard_iframe"')
      .contains("h4", "13471 Audit Trail SQL Grid Widget")
      .closest('[content="widget"]')
      .find(".ui-grid-canvas")
      .eq(3)
      .children()
      .should("not.have.length", 0);
  });

  it("Logoff", () => {
    cy.get("#headerToolbar_userAccount").click();
    cy.contains("a", "Logoff").click();
  });

  it("Login with user2", () => {
    cy.on("fail", (err, runnable) => {
      cy.log("already log in");
      return false;
    });

    cy.get(".login").type("13471-user2");
    cy.get(".password").type("Selab305!");
    cy.contains("Log in").click();
    cy.wait(8000);
    cy.get(".login").type("13471-user2");
    cy.get(".password").type("Selab305!");
    cy.contains("Log in").click();
  });

  it("Visit dashboard", () => {
    cy.wait(12000);
    cy.get(".menu-toggle").click();
    cy.get(".header-dropdown > li").as("dropdown");
    cy.get("@dropdown").eq(0).click();
  });

  it("Mazimize the widget", () => {
    cy.wait(12000);
    cy.getIframeBody('id="dashboard_iframe"').find("#menu-Custom").click();
    cy.wait(4000);
    cy.getIframeBody('id="dashboard_iframe"')
      .find("#page-wrapper")
      .scrollTo("bottom");
    cy.getIframeBody('id="dashboard_iframe"')
      .contains("h4", "13471 SQL Grid Widget")
      .trigger("mouseover");
    cy.getIframeBody('id="dashboard_iframe"')
      .contains("h4", "13471 SQL Grid Widget")
      .closest('[content="widget"]')
      .find("#btnUpdateMenu")
      .click();
    cy.getIframeBody('id="dashboard_iframe"')
      .contains("h4", "13471 SQL Grid Widget")
      .closest('[content="widget"]')
      .find("#menuMaximizeWidget")
      .click();
  });

  it("Verify custom field1", () => {
    cy.wait(12000);
    cy.getIframeBody('id="dashboard_iframe"')
      .find("#filter_CustomFieldName")
      .type("HG-example");
    cy.wait(8000);
    cy.getIframeBody('id="dashboard_iframe"')
      .contains("h4", "13471 SQL Grid Widget")
      .closest('[content="widget"]')
      .find(".ui-grid-canvas")
      .eq(3)
      .children()
      .should("not.have.length", 0);
  });

  it("Maximize Audit Trail widget", () => {
    cy.getIframeBody('id="dashboard_iframe"')
      .find("#page-wrapper")
      .scrollTo("bottom");
    cy.getIframeBody('id="dashboard_iframe"')
      .contains("h4", "13471 Audit Trail SQL Grid Widget")
      .trigger("mouseover");
    cy.getIframeBody('id="dashboard_iframe"')
      .contains("h4", "13471 Audit Trail SQL Grid Widget")
      .closest('[content="widget"]')
      .find("#btnUpdateMenu")
      .click();
    cy.getIframeBody('id="dashboard_iframe"')
      .contains("h4", "13471 Audit Trail SQL Grid Widget")
      .closest('[content="widget"]')
      .find("#menuMaximizeWidget")
      .click();
  });

  it("Verify custom field1 and action", () => {
    cy.wait(50000);
    cy.getIframeBody('id="dashboard_iframe"')
      .find("#filter_Field")
      .type("HG-example");
    cy.getIframeBody('id="dashboard_iframe"')
      .find("#filter_Action")
      .type("UPDATE");
    cy.wait(8000);
    cy.getIframeBody('id="dashboard_iframe"')
      .contains("h4", "13471 Audit Trail SQL Grid Widget")
      .closest('[content="widget"]')
      .find(".ui-grid-canvas")
      .eq(3)
      .children()
      .should("not.have.length", 0);
  });

  it("Logoff", () => {
    cy.get("#headerToolbar_userAccount").click();
    cy.contains("a", "Logoff").click();
  });

  it("Login with user3", () => {
    cy.on("fail", (err, runnable) => {
      cy.log("already log in");
      return false;
    });

    cy.get(".login").type("13471-user3");
    cy.get(".password").type("Selab305!");
    cy.contains("Log in").click();
    cy.wait(8000);
    cy.get(".login").type("13471-user3");
    cy.get(".password").type("Selab305!");
    cy.contains("Log in").click();
  });

  it("Visit dashboard", () => {
    cy.wait(12000);
    cy.get(".menu-toggle").click();
    cy.get(".header-dropdown > li").as("dropdown");
    cy.get("@dropdown").eq(0).click();
  });

  it("Mazimize the widget", () => {
    cy.wait(12000);
    cy.getIframeBody('id="dashboard_iframe"').find("#menu-Custom").click();
    cy.wait(4000);
    cy.getIframeBody('id="dashboard_iframe"')
      .find("#page-wrapper")
      .scrollTo("bottom");
    cy.getIframeBody('id="dashboard_iframe"')
      .contains("h4", "13471 SQL Grid Widget")
      .trigger("mouseover");
    cy.getIframeBody('id="dashboard_iframe"')
      .contains("h4", "13471 SQL Grid Widget")
      .closest('[content="widget"]')
      .find("#btnUpdateMenu")
      .click();
    cy.getIframeBody('id="dashboard_iframe"')
      .contains("h4", "13471 SQL Grid Widget")
      .closest('[content="widget"]')
      .find("#menuMaximizeWidget")
      .click();
  });

  it("Verify custom field1", () => {
    cy.wait(12000);
    cy.getIframeBody('id="dashboard_iframe"')
      .find("#filter_CustomFieldName")
      .type("HG-example");
    cy.wait(8000);
    cy.getIframeBody('id="dashboard_iframe"')
      .contains("h4", "13471 SQL Grid Widget")
      .closest('[content="widget"]')
      .find(".ui-grid-canvas")
      .eq(3)
      .children()
      .should("have.length", 0);
  });

  it("Maximize Audit Trail widget", () => {
    cy.getIframeBody('id="dashboard_iframe"')
      .find("#page-wrapper")
      .scrollTo("bottom");
    cy.getIframeBody('id="dashboard_iframe"')
      .contains("h4", "13471 Audit Trail SQL Grid Widget")
      .trigger("mouseover");
    cy.getIframeBody('id="dashboard_iframe"')
      .contains("h4", "13471 Audit Trail SQL Grid Widget")
      .closest('[content="widget"]')
      .find("#btnUpdateMenu")
      .click();
    cy.getIframeBody('id="dashboard_iframe"')
      .contains("h4", "13471 Audit Trail SQL Grid Widget")
      .closest('[content="widget"]')
      .find("#menuMaximizeWidget")
      .click();
  });

  it("Verify custom field1 and action", () => {
    cy.wait(50000);
    cy.getIframeBody('id="dashboard_iframe"')
      .find("#filter_Field")
      .type("HG-example");
    cy.getIframeBody('id="dashboard_iframe"')
      .find("#filter_Action")
      .type("UPDATE");
    cy.wait(8000);
    cy.getIframeBody('id="dashboard_iframe"')
      .contains("h4", "13471 Audit Trail SQL Grid Widget")
      .closest('[content="widget"]')
      .find(".ui-grid-canvas")
      .eq(3)
      .children()
      .should("have.length", 0);
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

  it("Visit dashboard", () => {
    cy.wait(12000);
    cy.get(".menu-toggle").click();
    cy.get(".header-dropdown > li").as("dropdown");
    cy.get("@dropdown").eq(0).click();
  });

  it("Visit custom dashboard", () => {
    cy.wait(12000);
    cy.getIframeBody('id="dashboard_iframe"').find("#menu-Custom").click();
    cy.getIframeBody('id="dashboard_iframe"')
      .find("#page-wrapper")
      .scrollTo("bottom");
  });

  it("Delete the widgets just created", () => {
    cy.getIframeBody('id="dashboard_iframe"')
      .contains("h4", "13471 SQL Grid Widget")
      .trigger("mouseover");
    cy.getIframeBody('id="dashboard_iframe"')
      .contains("h4", "13471 SQL Grid Widget")
      .closest('[content="widget"]')
      .find("#btnUpdateMenu")
      .click();
    cy.getIframeBody('id="dashboard_iframe"')
      .contains("h4", "13471 SQL Grid Widget")
      .closest('[content="widget"]')
      .find("#menuRemoveWidget")
      .click();
    cy.getIframeBody('id="dashboard_iframe"').find("#modal-btnOk").click();
    cy.getIframeBody('id="dashboard_iframe"')
      .contains("h4", "13471 Audit Trail SQL Grid Widget")
      .trigger("mouseover");
    cy.getIframeBody('id="dashboard_iframe"')
      .contains("h4", "13471 Audit Trail SQL Grid Widget")
      .closest('[content="widget"]')
      .find("#btnUpdateMenu")
      .click();
    cy.getIframeBody('id="dashboard_iframe"')
      .contains("h4", "13471 Audit Trail SQL Grid Widget")
      .closest('[content="widget"]')
      .find("#menuRemoveWidget")
      .click();
    cy.getIframeBody('id="dashboard_iframe"').find("#modal-btnOk").click();
  });

  it("Visit dcTrack Settings Page", () => {
    cy.wait(2000);
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

  it("Delete user: 13471-user1, 13471-user2, 13471-user3", () => {
    cy.get("mat-checkbox").eq(1).click();
    cy.get("mat-checkbox").eq(2).click({ ctrlKey: true });
    cy.get("mat-checkbox").eq(3).click({ ctrlKey: true });
    cy.wait(2000);
    cy.get("#delete-btn").click();
    cy.get(".cdk-overlay-pane").contains("button", " Delete ").click();
    cy.wait(8000);
  });

  it("Visit assets page", () => {
    cy.get(".menu-toggle").click();
    cy.get(".header-dropdown > li").as("dropdown");
    cy.get("@dropdown")
      .eq(3)
      .find("sun-icon.fa.fa-chevron-right")
      .should("exist")
      .click();
    cy.get("@dropdown").eq(3).contains("Items").click();
  });

  it("Rollback 101 HG-example", () => {
    cy.wait(6000);
    cy.getIframeBody('id="assets_iframe"').contains("div", "101").dblclick();
    cy.wait(8000);
    cy.getIframeBody('id="assets_iframe"')
      .find("#itemDetail")
      .find('[title="Edit"]')
      .click();
    cy.getIframeBody('id="assets_iframe"')
      .find("#tiCustomField_HG-example-selectized")
      .type("{backspace}");
    cy.getIframeBody('id="assets_iframe"')
      .find("#itemDetail")
      .find('[title="Save"]')
      .click();
    cy.wait(10000);
  });
});
