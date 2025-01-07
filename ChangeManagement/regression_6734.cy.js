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

    it('Visit Circuits Page', () => {
      cy.wait(8000)
      cy.get('.menu-toggle').click()
      cy.get('.header-dropdown > li').as('dropdown')
      cy.get('@dropdown').eq(4).find('sun-icon.fa.fa-chevron-right').should('exist').click()
      cy.get('@dropdown').eq(4).contains('Circuits').click()
    })
 
    it('Choose a circuit', () => {
      cy.wait(4000)
      cy.getIframeBody('id="circuits_iframe"')
        .find('.ui-grid-canvas').eq(1).find('.ui-grid-row').eq(0).click()
    })
    
    it('Connect it', () => {
      cy.getIframeBody('id="circuits_iframe"').find('#circuitList').find('[title="Actions"]').click()
      cy.getIframeBody('id="circuits_iframe"').find('#dropdown-ACTION_TB > li').as('dropdown')
      cy.get('@dropdown').eq(0).contains('Connect').click()
      cy.getIframeBody('id="circuits_iframe"').find('.dct-dialog-footer').find('button').eq(0).click()
    })

    it('Verify error message', () => {
      cy.wait(4000)
      
      const errMsg1 = "DCPLANTITEM,DCFAP_ITEM1,DEVICEDC,DCPLANTPANEL,DCPANEL, Request failed, ";
      const errMsg2 = "You cannot complete this Work Order because it involves connections to items that have not yet been Installed."

      // verify error message contained
      cy.getIframeBody('id="circuits_iframe"').find('#idItemRequestTextArea')
        .should(($t) => {
          const value = $t.val();
          expect(value).to.include(errMsg1);
          expect(value).to.include(errMsg2);
        })
      
      cy.getIframeBody('id="circuits_iframe"').find('#modal-btnCancel').click()
    })
    
    it('Visit Change Page', () => {
      cy.get('.menu-toggle').click()
      cy.get('.header-dropdown > li').as('dropdown')
      cy.get('@dropdown').eq(5).find('sun-icon.fa.fa-chevron-right').should('exist').click()
      cy.get('@dropdown').eq(5).contains('Requests').click()
    })

    it('Check the stage of the request and cancel it', () => {
      cy.getIframeBody('id="change_iframe"').find('.ui-grid-canvas > div').eq(0).dblclick()
      cy.getIframeBody('id="change_iframe"').find('#cmbRequestStage').should('have.value', 'Request Issued')
      cy.wait(2000)
      cy.getIframeBody('id="change_iframe"').find('div[class="tab-pane active"]').eq(0).find('[title="Actions for this request."]').click()
      cy.getIframeBody('id="change_iframe"').find('#menuCancelRequest').click()
      cy.wait(4000)
      cy.getIframeBody('id="change_iframe"').find('#modal-btnCancel').click()
    })
  })
