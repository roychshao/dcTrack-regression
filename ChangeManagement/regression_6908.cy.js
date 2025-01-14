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
    
    it('Verify if Quick Move menu item exist', () => {
      cy.wait(8000)
      // filtering
      cy.getIframeBody('id="assets_iframe"').find('#itemList').find('[title="Actions"]').click()
      cy.getIframeBody('id="assets_iframe"').find('#dropdown-ACTION_TB > li').as('dropdown')
      cy.wait(2000)
      cy.get('@dropdown').eq(11).contains('span', 'Quick Move Item Request...').should('exist')
    })
  })

