const cwd = process.cwd();
const path = require("path");

const nodePath = process.env.NODE_PATH || "src";

module.exports = {
  resolve: {
    modules: ["node_modules", path.resolve(cwd, nodePath)],
  },
};
