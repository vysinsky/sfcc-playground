var _super = require('dw/object/ExtensibleObject');

var PaymentProcessor = function () {};

PaymentProcessor.prototype = new _super();

PaymentProcessor.prototype.getID = function () {
  return this.ID;
};
PaymentProcessor.prototype.getPreferenceValue = function () {};
PaymentProcessor.prototype.ID = 'paylap';
PaymentProcessor.prototype.preferenceValue = null;

module.exports = PaymentProcessor;
