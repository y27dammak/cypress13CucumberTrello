export class Cards {
  createBoard(boardName){
    
  // Create a new board
  cy.contains("Create new board").parent().click();
  cy.xpath("//*[@data-testid='create-board-title-input']").type(boardName);
  cy.xpath("//*[@data-testid='create-board-submit-button']").click();

  

    
  }
   
  openBoard(boardName){
    cy.xpath(`//div[text()='${boardName}']`,{timeout:4000}).click()
    cy.xpath(`//h1[text()='${boardName}']`,{timeout:5000}).should('be.visible')
  }

  createLists(arrayLists){
    cy.contains("Add a list").parent().click();
    cy.xpath("//input[@name='name']").type(arrayLists[0].listName);
    arrayLists.slice(1).forEach((list) => {
      cy.xpath("//input[@value='Add list']").click();
      cy.xpath("//input[@name='name']").type(list.listName);
    });
    cy.xpath("//input[@value='Add list']").click();
    cy.xpath("//input[@value='Add list']").type("{esc}");

  }

  createCards(listName, arrayCards){

    cy.xpath(
      `//textarea[text()='${listName}']//ancestor::div[2]//span[text()='Add a card']`
    )
      .click()
      .wait(200);
    cy.xpath("//textarea[@placeholder='Enter a title for this card…']").type(
      arrayCards[0].cardName
    );


    arrayCards.slice(1).forEach((card) => {
      cy.xpath(
        "//textarea[text()='New']//ancestor::div[2]//input[@value='Add card']"
      )
        .click()
        .wait(200);
      cy.xpath("//textarea[@placeholder='Enter a title for this card…']").type(
        card.cardName
      );
    });

    cy.xpath(
      "//textarea[text()='New']//ancestor::div[2]//input[@value='Add card']"
    )
      .click()
      .wait(200);

    cy.xpath("//textarea[@placeholder='Enter a title for this card…']").type(
      "{esc}"
    );  

  }

  manageCards (arrayCards){
    console.log("OOOOP==>",)

    arrayCards.forEach ((card)=>{
      cy.openOneCard(card.name)
      cy.addDescriptionToACard (card.description)
      cy.addLableToACard(card.lableTitle,card.labelColor)
      // cy.xpath("//a[@aria-label='Close dialog']").click()
      this.closeCard()
      // Try to drag card0 to another list
      cy.dragAndDropACard(card.name,card.targetList)   
      cy.wait(1000)    
    
    
    })
  }


  loadCard (cardName,listName){
    cy.openOneCard(cardName,listName)
  }
  addDescriptionToCard(cardDescription){
    cy.addDescriptionToACard(cardDescription)
  }

  addLabelToCard(labelTitle,color){
    cy.addLableToACard(labelTitle,color)
  }

  closeCard() {
    cy.xpath("//a[@aria-label='Close dialog']").click()
  }

  moveCard(cardName,listName){

    cy.dragAndDropACard(cardName,listName)   
  }
  checkCardMoved(cardName,listName){
    cy.checkCardInList(cardName,listName)
  }

  checkUpdates(cardDetailsArray){
    cardDetailsArray.forEach((card)=>{
      cy.xpath(`//*[text()='Labels']//ancestor::div[contains(@class,'labels-container')]//button[@data-color='${card.color}' and text()='${card.label}']`,{timeout:1000}).scrollIntoView().should('be.visible').wait(1000)
    })

    // To add activity check as well 

    
  }



}

  

export const cards = new Cards();