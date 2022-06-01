const Catalog = require('dw/catalog/Catalog');
const Iterator = require('dw/util/Iterator');

var CatalogMgr = function () {};

CatalogMgr.getCatalog = function () {};
CatalogMgr.getSiteCatalog = function () {
  return new Catalog();
};
CatalogMgr.getCategory = function () {};
CatalogMgr.getSortingRules = function () {};
CatalogMgr.getSortingRule = function () {};
CatalogMgr.getSortingOptions = function () {
  return new Iterator([]);
};
CatalogMgr.getSortingOption = function () {};
CatalogMgr.prototype.catalog = null;
CatalogMgr.prototype.siteCatalog = null;
CatalogMgr.prototype.category = null;
CatalogMgr.prototype.sortingRules = null;
CatalogMgr.prototype.sortingRule = null;
CatalogMgr.prototype.sortingOptions = null;
CatalogMgr.prototype.sortingOption = null;

module.exports = CatalogMgr;
