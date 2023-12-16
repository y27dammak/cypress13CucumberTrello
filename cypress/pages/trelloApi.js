
export class TrelloApi {
    

    createCard(boardName,listName,cardName){
        const boardId=getBoardId (boardName)
        const listId =getListId(boardId,listName)  



    }

    getListId(boardId,listName){

        const requestBody ={

            url:`https://api.trello.com/1/boards/${boardId}/lists?key=${Cypress.env("trelloApi").key}&token=${Cypress.env("trelloApi").token}`,
            method: 'GET',
            headers: {
              'Accept': 'application/json'
            }
        }
        cy.request(requestBody).then((response)=>{

            console.log("Lists ====>",response)

            const listsArray=response.body

            console.log("one board ==>",listsArray.find(board=>board.name==boardName))

            console.log("iid===>",(listsArray.find(board=>board.name==boardName)).id)

            return (listsArray.find(list=>list.name==listName)).id


        })

    }


    getBoardId(boardName){
        cy.getBoards().then((getBoardresponse)=>{

            console.log("get Boards ====>",getBoardresponse)
        
            const boardsArray=getBoardresponse.body
        
            console.log("one board ==>",boardsArray.find(board=>board.name==boardName))
        
            console.log("iid===>",(boardsArray.find(board=>board.name==boardName)).id)
        
            const bordId=(boardsArray.find(board=>board.name==boardName)).id
            return(bordId)

        })
        
    }

    archiveAlist(listId){

        const requestBody ={

            url:`https://api.trello.com/PUT /1/lists/${listId}/closed?key=${Cypress.env("trelloApi").key}&token=${Cypress.env("trelloApi").token}     `,
            method: 'PUT',
            headers: {
              'Accept': 'application/json'
            }
        }
        cy.request(requestBody).then((response)=>{
            cy.console.log("delete list response===>",response)
        
        
        })


    }


    archiveAlllistsInBoard (boardName){
        cy.archiveAlllistsInBoard(boardName)
    }

    deleteBoard(boardName){
        cy.deleteBoardCommand(boardName)
    }



}

export const trelloApi =new TrelloApi()