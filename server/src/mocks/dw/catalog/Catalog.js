var _super = require('dw/object/ExtensibleObject');
const Category = require('dw/catalog/Category');

var Catalog = function () {};

Catalog.prototype = new _super();

Catalog.prototype.getDisplayName = function () {};
Catalog.prototype.getID = function () {};
Catalog.prototype.getDescription = function () {};
Catalog.prototype.getRoot = function () {
  return this.root;
};
Catalog.prototype.displayName = null;
Catalog.prototype.ID = null;
Catalog.prototype.description = null;
Catalog.prototype.root = new Category();

module.exports = Catalog;
