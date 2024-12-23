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

    it('Choose item CSG05', () => {
      cy.getIframeBody('id="assets_iframe"').find('#filter_cmbStatus').click()
      cy.getIframeBody('id="assets_iframe"').find('#option-5').click()
      cy.wait(2000)
      cy.getIframeBody('id="assets_iframe"')
        .contains('div', 'CSG05').eq(0).click()
    })

    it('Prepare move item request', () => {
      cy.wait(4000)
      cy.getIframeBody('id="assets_iframe"').find('#itemList').find('[title="Actions"]').click()
      cy.getIframeBody('id="assets_iframe"').find('#itemList').find('#dropdown-ACTION_TB > li').as('dropdown')
      cy.get('@dropdown').eq(12).contains('Prepare Move Item Request...').click()
    })
    
    it('Verify if the default location is placed in "Move to Location"', () => {
      cy.getIframeBody('id="assets_iframe"').find('#siteSelector').contains('button', 'SITE A ')
      cy.getIframeBody('id="assets_iframe"').find('#modal-btnClose').click()
    })

    it('Choose item USNJLXSN020', () => {
      cy.getIframeBody('id="assets_iframe"')
        .contains('div', 'USNJLXSN020').eq(0).click()
    })

    it('Prepare move item request', () => {
      cy.wait(2000)
      cy.getIframeBody('id="assets_iframe"').find('#itemList').find('[title="Actions"]').click()
      cy.getIframeBody('id="assets_iframe"').find('#itemList').find('#dropdown-ACTION_TB > li').as('dropdown')
      cy.get('@dropdown').eq(12).contains('Prepare Move Item Request...').click()
    })
    
    it('Verify if the default location is placed in "Move to Location"', () => {
      cy.getIframeBody('id="assets_iframe"').find('#siteSelector').contains('button', 'SITE B ')
      cy.getIframeBody('id="assets_iframe"').find('#modal-btnClose').click()
    })
  })
