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
      cy.visit('Cypress.config('url')')
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
      cy.wait(4000)
      cy.get('.menu-toggle').click()
      cy.get('.header-dropdown > li').as('dropdown')
      cy.get('@dropdown').eq(4).find('sun-icon.fa.fa-chevron-right').should('exist').click()
      cy.get('@dropdown').eq(4).contains('Circuits').click()
    })

    it('Select many cirsuits', () => {
      cy.wait(4000)
      cy.getIframeBody('id="circuits_iframe"').find('#filter_tiLocationCode').find('button').click()
      cy.getIframeBody('id="circuits_iframe"').find('#option-1').click()
      cy.getIframeBody('id="circuits_iframe"').find('#filter_tiLocationCode').find('button').click()
      cy.wait(2000)
      cy.getIframeBody('id="circuits_iframe"')
        .contains('div', 'INVERTER_ITEM2:eth02 ~ 2H1:A0373 - AE1:A0373').eq(0).click()
      cy.getIframeBody('id="circuits_iframe"')
        .contains('div', 'DCPLANT_ITEM3:eth01 ~ 4G1:A0721 - AD2:A0721').eq(0).click({ shiftKey: true })
    })

    it('Connect these circuits', () => {
      cy.getIframeBody('id="circuits_iframe"').find('#circuitList').find('[title="Actions"]').click()
      cy.getIframeBody('id="circuits_iframe"').find('#circuitList').find('#dropdown-ACTION_TB > li').as('dropdown')
      cy.get('@dropdown').eq(0).contains('Connect').click()
      cy.wait(8000)
      cy.getIframeBody('id="circuits_iframe"').find('.modal-content').find('.dct-dialog-footer').find('button').eq(0).click()
    })

    it('Verify the dialog content', () => {
      cy.wait(8000)
      const circuit1 = "New Connect Port eth02 on INVERTER_ITEM2. You cannot complete this Work Order because it involves connections to items that have not yet been Installed.The following are the items or their circuits that are not yet Installed: INVERTER_ITEM2.";
      const circuit2 = "New Connect Port eth01 on DCPLANT_ITEM3. You cannot complete this Work Order because it involves connections to items that have not yet been Installed.The following are the items or their circuits that are not yet Installed: DCPLANT_ITEM3."

      // verify error message contained
      cy.getIframeBody('id="circuits_iframe"').find('#idItemRequestTextArea')
        .should(($t) => {
          const value = $t.val();
          expect(value).to.include(circuit1);
          expect(value).to.include(circuit2);
        })

      cy.getIframeBody('id="circuits_iframe"').find('#modal-btnCancel').click()
    })

    it('Visit Change Page', () => {
      cy.wait(4000)
      cy.get('.menu-toggle').click()
      cy.get('.header-dropdown > li').as('dropdown')
      cy.get('@dropdown').eq(5).find('sun-icon.fa.fa-chevron-right').should('exist').click()
      cy.get('@dropdown').eq(5).contains('Requests').click()
    })

    it('Choose the issued requests', () => {
      cy.wait(4000)
      cy.getIframeBody('id="change_iframe"')
        .find('.ui-grid-canvas')
        .children('div').as('row list')
      cy.get('@row list').eq(0).click()
      cy.get('@row list').eq(1).click({ ctrlKey: true })
    })
    
    it('Cancel request', () => {
      cy.getIframeBody('id="change_iframe"').find('[title="Action for selected request."]').click()
      cy.getIframeBody('id="change_iframe"').find('#dropdown-ACTION_TB > li').eq(7).click()
      cy.wait(4000)
      cy.getIframeBody('id="change_iframe"').find('#modal-btnCancel').click()
    })
  })
