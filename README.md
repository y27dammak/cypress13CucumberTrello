# cypress13CucumberTrello

## Overview

This project is a test automation suite for Trello, using Cypress 13, JavaScript, and Cucumber. The test scenarios cover the following workflow:

- Login to a Trello account via Google authentication using Cypress sessions and origins.
- Create a new board.
- Create a set of lists within the board.
- Add cards to a given list.
- Update, drag and drop a card, and check for updates on a card.
- Reset test data using Trello API.

## Prerequisites

Before running the tests, make sure you have the following installed:

- [Node.js](https://nodejs.org/)
- [Cypress](https://docs.cypress.io/guides/getting-started/installing-cypress.html)

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/cypress-trello-automation.git
   
2. Install dependencies:
   cd cypress-trello-automation
   npm install
   
3.Configuration
Edit your Trello account info in the 'cypress.config.js' file
   env: {
 authInfo:     {
    "username": "your_trello_username",
    "password": "your_trello_password"
   }
  }

4. Trello API Configuration

To interact with the Trello API for resetting test data, you'll need to set up your Trello API key and token. Follow these steps:

### 1. Obtain Trello API Key

1. Log in to your Trello account.
2. Visit [Trello Developer](https://trello.com/app-key) and log in.
3. Copy the API key displayed on the page.

### 2. Generate Trello API Token

1. Using the API key obtained in the previous step, visit the following URL (replace `YOUR_API_KEY` with your actual API key):
https://trello.com/1/authorize?key=YOUR_API_KEY&name=Cypress+Test+App&expiration=never&response_type=token&scope=read,write

### 3. Add Trello API info to the project

Edit your Trello API token and key in the 'cypress.config.js' file
   env: {
 trelloApi:     {
    "key": "your_trello_username",
    "token": "your_trello_password"
   }
  }

## Running tests
Run the tests using the comman:
   npx cypress open

This will open the Cypress Test Runner. Click on the desired feature file to run the scenarios.


**Contributors**
yosra dammak
Any other contributors
Feel free to contribute to this project by creating issues, submitting pull requests, or providing feedback.

Happy testing!


