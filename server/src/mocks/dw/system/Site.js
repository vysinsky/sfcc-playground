const OrigSite = require('dw-api-mock/dw/system/Site');

class Site extends OrigSite {
  static current = () => Site.getCurrent();
}

module.exports = Site;
