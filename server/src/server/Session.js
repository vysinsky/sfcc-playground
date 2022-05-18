const SimpleCache = require('*/modules/server/simpleCache');

class Session {
  constructor() {
    this.privacyCache = new SimpleCache({});
  }
}

module.exports = Session;
