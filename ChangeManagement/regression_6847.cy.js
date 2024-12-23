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
      cy.visit('192.168.56.103')
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
      cy.wait(12000)
      cy.get('.menu-toggle').click()
      cy.get('.header-dropdown > li').as('dropdown')
      cy.get('@dropdown').eq(3).find('sun-icon.fa.fa-chevron-right').should('exist').click()
      cy.get('@dropdown').eq(3).contains('Items').click()
    })

    it('Create a clone of BL2100 - 3A and install it', () => { 
      cy.wait(8000)
      cy.getIframeBody('id="assets_iframe"').find('#filter_tiSubclass').click()
      cy.getIframeBody('id="assets_iframe"').find('#option-24').click()
      cy.getIframeBody('id="assets_iframe"').find('#filter_tiSubclass').click()
      cy.wait(4000)
      cy.getIframeBody('id="assets_iframe"')
        .contains('div', 'BL2100 - 3A').eq(0).click()
      cy.getIframeBody('id="assets_iframe"').find('#itemList').find('[title="Clone"]').click()
      cy.wait(2000)
      cy.getIframeBody('id="assets_iframe"').find('#modal-btnClone').click()
      cy.wait(8000)
      cy.getIframeBody('id="assets_iframe"')
        .contains('div', 'BL2100 - 3A').eq(0).dblclick()
      cy.wait(8000)
      cy.getIframeBody('id="assets_iframe"').find('#itemDetail').find('[title="Edit"]').click()
      cy.getIframeBody('id="assets_iframe"').find('[uib-tooltip="Planned"]').click()
      cy.getIframeBody('id="assets_iframe"').find('[data-value="5082"]').click()
      cy.wait(8000)
      cy.getIframeBody('id="assets_iframe"').find('#tiName').clear().type('BL2100 - 3A-CLONE{enter}')
      cy.getIframeBody('id="assets_iframe"').find('#cmbLocation').click()
      cy.getIframeBody('id="assets_iframe"').find('#option-1').click()
      cy.getIframeBody('id="assets_iframe"').find('#cmbCabinet-selectized').type('7C{enter}')
      cy.wait(2000)
      cy.getIframeBody('id="assets_iframe"').find('#placement_panel').find('#dndPanel_ > div').eq(2).as('row')
      cy.get('@row').find('input').type('CB500-7C-CHASSIS1{enter}')
      cy.getIframeBody('id="assets_iframe"').find('#cmbSlotPosition-selectized').type('1{enter}')
      cy.wait(8000)
      cy.getIframeBody('id="assets_iframe"').find('#itemDetail').find('[title="Save"]').click()
    })

    it('Archive BL2100 - 3A-CLONE', () => {
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
