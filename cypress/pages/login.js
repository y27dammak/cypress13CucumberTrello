export class Login {
    googleAuth(username, password) {
        cy.session([username,password],()=>{

            cy.visit('/login')
            cy.contains('Continue with Google').click()
            // cy.xpath("//*[text()='Continue with Google']") 
    
            
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
                  cy.contains('Next').click().wait(6000)
                  cy.get('[type="password"]').type(password, {
                    log: false,
                  })
                  cy.contains('Next').click().wait(6000)
                }
              )
    
            })
    

        

}

}

export const login = new Login();