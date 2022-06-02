var ProductAvailabilityModel = function () {};

ProductAvailabilityModel.prototype.isOrderable = function () {};
ProductAvailabilityModel.prototype.getInventoryRecord = function () {
  this.inventoryRecord;
};
ProductAvailabilityModel.prototype.updateStockLevel = function () {};
ProductAvailabilityModel.prototype.getAvailabilityLevels = function () {
  return this.availabilityLevels;
};
ProductAvailabilityModel.prototype.getAvailabilityStatus = function () {};
ProductAvailabilityModel.prototype.getTimeToOutOfStock = function () {};
ProductAvailabilityModel.prototype.getAvailability = function () {};
ProductAvailabilityModel.prototype.getSKUCoverage = function () {};
ProductAvailabilityModel.prototype.isInStock = function () {};
ProductAvailabilityModel.prototype.inventoryRecord = {
  perpetual: false,
  ATS: {
    value: undefined,
  },
};
ProductAvailabilityModel.prototype.availabilityLevels = {
  inStock: {
    value: 0,
  },
  preorder: {
    value: 0,
  },
  backorder: {
    value: 0,
  },
  notAvailable: {
    value: 0,
  },
};
ProductAvailabilityModel.prototype.availabilityStatus = null;
ProductAvailabilityModel.prototype.timeToOutOfStock = null;
ProductAvailabilityModel.prototype.availability = null;
ProductAvailabilityModel.prototype.sKUCoverage = null;

module.exports = ProductAvailabilityModel;
