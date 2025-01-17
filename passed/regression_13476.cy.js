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

  it("Add a user: 13476-user1", () => {
    cy.wait(2000);
    cy.contains("button", " Add ").click();
    cy.get('input[formcontrolname="login"]').type("13476-user1");
    cy.get('input[formcontrolname="firstname"]').type("13476");
    cy.get('input[formcontrolname="lastname"]').type("user1");
    cy.get('input[formcontrolname="password"]').type("Selab305!");
    cy.get('input[formcontrolname="passwordConfirm"]').type("Selab305!");
    cy.get('input[formcontrolname="roles"]').click();
    cy.get('sun-option[role="option"]').eq(17).click(); // operator
    cy.get("#save-btn").click();
    cy.wait(4000);
    cy.contains("button", " Cancel").click();
    cy.get("#back-to-list-btn").click();
  });

  it("Add a user: 13476-user2", () => {
    cy.wait(2000);
    cy.contains("button", " Add ").click();
    cy.get('input[formcontrolname="login"]').type("13476-user2");
    cy.get('input[formcontrolname="firstname"]').type("13476");
    cy.get('input[formcontrolname="lastname"]').type("user2");
    cy.get('input[formcontrolname="password"]').type("Selab305!");
    cy.get('input[formcontrolname="passwordConfirm"]').type("Selab305!");
    cy.get('input[formcontrolname="roles"]').click();
    cy.get('sun-option[role="option"]').eq(23).click(); // viewer
    cy.get("#save-btn").click();
    cy.wait(4000);
    cy.contains("button", " Cancel").click();
    cy.get("#back-to-list-btn").click();
  });

  it("Set group: All-User global operator", () => {
    cy.get('a[href="#/settings/groups"]').click();
    cy.contains("a", " All Users").click();
    cy.contains("button", " Edit ").click();
    cy.get('input[formcontrolname="roles"]').click();
    cy.get('sun-option[role="option"]').eq(17).click(); // operator
    cy.get("#saveGroupDetails").click();
    cy.wait(4000);
    cy.contains("button", " Cancel").click();
    cy.contains("button", " Back To List ").click();
  });

  it("Logoff", () => {
    cy.get("#headerToolbar_userAccount").click();
    cy.contains("a", "Logoff").click();
  });

  it("log in with 13476-user1", () => {
    cy.on("fail", (err, runnable) => {
      cy.log("already log in");
      return false;
    });

    cy.get(".login").type("13476-user1");
    cy.get(".password").type("Selab305!");
    cy.contains("Log in").click();
    cy.wait(8000);
    cy.get(".login").type("13476-user1");
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

  it("Verify customFields1 is editable", () => {
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
  });

  it("Logoff", () => {
    cy.get("#headerToolbar_userAccount").click();
    cy.contains("a", "Logoff").click();
  });

  it("log in with 13476-user2", () => {
    cy.on("fail", (err, runnable) => {
      cy.log("already log in");
      return false;
    });

    cy.get(".login").type("13476-user2");
    cy.get(".password").type("Selab305!");
    cy.contains("Log in").click();
    cy.wait(8000);
    cy.get(".login").type("13476-user2");
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

  it("Verify customFields1 is editable", () => {
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

  it("Delete user: 13476-user1 and 13476-user2", () => {
    cy.get("mat-checkbox").eq(1).click();
    cy.get("mat-checkbox").eq(2).click({ ctrlKey: true });
    cy.wait(2000);
    cy.get("#delete-btn").click();
    cy.get(".cdk-overlay-pane").contains("button", " Delete ").click();
    cy.wait(8000);
  });

  it("Rollback  group: All_User", () => {
    cy.get('a[href="#/settings/groups"]').click();
    cy.wait(2000);
    cy.contains("a", " All Users ").click();
    cy.contains("button", " Edit ").click();
    cy.get('input[formcontrolname="roles"]').click();
    cy.get('sun-option[role="option"]').eq(17).click(); // cancel operator
    cy.get("#saveGroupDetails").click();
    cy.wait(4000);
    cy.contains("button", " Cancel").click();
    cy.contains("button", " Back To List ").click();
  });
});
