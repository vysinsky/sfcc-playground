var ProductMgr = function () {};

ProductMgr.getProduct = function () {
  return new require('dw/catalog/Product');
};

ProductMgr.queryAllSiteProducts = function () {};
ProductMgr.queryProductsInCatalog = function () {};
ProductMgr.queryAllSiteProductsSorted = function () {};
ProductMgr.queryProductsInCatalogSorted = function () {};
ProductMgr.prototype.product = null;

module.exports = ProductMgr;
