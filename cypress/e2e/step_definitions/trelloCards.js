

import { Given, Then, When,Before, DataTable } from '@badeball/cypress-cucumber-preprocessor';
import { login } from "../../pages/login";

import { cards } from "../../pages/cards";
import { trelloApi } from "../../pages/trelloApi";


beforeEach('google auth',()=>{

      const  username  = Cypress.env("authInfo").username
      const password =Cypress.env ("authInfo").password
        

    login.googleAuth (username,password)   
})



Given(`I authenticate to trello via google account {string}`, (username) => {
    const password ='Trell@YD2023'

    login.googleAuth (username,password) 
});

Then (`I create a board {string}`,(boardName)=>{

    cards.createBoard(boardName)
})



Given(`I visit Trello`,()=>{

    cy.visit('/')
})

// When(`I visit Trello`,()=>{

//     cy.visit('/')
// })

Then(`I create the lists`,(datatable)=>{
    var arrayLists=datatable.hashes().map(row=>({
        listName:row.list
    }))
    cards.createLists(arrayLists)
})


When (`I create in list {string} the cards`,(listName,datatable)=>{
var arrayCards=datatable.hashes().map(row=>({
    cardName:row.card

}))
cards.createCards(listName,arrayCards)

})

Given(`I delete the board {string}`,(boardToDelete)=>{    
trelloApi.archiveAlllistsInBoard(boardToDelete)
trelloApi.deleteBoard(boardToDelete);
})



Then (`I open the board {string}`,(boardName)=>{
    cards.openBoard(boardName)

}) 

When (`I open the card {string} in list {string}`,(cardName,listName)=>{

    cards.loadCard(cardName,listName)
})

When(`I add a description {string}`,(cardDescription)=>{
    cards.addDescriptionToCard(cardDescription)
})

When(`I add label with title {string} and color {string}`,(labelTitle,color)=>{
    cards.addLabelToCard(labelTitle,color)
    
})

When(`I close the card`,()=>{
    cards.closeCard()
})


When( `I move {string} to list {string}`,(cardName,listName)=>{
    cards.moveCard(cardName,listName)
})
Then(`the card {string} is moved to list {string}`,(cardName,listName)=>{
    cards.checkCardMoved(cardName,listName)
})

Then(   `I can see the card details`,(datatable)=>{
    
    //define an object array to contain what we included in the feature file table
    var cardDetailsArray = datatable.hashes().map((row)=>({
        title:row.title,
        description:row.description,
        label:row.label,
        color:row.color
        


    }))

    cards.checkUpdates(cardDetailsArray)


})

 






