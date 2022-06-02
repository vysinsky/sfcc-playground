var ProductPriceModel = function () {};

ProductPriceModel.prototype.getPrice = function () {};
ProductPriceModel.prototype.getPriceInfo = function () {};
ProductPriceModel.prototype.getBasePriceQuantity = function () {};
ProductPriceModel.prototype.getPriceTable = function () {
  return this.priceTable;
};
ProductPriceModel.prototype.getPriceBookPrice = function () {
  return this.priceBookPrice;
};
ProductPriceModel.prototype.getPriceBookPriceInfo = function () {
  return this.priceBookPriceInfo;
};
ProductPriceModel.prototype.getPricePercentage = function () {};
ProductPriceModel.prototype.getMinPrice = function () {};
ProductPriceModel.prototype.getMaxPrice = function () {};
ProductPriceModel.prototype.getMinPriceBookPrice = function () {};
ProductPriceModel.prototype.getMaxPriceBookPrice = function () {};
ProductPriceModel.prototype.isPriceRange = function () {};
ProductPriceModel.prototype.price = {
  valueOrNull: 100,
};
ProductPriceModel.prototype.priceInfo =
  new (require('dw/catalog/ProductPriceInfo'))();
ProductPriceModel.prototype.basePriceQuantity = null;
ProductPriceModel.prototype.priceTable =
  new (require('dw/catalog/ProductPriceTable'))();
ProductPriceModel.prototype.priceBookPrice = { available: true };
ProductPriceModel.prototype.priceBookPriceInfo = null;
ProductPriceModel.prototype.pricePercentage = null;
ProductPriceModel.prototype.minPrice = null;
ProductPriceModel.prototype.maxPrice = null;
ProductPriceModel.prototype.minPriceBookPrice = null;
ProductPriceModel.prototype.maxPriceBookPrice = null;

module.exports = ProductPriceModel;
