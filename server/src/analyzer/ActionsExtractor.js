class ActionsExtractor {
  extractControllerActions(filePath) {
    const controller = require(filePath);

    return Object.keys(controller).filter((v) => v !== '__routes');
  }
}

module.exports = new ActionsExtractor();
