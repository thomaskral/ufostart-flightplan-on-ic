describe('Demo cypress test', () => {
  it("User clicks on 'What is Internet Identity' link on landing page", () => {
    cy.visit('/')
    cy.contains('a', "What's an Internet Identity?").should('have.attr', 'href')
    cy.contains('a', "What's an Internet Identity?").click({ force: true })
  })
})
