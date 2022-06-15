const { existsSync } = require('fs');

function moduleExists(requestedModule) {
  if (existsSync(requestedModule)) {
    return requestedModule;
  }
  if (existsSync(`${requestedModule}.js`)) {
    return `${requestedModule}.js`;
  }
  if (existsSync(`${requestedModule}.json`)) {
    return `${requestedModule}.json`;
  }

  return false;
}

module.exports = {
  moduleExists,
};
