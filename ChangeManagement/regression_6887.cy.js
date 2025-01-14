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

    it('Visit Assets Page', () => {
      cy.wait(8000)
      cy.get('.menu-toggle').click()
      cy.get('.header-dropdown > li').as('dropdown')
      cy.get('@dropdown').eq(3).find('sun-icon.fa.fa-chevron-right').should('exist').click()
      cy.get('@dropdown').eq(3).contains('Items').click()
    })
 
    it('Choose item 101', () => {
      cy.wait(4000)
      cy.getIframeBody('id="assets_iframe"')
        .contains('div', '48RU-Cabinet GlobalFrame-3A-400').eq(0).dblclick()
      cy.wait(4000)
    })
    
    it('Move Item Request', () => {
      cy.getIframeBody('id="assets_iframe"').find('div[class="tab-pane active"]').find('[title="Actions"]').click()
      cy.getIframeBody('id="assets_iframe"').find('div[class="tab-pane active"]').find('#dropdown-ACTION_TB > li').as('dropdown')
      cy.get('@dropdown').eq(11).contains('Quick Move Item Request...').click()
    })

    it('Confirm the request', () => {
      cy.getIframeBody('id="assets_iframe"').find('div[class="tab-pane active"]').find('[title="Save"]').click()
      cy.getIframeBody('id="assets_iframe"').find('#modal-btnOk').click()
      cy.wait(4000)
      cy.getIframeBody('id="assets_iframe"').find('#modal-btnCancel').click()
    })

    it('Visit Change Page', () => {
      cy.get('.menu-toggle').click()
      cy.get('.header-dropdown > li').as('dropdown')
      cy.get('@dropdown').eq(5).find('sun-icon.fa.fa-chevron-right').should('exist').click()
      cy.get('@dropdown').eq(5).contains('Requests').click()
    })

    it('Choose the first (latest) request', () => {
      cy.getIframeBody('id="change_iframe"').find('div[class="tab-pane active"]').find('[title="Refresh"]').click()
      cy.getIframeBody('id="change_iframe"').find('.ui-grid-canvas > div').eq(0).dblclick()
    })
    
    it('Approve request', () => {
      cy.getIframeBody('id="change_iframe"').find('div[class="tab-pane active"]').eq(0).find('[title="Actions for this request."]').click()
      cy.getIframeBody('id="change_iframe"').find('#menuApproveRequest').click()
      cy.wait(4000)
      cy.getIframeBody('id="change_iframe"').find('#modal-btnCancel').click()
    })

    it('The delete btn on the WHEN MOVE item should be disabled', () => {
      cy.getIframeBody('id="change_iframe"').find('#back-to-list-btn').click()
      cy.get('.menu-toggle').click()
      cy.get('.header-dropdown > li').as('dropdown')
      cy.get('@dropdown').eq(3).find('sun-icon.fa.fa-chevron-right').should('exist').click()
      cy.get('@dropdown').eq(3).contains('Items').click()
      cy.getIframeBody('id="assets_iframe"').find('#back-to-list-btn').click()
      cy.getIframeBody('id="assets_iframe"')
        .contains('div', '101^^WHEN-MOVED').dblclick()
      cy.getIframeBody('id="assets_iframe"').find('div[class="tab-pane active"]').eq(1).find('[title="Delete selected items"]').should('have.attr', 'disabled', 'disabled')
    })

    it('Cancel the move request', () => {
      cy.get('.menu-toggle').click()
      cy.get('.header-dropdown > li').as('dropdown')
      cy.get('@dropdown').eq(5).find('sun-icon.fa.fa-chevron-right').should('exist').click()
      cy.get('@dropdown').eq(5).contains('Requests').click()
      cy.getIframeBody('id="change_iframe"').find('.ui-grid-canvas > div').eq(0).dblclick()
      cy.getIframeBody('id="change_iframe"').find('div[class="tab-pane active"]').eq(0).find('[title="Actions for this request."]').click()
      cy.getIframeBody('id="change_iframe"').find('#menuCancelRequest').click()
      cy.wait(4000)
      cy.getIframeBody('id="change_iframe"').find('#modal-btnCancel').click()
    })
  })
