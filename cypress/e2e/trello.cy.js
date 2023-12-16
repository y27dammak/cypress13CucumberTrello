describe('Trello test', () => {

    it('authViaGoogle', () => {
        cy.visit('/login')
        cy.contains('Continue with Google').click()


        const username = 'testercogniva@gmail.com'
        const password = 'Cogniva#1'
        
        cy.origin(
            'https://accounts.google.com',
            {
              args: {
                username,
                password,
              },
            },
            ({ username, password }) => {
              Cypress.on(
                'uncaught:exception',
                (err) =>
                  !err.message.includes('ResizeObserver loop') &&
                  !err.message.includes('Error in protected function')
              )
        
              cy.get('input[type="email"]').type(username, {
                log: false,
              })
              // NOTE: The element exists on the original form but is hidden and gets rerendered, which leads to intermittent detached DOM issues
              cy.contains('Next').click().wait(4000)
              cy.get('[type="password"]').type(password, {
                log: false,
              })
              cy.contains('Next').click().wait(4000)
            }
          )

       
        
    })
})

    //it('passes', () => {
    // cy.visit('https://trello.com/')

    // cy.xpath("//li[@id='ca-talk']").click()
    // cy.get("li#ca-talk").click()

      
      
      
      