const { defineConfig } = require('cypress')

module.exports = defineConfig({
  reporter: 'cypress-mochawesome-reporter',
   e2e: {
    // We've imported your old cypress plugins here.
    // You may want to clean this up later by importing these.
    baseUrl: 'https://transfermate.io/en/register.asp?/',
    experimentalStudio: true,
    waitForAnimations: true,
 	  testIsolation: false,
    defaultCommandTimeout: 60000,
    pageLoadTimeout : 15000,
    viewportWidth: 1360,
    viewportHeight: 790,
    setupNodeEvents(on, config) {
      require('cypress-mochawesome-reporter/plugin')(on);
    },
  },
})
