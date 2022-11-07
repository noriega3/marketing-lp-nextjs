const { defineConfig } = require("cypress");

module.exports = defineConfig({
  env:{
    NO_COLOR: 1
  },
  video: false,
  e2e: {},
});
