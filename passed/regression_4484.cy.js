describe("dcTrack system testing ", () => {
  beforeEach(() => {
    Cypress.config("defaultCommandTimeout", 10000);
  });

  it("Verify folder and images are in the connectors path", () => {
    var url = Cypress.config("url").replace(/^https?:\/\//, "");
    const sshCommand = `sshpass -p 'rNTUTstudent1!' ssh -T -o StrictHostKeyChecking=no root@${url} 'pwd && cd /var/oculan/model_lib/images/connectors && pwd && ls'`;
    cy.exec(sshCommand).then((result) => {
      if (result.code !== 0) {
        throw new Error("ssh failed");
      }
      expect(result.stdout).to.include("png");
    });
  });

  it("Verify folder and images are in the deviced path", () => {
    var url = Cypress.config("url").replace(/^https?:\/\//, "");
    const sshCommand = `sshpass -p 'rNTUTstudent1!' ssh -T -o StrictHostKeyChecking=no root@${url} 'pwd && cd /var/oculan/model_lib/images/devices && pwd && ls'`;
    cy.exec(sshCommand).then((result) => {
      if (result.code !== 0) {
        throw new Error("ssh failed");
      }
      expect(result.stdout).to.include("png");
    });
  });
});
