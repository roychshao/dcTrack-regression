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

    it('Visit Circuits Page', () => {
      cy.wait(2000)
      cy.get('.menu-toggle').click()
      cy.get('.header-dropdown > li').as('dropdown')
      cy.get('@dropdown').eq(4).find('sun-icon.fa.fa-chevron-right').should('exist').click()
      cy.get('@dropdown').eq(4).contains('Circuits').click()
    })

    it('Turn off RB', () => {
      cy.wait(4000)
      cy.getIframeBody('id="circuits_iframe"').find('#circuitList').find('[title="Actions"]').click()
      cy.getIframeBody('id="circuits_iframe"').find('#circuitList').find('#dropdown-ACTION_TB > li').as('dropdown')
      cy.get('@dropdown').eq(3).contains('Turn On Request Bypass').click()
    })
    
    // Test on a disconnect circuit
    it('choose a disconnect circuit', () => {
      cy.getIframeBody('id="circuits_iframe"')
        .contains('div', 'DEVICEDC:PS1 ~ DCFAP_ITEM1:Outlet 1 - DCFAP_ITEM1:Inlet 1 ~ DCPANEL:2,3 - DCPANEL:DC Panel Inlet - DCPLANTPANEL:4,5 - DCPLANTPANEL:Plant Panel Inlet - DCPLANTITEM:Plant Busbar').eq(0).click()
      cy.getIframeBody('id="circuits_iframe"').find('#circuitList').find('[title="Actions"]').click()
      cy.getIframeBody('id="circuits_iframe"').find('#circuitList').find('#dropdown-ACTION_TB > li').as('dropdown')
      cy.get('@dropdown').eq(0).contains('Connect').click()
      cy.getIframeBody('id="circuits_iframe"').find('.dct-dialog-footer > button').eq(0).click()
      cy.getIframeBody('id="circuits_iframe"').find('#modal-btnCancel').click()
    })

    it('Visit Change Page', () => {
      cy.get('.menu-toggle').click()
      cy.get('.header-dropdown > li').as('dropdown')
      cy.get('@dropdown').eq(5).find('sun-icon.fa.fa-chevron-right').should('exist').click()
      cy.get('@dropdown').eq(5).contains('Requests').click()
    })

    it('Choose the first (latest) request and verify its stage (Issued)', () => {
      cy.wait(4000)
      cy.getIframeBody('id="change_iframe"').find('#requests').find('[title="Refresh"]').click()
      cy.wait(2000)
      cy.getIframeBody('id="change_iframe"').find('.ui-grid-canvas > div').eq(0).dblclick()
      cy.getIframeBody('id="change_iframe"').find('#cmbRequestStage').should('have.value', 'Request Issued');
    })

    it('Visit Circuits Page', () => {
      cy.wait(2000)
      cy.get('.menu-toggle').click()
      cy.get('.header-dropdown > li').as('dropdown')
      cy.get('@dropdown').eq(4).find('sun-icon.fa.fa-chevron-right').should('exist').click()
      cy.get('@dropdown').eq(4).contains('Circuits').click()
    })

    it('Reissue the connect request for the same circuit', () => {
      cy.getIframeBody('id="circuits_iframe"')
        .contains('div', 'DEVICEDC:PS1 ~ DCFAP_ITEM1:Outlet 1 - DCFAP_ITEM1:Inlet 1 ~ DCPANEL:2,3 - DCPANEL:DC Panel Inlet - DCPLANTPANEL:4,5 - DCPLANTPANEL:Plant Panel Inlet - DCPLANTITEM:Plant Busbar').eq(0).click()
      cy.getIframeBody('id="circuits_iframe"').find('#circuitList').find('[title="Actions"]').click()
      cy.getIframeBody('id="circuits_iframe"').find('#circuitList').find('#dropdown-ACTION_TB > li').as('dropdown')
      cy.get('@dropdown').eq(0).contains('Connect').as('connectBtn')
      cy.get('@connectBtn').should('not.be.disabled')
      cy.get('@connectBtn').click()
      cy.getIframeBody('id="circuits_iframe"').find('.dct-dialog-footer > button').eq(0).click()
      cy.wait(4000)
      cy.getIframeBody('id="circuits_iframe"').find('#modal-btnCancel').click()
    })

    it('Visit Change Page', () => {
      cy.get('.menu-toggle').click()
      cy.get('.header-dropdown > li').as('dropdown')
      cy.get('@dropdown').eq(5).find('sun-icon.fa.fa-chevron-right').should('exist').click()
      cy.get('@dropdown').eq(5).contains('Requests').click()
      cy.wait(4000)
      cy.getIframeBody('id="change_iframe"').find('#btnRemoveTab').click()
      cy.getIframeBody('id="change_iframe"').find('#requests').find('[title="Refresh"]').click()
    })

    it('Choose the first (latest) request and verify its stage (Reissued)', () => {
      cy.wait(4000)
      cy.getIframeBody('id="change_iframe"').find('#requests').find('[title="Refresh"]').click()
      cy.wait(2000)
      cy.getIframeBody('id="change_iframe"').find('.ui-grid-canvas > div').eq(0).dblclick()
      cy.getIframeBody('id="change_iframe"').find('#cmbRequestStage').should('have.value', 'Request Reissued');
    })

    it('Cancel this request', () => {
      cy.getIframeBody('id="change_iframe"').find('#btnActionsDrpdwn').click()
      cy.getIframeBody('id="change_iframe"').find('#menuCancelRequest').click()
      cy.wait(4000)
      cy.getIframeBody('id="change_iframe"').find('#modal-btnCancel').click()
      cy.wait(2000)
      cy.getIframeBody('id="change_iframe"').find('#btnRemoveTab').click()
    })

// ----------------------------- Seperate Line for testing disconnect and connect circuits ---------------------------------

    it('Visit Circuits Page', () => {
      cy.wait(2000)
      cy.get('.menu-toggle').click()
      cy.get('.header-dropdown > li').as('dropdown')
      cy.get('@dropdown').eq(4).find('sun-icon.fa.fa-chevron-right').should('exist').click()
      cy.get('@dropdown').eq(4).contains('Circuits').click()
    })

    // Test on a connect circuit
    it('choose a connect circuit', () => {
      cy.getIframeBody('id="circuits_iframe"')
        .contains('div', 'NJESX11:Net2a ~ DATA-01-01:P04').eq(0).click()
      cy.getIframeBody('id="circuits_iframe"').find('#circuitList').find('[title="Actions"]').click()
      cy.getIframeBody('id="circuits_iframe"').find('#circuitList').find('#dropdown-ACTION_TB > li').as('dropdown')
      cy.get('@dropdown').eq(1).contains('Disconnect').click()
      cy.getIframeBody('id="circuits_iframe"').find('.dct-dialog-footer > button').eq(0).click()
      cy.getIframeBody('id="circuits_iframe"').find('#modal-btnCancel').click()
    })

    it('Visit Change Page', () => {
      cy.get('.menu-toggle').click()
      cy.get('.header-dropdown > li').as('dropdown')
      cy.get('@dropdown').eq(5).find('sun-icon.fa.fa-chevron-right').should('exist').click()
      cy.get('@dropdown').eq(5).contains('Requests').click()
    })

    it('Choose the first (latest) request and verify its stage (Issued)', () => {
      cy.wait(4000)
      cy.getIframeBody('id="change_iframe"').find('#requests').find('[title="Refresh"]').click()
      cy.wait(2000)
      cy.getIframeBody('id="change_iframe"').find('.ui-grid-canvas > div').eq(0).dblclick()
      cy.getIframeBody('id="change_iframe"').find('#cmbRequestStage').should('have.value', 'Request Issued');
    })

    it('Visit Circuits Page', () => {
      cy.wait(2000)
      cy.get('.menu-toggle').click()
      cy.get('.header-dropdown > li').as('dropdown')
      cy.get('@dropdown').eq(4).find('sun-icon.fa.fa-chevron-right').should('exist').click()
      cy.get('@dropdown').eq(4).contains('Circuits').click()
    })

    it('Reissue the disconnect request for the same circuit', () => {
      cy.getIframeBody('id="circuits_iframe"')
        .contains('div', 'NJESX11:Net2a ~ DATA-01-01:P04').eq(0).click()
      cy.getIframeBody('id="circuits_iframe"').find('#circuitList').find('[title="Actions"]').click()
      cy.getIframeBody('id="circuits_iframe"').find('#circuitList').find('#dropdown-ACTION_TB > li').as('dropdown')
      cy.get('@dropdown').eq(1).contains('Disconnect').as('disconnectBtn')
      cy.get('@disconnectBtn').should('not.be.disabled')
      cy.get('@disconnectBtn').click()
      cy.getIframeBody('id="circuits_iframe"').find('.dct-dialog-footer > button').eq(0).click()
      cy.wait(4000)
      cy.getIframeBody('id="circuits_iframe"').find('#modal-btnCancel').click()
    })

    it('Visit Change Page', () => {
      cy.get('.menu-toggle').click()
      cy.get('.header-dropdown > li').as('dropdown')
      cy.get('@dropdown').eq(5).find('sun-icon.fa.fa-chevron-right').should('exist').click()
      cy.get('@dropdown').eq(5).contains('Requests').click()
      cy.wait(4000)
      cy.getIframeBody('id="change_iframe"').find('#btnRemoveTab').click()
      cy.getIframeBody('id="change_iframe"').find('#requests').find('[title="Refresh"]').click()
    })

    it('Choose the first (latest) request and verify its stage (Reissued)', () => {
      cy.wait(4000)
      cy.getIframeBody('id="change_iframe"').find('#requests').find('[title="Refresh"]').click()
      cy.wait(2000)
      cy.getIframeBody('id="change_iframe"').find('.ui-grid-canvas > div').eq(0).dblclick()
      cy.getIframeBody('id="change_iframe"').find('#cmbRequestStage').should('have.value', 'Request Reissued');
    })

    it('Cancel this request', () => {
      cy.getIframeBody('id="change_iframe"').find('#btnActionsDrpdwn').click()
      cy.getIframeBody('id="change_iframe"').find('#menuCancelRequest').click()
      cy.wait(4000)
      cy.getIframeBody('id="change_iframe"').find('#modal-btnCancel').click()
      cy.wait(2000)
      cy.getIframeBody('id="change_iframe"').find('#btnRemoveTab').click()
    })

    it('Visit Circuits Page', () => {
      cy.wait(2000)
      cy.get('.menu-toggle').click()
      cy.get('.header-dropdown > li').as('dropdown')
      cy.get('@dropdown').eq(4).find('sun-icon.fa.fa-chevron-right').should('exist').click()
      cy.get('@dropdown').eq(4).contains('Circuits').click()
    })

    it('Turn on RB', () => {
      cy.getIframeBody('id="circuits_iframe"').find('#circuitList').find('[title="Actions"]').click()
      cy.getIframeBody('id="circuits_iframe"').find('#circuitList').find('#dropdown-ACTION_TB > li').as('dropdown')
      cy.get('@dropdown').eq(3).contains('Turn On Request Bypass').click()
    })
  })

