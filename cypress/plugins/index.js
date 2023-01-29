/// <reference types="cypress" />
// ***********************************************************
const reporter = require("cypress-mochawesome-reporter/plugin");

/**
 * @type {Cypress.PluginConfig}
 */
// eslint-disable-next-line no-unused-vars
module.exports = (on, config) => {
  require('cypress-mochawesome-reporter/plugin')(on);
};