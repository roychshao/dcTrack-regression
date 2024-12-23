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
      cy.visit('192.168.56.101')
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
      cy.wait(4000)
    })
    
    it('Plan a new Chassis without cabinet installed and try to install it', () => {
      cy.getIframeBody('id="assets_iframe"').find('[title="Add an Item"]').click()
      cy.wait(8000)
      cy.getIframeBody('id="assets_iframe"').find('#cmbModel-btn1').click()
      cy.getIframeBody('id="assets_iframe"').find('#filter_model').click().type('3RU-Chassis{enter}')
      cy.wait(1000)
      cy.getIframeBody('id="assets_iframe"').find('div[class="tab-pane active"]').find('.ui-grid-canvas > div').eq(0).click()
      cy.getIframeBody('id="assets_iframe"').find('#modal-btnClose').click()
      cy.wait(8000)
      cy.getIframeBody('id="assets_iframe"').find('#tiName').click().type('TESTCHASSIS{enter}')
      cy.getIframeBody('id="assets_iframe"').find('#cmbCabinet-selectized').click().type('A01{enter}')
      cy.getIframeBody('id="assets_iframe"').find('#cmbUPosition-selectized').click().type('33{enter}')
      cy.getIframeBody('id="assets_iframe"').find('div[class="tab-pane active"]').find('[title="Save"]').click()
      cy.wait(4000) 
      cy.getIframeBody('id="assets_iframe"').find('div[class="tab-pane active"]').find('[title="Actions"]').click()
      cy.getIframeBody('id="assets_iframe"').find('div[class="tab-pane active"]').find('#dropdown-ACTION_TB > li').as('dropdown')
      cy.get('@dropdown').eq(8).contains('Install Item Request').click()
      cy.getIframeBody('id="assets_iframe"').find('#modal-btnOk').click()
      cy.wait(8000)
      const displayedText = "TESTCHASSIS, Request could not be issued, The field [ U Position ] is mandatory for the Item Status Installed. Please fill in the U Position before submitting request. If request was approved, delete work order and request before editing record. If request was approved, delete work order and request before editing record.\nTESTCHASSIS, Request could not be issued, The field [ Cabinet ] is mandatory for the Item Status Installed. Please fill in the Cabinet before submitting request. If request was approved, delete work order and request before editing record. If request was approved, delete work order and request before editing record.\nTESTCHASSIS, Request could not be issued, The field [ Orientation ] is mandatory for the Item Status Installed. Please fill in the Orientation before submitting request. If request was approved, delete work order and request before editing record. If request was approved, delete work order and request before editing record."
      cy.getIframeBody('id="assets_iframe"').find('#idItemRequestTextArea').should('have.value', displayedText)
      cy.getIframeBody('id="assets_iframe"').find('#modal-btnCancel').click()
    })

    it('Delete the planned chassis', () => {
      cy.getIframeBody('id="assets_iframe"').find('[title="Delete selected items"]').eq(1).click()
      cy.getIframeBody('id="assets_iframe"').find('#modal-btnOk').click()
    })
  })
