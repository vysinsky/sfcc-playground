const Module = require('module');

class ActionsExtractor {
  extractControllerActions(filePath) {
    const controller = require(filePath);
    Module.prototype.superModule = controller;

    return Object.keys(controller).filter((v) => v !== '__routes');
  }
}

module.exports = new ActionsExtractor();
