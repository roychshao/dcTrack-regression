// Cypress.Commands.add('getIframeBody', (attribute) => {
//     // get the iframe > document > body
//     // and retry until the body element is not empty
//     return cy
//     .get('iframe[' + attribute + ']')
//     .its('0.contentDocument.body').should('not.be.empty')
//     // wraps "body" DOM element to allow
//     // chaining more Cypress commands, like ".find(...)"
//     // https://on.cypress.io/wrap
//     .then(cy.wrap)
//   })
//
//   describe('dcTrack front-end testing ', () => {
//     beforeEach(() => {
//       Cypress.config('defaultCommandTimeout', 10000);
//     })
//
//     it('Visit page', () => {
//       cy.visit(Cypress.config('url'))
//     })
//     it('log in', () => {
//       cy.on('fail', (err, runnable) => {
//         cy.log('already log in')
//         return false
//       })
//
//       cy.get('.login').type('admin')
//       cy.get('.password').type('sunbird')
//       cy.contains('Log in').click()
//     })
//
//     it('Visit Assets Page', () => {
//       cy.wait(8000)
//       cy.get('.menu-toggle').click()
//       cy.get('.header-dropdown > li').as('dropdown')
//       cy.get('@dropdown').eq(3).find('sun-icon.fa.fa-chevron-right').should('exist').click()
//       cy.get('@dropdown').eq(3).contains('Items').click()
//     })
//
//     it('Decommission to archive for BLK and C', () => {
//       cy.wait(4000)
//       // filtering
//       cy.getIframeBody('id="assets_iframe"').find('#filter_tiSubclass').click()
//       cy.getIframeBody('id="assets_iframe"').find('#option-6').click()
//       cy.wait(2000)
//       cy.getIframeBody('id="assets_iframe"').find('#filter_cmbStatus').click()
//       cy.getIframeBody('id="assets_iframe"').find('#option-1').click()
//       cy.getIframeBody('id="assets_iframe"').find('#filter_cmbStatus').click()
//       cy.wait(4000)
//       cy.getIframeBody('id="assets_iframe"').find('.ui-grid-canvas').eq(1)
//         .find('.ui-grid-row').eq(1).click()
//       cy.getIframeBody('id="assets_iframe"').find('.ui-grid-canvas').eq(1)
//         .find('.ui-grid-row').eq(2).click({ ctrlKey: true })
//       cy.getIframeBody('id="assets_iframe"').find('#itemList').find('[title="Actions"]').click()
//       cy.getIframeBody('id="assets_iframe"').find('#dropdown-ACTION_TB > li').as('dropdown')
//       cy.wait(2000)
//       cy.get('@dropdown').eq(6).contains('Decommission Item to Archive Request').click()
//       cy.wait(2000)
//       cy.getIframeBody('id="assets_iframe"').find('#modal-btnOk').click()
//       // do not click btnCancel now,
//       cy.wait(12000)
//     })
//
//     it('Open tab2 and verify the two request is complete', () => {
//       cy.window().then((win) => {
//         const secondTab = win.open('http://Cypress.config('url')', '_blank')
//         cy.wrap(secondTab).then(() => {
//           cy.window().then((win2) => {
//             // Turn to request page
//             cy.wait(60000)
//             cy.get('.menu-toggle').click()
//             cy.get('.header-dropdown > li').as('dropdown')
//             cy.get('@dropdown').eq(5).find('sun-icon.fa.fa-chevron-right').should('exist').click()
//             cy.get('@dropdown').eq(5).contains('Requests').click()
//             cy.wait(8000)
//             cy.getIframeBody('id="change_iframe"').find('.ui-grid-canvas > div').eq(0).contains('a', 'Decommission to Archive: C')
//             cy.getIframeBody('id="change_iframe"').find('.ui-grid-canvas > div').eq(0).find('[title="Request Complete"]')
//             cy.getIframeBody('id="change_iframe"').find('.ui-grid-canvas > div').eq(1).contains('a', 'Decommission to Archive: BLK')
//             cy.getIframeBody('id="change_iframe"').find('.ui-grid-canvas > div').eq(1).find('[title="Request Complete"]')
//           })
//         })
//       })
//     })
//   })
//
