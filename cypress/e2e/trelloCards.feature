Feature: Sign in

        # Background: Navigate to the Sign in Page
        #     Given I authenticate to trello via google account 'testyos2212@gmail.com'
        #       And click on sign in button

        Scenario: As s Trello Admin I can create a new board
    
            # Given I authenticate to trello via google account 'testyos2212@gmail.com'
            Given  I visit Trello
             Then  I create a board 'My automation board'

             
        Scenario: As a Trello Admin I can Create lists and cards in the new board
    
            # Given I authenticate to trello via google account 'testyos2212@gmail.com'
            Given  I visit Trello
             Then  I open the board 'My automation board'
              And  I create the lists
                  | list           |
                  | New            |
                  | In progress    |
                  | Pending review |
                  | Done           |

             When I create in list 'New' the cards
                  | card  |
                  | card0 |
                  | card1 |
                  | card2 |
                  | card3 |

        Scenario: As an admin I can manage cards inside a board
             When I visit Trello
             Then I open the board 'My automation board'
             When I open the card 'card0' in list 'New'
          #    Then I can see the card details
          #         | title | activity | label |
          #         | card0 |          |       |
              And I add a description 'Any description for card0'
              And I add label with title 'lableTitle for card0' and color 'sky'
             When I close the card
             
              And   I move 'card0' to list 'In progress'
             Then the card 'card0' is moved to list 'In progress'
             Then I open the card 'card0' in list 'In progress'
                         # Add assertions on label and activity on the card0
             Then I can see the card details
                  | title | description               | label                | color |
                  | card0 | Any description for card0 | lableTitle for card0 | sky   |
                  
             When I close the card

          


     #    Scenario: Reset Test Data
     #        Given I delete the board 'My automation board'


