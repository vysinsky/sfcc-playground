var ProductPriceInfo = function () {};

ProductPriceInfo.prototype.getPercentage = function () {};
ProductPriceInfo.prototype.getPriceBook = function () {
  return this.priceBook;
};
ProductPriceInfo.prototype.getPrice = function () {};
ProductPriceInfo.prototype.getPriceInfo = function () {};
ProductPriceInfo.prototype.percentage = null;
ProductPriceInfo.prototype.priceBook = new (require('dw/catalog/PriceBook'))();
ProductPriceInfo.prototype.price = null;
ProductPriceInfo.prototype.priceInfo = null;

module.exports = ProductPriceInfo;
