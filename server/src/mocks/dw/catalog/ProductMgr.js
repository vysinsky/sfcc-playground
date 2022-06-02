const Product = require('dw/catalog/Product');
const ProductMgr = function () {};

ProductMgr.getProduct = function () {
  return new Product();
};

ProductMgr.queryAllSiteProducts = function () {};
ProductMgr.queryProductsInCatalog = function () {};
ProductMgr.queryAllSiteProductsSorted = function () {};
ProductMgr.queryProductsInCatalogSorted = function () {};
ProductMgr.prototype.product = null;

module.exports = ProductMgr;
