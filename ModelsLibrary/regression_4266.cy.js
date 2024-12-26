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
      cy.wait(12000)
      cy.get('.menu-toggle').click()
      cy.get('.header-dropdown > li').as('dropdown')
      cy.get('@dropdown').eq(8).find('sun-icon.fa.fa-chevron-right').should('exist').click()
      cy.get('@dropdown').eq(8).contains('Models Library').click()
    })

    it('Select 00YJ783 and verify the dataPortsCount and powerPortsCount on the list', () => {
      cy.wait(10000)
      cy.getIframeBody('id="models_iframe"')
        .contains('div', '00YJ783').click()
      // ERROR: 定位不到
      cy.getIframeBody('id="models_iframe"').contains('div', '00YJ783').parent().parent()
        .children().eq(15).as('dataPortsCount')
      cy.get('@dataPortsCount').next().as('powerPortsCount')
      cy.get('@dataPortsCount').contains('div', '1')
      cy.get('@powerPortsCount').contains('div', '25')
    })

    it('Verify the counts in detail page', () => {
      cy.getIframeBody('id="models_iframe"')
        .contains('div', '00YJ783').dblclick()
      cy.wait(10000) 
      cy.getIframeBody('id="models_iframe"').find('#subtab-DataPorts').click()
      cy.wait(2000)
      cy.getIframeBody('id="models_iframe"').find('#dataPortsGrid')
        .find('.ui-grid-canvas').eq(1).children().should('have.length', 1)
      cy.getIframeBody('id="models_iframe"').find('#subtab-PowerPorts').click()
      cy.wait(2000)
      // ERROR: 怎麼找都是22個 有4個找不到但瀏覽器element找的到
      cy.getIframeBody('id="models_iframe"').find('[ng-switch-when="PowerPorts"]')
        .find('[title="IEC-309-5-60-P9"]').should('have.length', 1)
      cy.getIframeBody('id="models_iframe"').find('[ng-switch-when="PowerPorts"]')
        .find('[title="IEC-320-C13"]').should('have.length', 12)
      cy.getIframeBody('id="models_iframe"').find('[ng-switch-when="PowerPorts"]')
        .find('[title="IEC-320-C19"]').should('have.length', 12)
    })
  })
