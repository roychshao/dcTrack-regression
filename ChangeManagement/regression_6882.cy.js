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
      cy.wait(8000)
      cy.get('.menu-toggle').click()
      cy.get('.header-dropdown > li').as('dropdown')
      cy.get('@dropdown').eq(3).find('sun-icon.fa.fa-chevron-right').should('exist').click()
      cy.get('@dropdown').eq(3).contains('Items').click()
      cy.wait(4000)
    })

    it('Choose item 101', () => {
      cy.getIframeBody('id="assets_iframe"')
        .contains('div', '48RU-Cabinet GlobalFrame-3A-400').eq(0).dblclick()
    })

    it('Quick move item request', () => {
      cy.wait(4000)
      cy.getIframeBody('id="assets_iframe"').find('div[class="tab-pane active"]').find('[title="Actions"]').click()
      cy.getIframeBody('id="assets_iframe"').find('div[class="tab-pane active"]').find('#dropdown-ACTION_TB > li').as('dropdown')
      cy.get('@dropdown').eq(11).contains('Quick Move Item Request...').click()
    })

    // description: "Move: 101"
    it('Confirm the request', () => {
      cy.wait(4000)
      cy.getIframeBody('id="assets_iframe"').find('div[class="tab-pane active"]').find('[title="Save"]').click()
      cy.getIframeBody('id="assets_iframe"').find('#modal-btnOk').click()
      cy.wait(4000)
      cy.getIframeBody('id="assets_iframe"').find('#modal-btnCancel').click()
      cy.wait(4000)
    })

    it('Visit Change Page', () => {
      cy.get('.menu-toggle').click()
      cy.get('.header-dropdown > li').as('dropdown')
      cy.get('@dropdown').eq(5).find('sun-icon.fa.fa-chevron-right').should('exist').click()
      cy.get('@dropdown').eq(5).contains('Requests').click()
    })

    it('Approve the first (latest) request', () => {
      cy.wait(4000)
      cy.getIframeBody('id="change_iframe"').find('#requests').find('[title="Refresh"]').click()
      cy.wait(4000)
      cy.getIframeBody('id="change_iframe"').find('.ui-grid-canvas > div').eq(0).click()
      cy.getIframeBody('id="change_iframe"').find('#requests').find('[title="Action for selected request."]').click()
      cy.getIframeBody('id="change_iframe"').find('#requests').contains('span', 'Approve Request').click()
      cy.getIframeBody('id="change_iframe"').find('#modal-btnCancel').click()
    })

    it('Visit Assets Page', () => {
      cy.wait(4000)
      cy.get('.menu-toggle').click()
      cy.get('.header-dropdown > li').as('dropdown')
      cy.get('@dropdown').eq(3).find('sun-icon.fa.fa-chevron-right').should('exist').click()
      cy.get('@dropdown').eq(3).contains('Items').click()
    })

    it('Verify if user can edit information', () => {
      cy.wait(4000)
      cy.getIframeBody('id="assets_iframe"').find('#itemDetail').find('[title="Refresh"]').click()
      cy.wait(4000)
      cy.getIframeBody('id="assets_iframe"').find('#itemDetail').find('[title="Edit"]').should('be.disabled')
    })

    it('Visit Change Page', () => {
      cy.get('.menu-toggle').click()
      cy.get('.header-dropdown > li').as('dropdown')
      cy.get('@dropdown').eq(5).find('sun-icon.fa.fa-chevron-right').should('exist').click()
      cy.get('@dropdown').eq(5).contains('Requests').click()
    })

    it('Cancel the first (latest) request', () => {
      cy.wait(4000)
      cy.getIframeBody('id="change_iframe"').find('#requests').find('[title="Refresh"]').click()
      cy.wait(4000)
      cy.getIframeBody('id="change_iframe"').find('.ui-grid-canvas > div').eq(0).click()
      cy.getIframeBody('id="change_iframe"').find('#requests').find('[title="Action for selected request."]').click()
      cy.getIframeBody('id="change_iframe"').find('#requests').contains('span', 'Cancel Request').click()
      cy.getIframeBody('id="change_iframe"').find('#modal-btnCancel').click()
    })
  })
