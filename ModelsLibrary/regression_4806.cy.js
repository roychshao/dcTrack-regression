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
      cy.visit('192.168.56.104')
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

    it('Visit Models Library Page', () => {
      cy.wait(8000)
      cy.get('.menu-toggle').click()
      cy.get('.header-dropdown > li').as('dropdown')
      cy.get('@dropdown').eq(8).find('sun-icon.fa.fa-chevron-right').should('exist').click()
      cy.get('@dropdown').eq(8).contains('Models Library').click()
    })

    it('Make ascending and descending', () => {
      cy.wait(4000)
      // Descending: Make, Subclass, Mounting
      cy.getIframeBody('id="models_iframe"').find('.ui-grid-header-canvas').eq(1)
        .contains('span', 'Make').parent().next().click()
      cy.getIframeBody('id="models_iframe"').contains('button', 'Sort Descending').click()
      cy.wait(2000)
      cy.getIframeBody('id="models_iframe"').find('.ui-grid-header-canvas').eq(1)
        .contains('span', 'Subclass').parent().next().click()
      cy.getIframeBody('id="models_iframe"').contains('button', 'Sort Descending').click()
      cy.wait(2000)
      cy.getIframeBody('id="models_iframe"').find('.ui-grid-header-canvas').eq(1)
        .contains('span', 'Mounting').parent().next().click()
      cy.getIframeBody('id="models_iframe"').contains('button', 'Sort Descending').click()
    })

    it('Logoff', () => {
      cy.wait(4000)
      cy.get('#headerToolbar_userAccount').click()
      cy.get('#headerToolbar_userAccount').parent()
        .contains('a', 'Logoff').click()
    })


    it('Login', () => {
      cy.wait(4000)
      cy.on('fail', (err, runnable) => {
        cy.log('already log in')
        return false
      })

      cy.get('.login').type('admin')
      cy.get('.password').type('sunbird')
      cy.contains('Log in').click()
    })

    it('Visit Models Library Page', () => {
      cy.wait(8000)
      cy.get('.menu-toggle').click()
      cy.get('.header-dropdown > li').as('dropdown')
      cy.get('@dropdown').eq(8).find('sun-icon.fa.fa-chevron-right').should('exist').click()
      cy.get('@dropdown').eq(8).contains('Models Library').click()
    })

    it('Verify and rollback the settings', () => {
      cy.wait(4000)
      // Descending: Make, Part Number, Mounting
      cy.getIframeBody('id="models_iframe"').find('.ui-grid-header-canvas').eq(1)
        .contains('span', 'Make').parent().next().click()
      cy.getIframeBody('id="models_iframe"').contains('button', 'Sort Descending')
        .should('have.attr', 'aria-pressed', 'true')
      cy.getIframeBody('id="models_iframe"').contains('button', 'Sort Ascending').click()
      cy.wait(2000)
      cy.getIframeBody('id="models_iframe"').find('.ui-grid-header-canvas').eq(1)
        .contains('span', 'Subclass').parent().next().click()
      cy.getIframeBody('id="models_iframe"').contains('button', 'Sort Descending')
        .should('have.attr', 'aria-pressed', 'true')
      cy.getIframeBody('id="models_iframe"').contains('button', 'Sort Ascending').click()
      cy.wait(2000)
      cy.getIframeBody('id="models_iframe"').find('.ui-grid-header-canvas').eq(1)
        .contains('span', 'Mounting').parent().next().click()
      cy.getIframeBody('id="models_iframe"').contains('button', 'Sort Descending')
        .should('have.attr', 'aria-pressed', 'true')
      cy.getIframeBody('id="models_iframe"').contains('button', 'Sort Ascending').click()
    })
  })
