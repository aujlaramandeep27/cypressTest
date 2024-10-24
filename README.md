# Nesto

Automated UI test script using **Cypress** with **Typescript** to test **Signup Functionality**.
This project is a boilerplate for end-to-end testing using Cypress with TypeScript. It provides a structured setup to help you get started quickly.

## Covered following cases:
1. Positive cases
2. Negative cases
3. Label validations
4. Field validations
5. Navigation validations
6. API response validation for successful account creation
7. Ability to run test script against selected **language** (English or French) and against English by **default**
8. Handled uncaught third party api **exceptions**

Created **Test Plan** and **Bugs Report** for discovered bugs in **Google Doc**

## Table of Contents

- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Project Structure](#project-structure)
- [Configuration](#configuration)
- [Running Tests](#running-tests)
- [Writing Tests](#writing-tests)

## Prerequisites

Before you begin, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (version 12 or later)
- [npm](https://www.npmjs.com/) (comes with Node.js)

## Installation

1. Clone this repository:

   ```bash
   git clone https://github.com/aujlaramandeep27/cypressTest.git
   cd cypressTest

2. Install the project dependencies:

    npm install

## Project Structure

The project follows a simple structure: 

    cypressTest
    ├──cypress/
        ├── e2e/            # End-to-End tests
        ├── fixtures/       # Test data files
        ├── support/        # Custom commands, page objects and global setup
        └── support/        # Custom commands and global setup
    └── cypress.config.ts   # Cypress configuration

## Running Tests

**Open Cypress Test Runner**

To open the Cypress Test Runner, run the following command:
    
    npm run cypress:open

This will launch the Cypress GUI, where you can run tests interactively.

**Run Tests in Headless Mode**

To run tests in headless mode, execute:
    
    npm run cypress:run

## Writing Tests

Cypress tests are written in `TypeScript` and stored in the `cypress/e2e/` directory.

**Custom Commands**

You can add custom commands in `cypress/support/commands.ts`
                