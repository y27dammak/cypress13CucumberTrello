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




