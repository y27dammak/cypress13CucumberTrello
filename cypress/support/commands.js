// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add(`getBoards`, () => {
  const requestBody = {
    url: `https://api.trello.com/1/members/me/boards?key=${
      Cypress.env("trelloApi").key
    }&token=${Cypress.env("trelloApi").token}`,
    method: "GET",
    headers: {
      Accept: "application/json",
    },
  };
  cy.request(requestBody);
});

Cypress.Commands.add(`getABoardLists`, (boardId) => {
  const requestBody = {
    url: `https://api.trello.com/1/boards/${boardId}/lists?key=${
      Cypress.env("trelloApi").key
    }&token=${Cypress.env("trelloApi").token}`,
    method: "GET",
    headers: {
      Accept: "application/json",
    },
  };
  cy.request(requestBody);
});

Cypress.Commands.add(`archiveAlist`, (listId) => {
  const requestBody = {
    url: `https://api.trello.com/1/lists/${listId}?key=${
      Cypress.env("trelloApi").key
    }&token=${Cypress.env("trelloApi").token}&closed=true`,
    method: "PUT",
    headers: {
      Accept: "application/json",
    },
  };
  cy.request(requestBody).then((response) => {
    console.log("delete list response===>", response);
  });
});



Cypress.Commands.add("archiveAlllistsInBoard", (boardName) => {
  cy.getBoards().then((getBoardresponse) => {
    console.log("get Boards ====>", getBoardresponse);
    const boardsArray = getBoardresponse.body;
    console.log(
      "iid===>",
      boardsArray.find((board) => board.name == boardName).id
    );

    const boardId = boardsArray.find((board) => board.name == boardName).id;
    cy.getABoardLists(boardId).then((listsResponse) => {
      const listsArray = listsResponse.body;
      console.log("Lists ====>", listsArray);
      var arrayListIds = listsArray.map(function (list) {
        return list.id;
      });

      console.log("Lists IDS ====>", arrayListIds);
      arrayListIds.forEach((listId) => {
        cy.archiveAlist(listId);
        console.log(listId);
      });
    });
  });
})

  // Cypress.Commands.add("deleteBoardCommand",(boardName)=>{
  //   cy.getBoards().then((response)=>{
  //       const boardsArray = response.body
  //       cy.deleteBoardRequest(boardsArray.find((board) => board.name == boardName).id)
  //   })
  // })


  Cypress.Commands.add(`deleteBoardCommand`, (boardName) => {
    cy.getBoards().then((response)=>{
      const boardsArray = response.body
      cy.deleteBoardRequest(boardsArray.find((board) => board.name == boardName).id)
  }) 

});








  Cypress.Commands.add(`deleteBoardRequest`,(boardId)=>{

    const requestBody = {
        url: `https://api.trello.com/1/boards/${boardId}?key=${
          Cypress.env("trelloApi").key
        }&token=${Cypress.env("trelloApi").token}`,
        method: "DELETE",
        headers: {
          Accept: "application/json",
        },
      };
      cy.request(requestBody).then((response) => {
        console.log("delete board response===>", response);
      })
  })

  Cypress.Commands.add('openOneCard',(cardName,listName)=>{
    cy.xpath(
      `//h2[text()='${listName}']//ancestor::div[2]//span[text()='${cardName}']//parent::div//preceding-sibling::span[contains(@class,'card-menu')]`
    ).click({ force: true });
    cy.contains("Open card").click({ force: true });

  })

  // The card is opened 
  Cypress.Commands.add('addDescriptionToACard',(descriptionText)=>{
    cy.contains("Add a more detailed description…").parent().click();
    cy.xpath("//div[@data-testid='click-wrapper']", { timeout: 5000 })
      .should("be.visible")
      .within(() => {
        cy.get("p").type(descriptionText);
      });
    cy.xpath("//button[text()='Save']").click();

  })

  Cypress.Commands.add('addLableToACard',(labelTitle,lableColor)=>{
    cy.xpath("//a[@title='Labels']").click()
    cy.xpath("//button[text()='Create a new label']",{timeout:2000}).click()
    cy.xpath("//p[text()='Title']//parent::div//input").type(labelTitle)
    cy.xpath(`//div[contains(@class,'color-blind-pattern-${lableColor}')]`).eq(0).click()
    cy.xpath("//button[text()='Create']").click()
    cy.xpath("//button[@data-testid='popover-close']",{timeout:2000}).click()
    cy.xpath(`//h3[text()='Labels']//parent::div//button[contains(@data-color,'${lableColor}') and text()='${labelTitle}']`,{timeout:1000}).scrollIntoView().should('be.visible').wait(1000)

  })
Cypress.Commands.add('dragAndDropACard',(cardName,listName)=>{
  cy.xpath(`//span[text()='${cardName}']//ancestor::a`,{timeout:500}).drag(`div.list.js-list-content:has(textarea[aria-label='${listName}']`)
})


Cypress.Commands.add('checkCardInList',(cardName,listName)=>{
  cy.xpath(`//h2[text()='${listName}']//ancestor::div[2]//*[text()='${cardName}']`).should('be.visible')

})

