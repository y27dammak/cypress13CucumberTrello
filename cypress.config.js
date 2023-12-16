const { defineConfig } = require("cypress");
const createBundler = require("@bahmutov/cypress-esbuild-preprocessor");

const preprocessor = require("@badeball/cypress-cucumber-preprocessor");

const createEsbuildPlugin = require("@badeball/cypress-cucumber-preprocessor/esbuild");

const setupNodeEvents = async (on, config) => {
  await preprocessor.addCucumberPreprocessorPlugin(on, config);

  on(
    "file:preprocessor",

    createBundler({
      plugins: [createEsbuildPlugin.default(config)],
    })
  );

  return config;
};
module.exports = defineConfig({
  projectId: 'q251mo',
  retries:0,
  experimentalModifyObstructiveThirdPartyCode: true,

  e2e: {
    setupNodeEvents,
    specPattern: "**/*.feature",
    excludeSpecPattern: ["*.js"],
    baseUrl: "https://trello.com",

    env: {  

      authInfo:{
        username: 'testyos2212@gmail.com',
        password: 'Trell@YD2023'
      },


      trelloApi: {
        key: "f138cee858abb74af6661e89909ecc33",
        token:
          "ATTA1aaebb0b24671a9bad9ae36b25cdfe89c0617190722cfb0c52afcc74da395da1909790D7",
      },
    },
  },
});
