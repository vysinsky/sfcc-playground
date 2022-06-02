const ArrayList = require('dw/util/ArrayList');

const ShipmentShippingModel = function () {};

ShipmentShippingModel.prototype.getApplicableShippingMethods = function () {
  return this.prototype.applicableShippingMethods;
};
ShipmentShippingModel.prototype.getInapplicableShippingMethods = function () {};
ShipmentShippingModel.prototype.getShippingCost = function () {};
ShipmentShippingModel.prototype.applicableShippingMethods = new ArrayList();
ShipmentShippingModel.prototype.inapplicableShippingMethods = null;
ShipmentShippingModel.prototype.shippingCost = null;

module.exports = ShipmentShippingModel;
