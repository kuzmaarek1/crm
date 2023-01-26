const { defineConfig } = require("cypress");
const webpackPreprocessor = require("@cypress/webpack-preprocessor");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      const options = {
        webpackOptions: require("./webpack.config"),
        watchOptions: {},
      };

      on("file:preprocessor", webpackPreprocessor(options));
    },
  },
});
