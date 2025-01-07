Cypress.Commands.add('getIframeBody', (attribute) => {
    // get the iframe > document > body
    // and retry until the body element is not empty
    return cy
    .get('iframe[' + attribute + ']')
    .its('0.contentDocument.body').should('not.be.empty')
    // wraps "body" DOM element to allow
    // chaining more Cypress commands, like ".find(...)"
    // https://on.cypress.io/wrap
    .then(cy.wrap)
  })

  describe('dcTrack front-end testing ', () => {
    beforeEach(() => {
      Cypress.config('defaultCommandTimeout', 10000);
    })

    it('Visit page', () => {
      cy.visit('192.168.56.105')
    })

    it('log in', () => {
      cy.on('fail', (err, runnable) => {
        cy.log('already log in')
        return false
      })

      cy.get('.login').type('admin')
      cy.get('.password').type('sunbird')
      cy.contains('Log in').click()
    })

    it('Visit Assets Page', () => {
      cy.wait(8000)
      cy.get('.menu-toggle').click()
      cy.get('.header-dropdown > li').as('dropdown')
      cy.get('@dropdown').eq(3).find('sun-icon.fa.fa-chevron-right').should('exist').click()
      cy.get('@dropdown').eq(3).contains('Items').click()
    })

    it('Create a clone of 101 and install it', () => { 
      cy.wait(8000)
      cy.getIframeBody('id="assets_iframe"')
        .contains('div', '48RU-Cabinet GlobalFrame-3A-400').eq(0).click()
      cy.getIframeBody('id="assets_iframe"').find('#itemList').find('[title="Clone"]').click()
      cy.wait(2000)
      cy.getIframeBody('id="assets_iframe"').find('#modal-btnClone').click()
      cy.wait(8000)
      cy.getIframeBody('id="assets_iframe"')
        .contains('div', '48RU-Cabinet GlobalFrame-3A-400').eq(0).dblclick()
      cy.wait(8000)
      cy.getIframeBody('id="assets_iframe"').find('#itemDetail').find('[title="Edit"]').click()
      cy.getIframeBody('id="assets_iframe"').find('[uib-tooltip="Planned"]').click()
      cy.getIframeBody('id="assets_iframe"').find('[data-value="5082"]').click()
      cy.wait(8000)
      cy.getIframeBody('id="assets_iframe"').find('#tiName').clear().type('101-CLONE{enter}')
      cy.getIframeBody('id="assets_iframe"').find('#cmbRowLabel-selectized').type('01{enter}')
      cy.getIframeBody('id="assets_iframe"').find('#itemDetail').find('[title="Save"]').click()
    })

    it('Archive 101-CLONE', () => {
      cy.wait(8000)
      cy.getIframeBody('id="assets_iframe"').find('#itemDetail').find('[title="Actions"]').click()
      cy.wait(2000)
      cy.getIframeBody('id="assets_iframe"').find('#itemDetail').find('#dropdown-ACTION_TB > li').as('dropdown')
      cy.get('@dropdown').eq(6).contains('Decommission Item to Archive Request').click() 
      cy.wait(2000)
      cy.getIframeBody('id="assets_iframe"').find('#modal-btnOk').click()
    })

    it('Verify the messages indicates completed', () => {
      const issuedMsg = "Request Issued: Successful.";
      const approvedMsg = "Request Approved: Successful."
      const workOrderIssuedMsg = "Work Order Issued: Successful."
      const workOrderCompleteMsg = "Work Order Complete: Successful."
      const requestCompleteMsg = "Request Complete: Successful."
      // verify error message contained
      cy.getIframeBody('id="assets_iframe"').find('#idItemRequestTextArea')
        .should(($t) => {
          const value = $t.val();
          expect(value).to.include(issuedMsg);
          expect(value).to.include(approvedMsg);
          expect(value).to.include(workOrderIssuedMsg);
          expect(value).to.include(workOrderCompleteMsg);
          expect(value).to.include(requestCompleteMsg);
        })
      
      cy.getIframeBody('id="assets_iframe"').find('#modal-btnCancel').click()
    })

    it('Remove this cloned item', () => {
      cy.wait(4000)
      cy.getIframeBody('id="assets_iframe"').find('#itemDetail').find('[title="Refresh"]').click()
      cy.wait(8000)
      cy.getIframeBody('id="assets_iframe"').find('#itemDetail').find('[title="Delete selected items"]').click()
      cy.getIframeBody('id="assets_iframe"').find('#modal-btnOk').click()
    })
  })
