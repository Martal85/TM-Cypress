# Example with cypress

### Setup the project
- Install yarn - https://classic.yarnpkg.com/lang/en/docs/install/
- Clone repo and in the same directory run **yarn install** to install all dependencies for a project

### Run tests
- Run tests in headless mode execute **yarn run cypress**
- Run tests in cypress GUI execute **yarn run cypress:open**

Framework details:

1. App URL: https://transfermate.io/en/register.asp?
2. Framework and language: Cypress + Mocha
3. Language and model: page object model + js


Prerequest for the tests: Because there is a math CAPTCHA in order to run successfully the tests the user first should:

1. Disables the CAPTCHA in the testing environment before the test run or
2. Whitelists the IP addess for the CAPTCHA before the test run or
3. manualy enter the CAPTCHA during the wait pause
