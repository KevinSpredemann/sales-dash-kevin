describe('Check if create profile page renders the correct components ', () => {
  beforeEach(() => {
    cy.visit('http://192.168.1.44:5173/cadastro')
  })
  it('should step 1 and 2 works', () => {
    cy.get('input[type="text"]').type('Tester Cypress')
    cy.get('input[type="email"]').type('spredemann2123@dnc.com')
    cy.get('input[type="tel"]').type('123456885')
    cy.get('button[type="submit"').click()
    cy.get('input[type="password"]').type('Spredemann123@')
    cy.get('button[type="submit"').should('be.visible')
  })
})
