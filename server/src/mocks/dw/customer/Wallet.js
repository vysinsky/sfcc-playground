var _super = require('dw/customer/EncryptedObject');

var Wallet = function () {};

Wallet.prototype = new _super();

Wallet.createPaymentInstrument = function () {};
Wallet.getPaymentInstrument = function () {};
Wallet.getPaymentInstruments = function () {};
Wallet.removePaymentInstrument = function () {};

Wallet.prototype.createPaymentInstrument = function () {};
Wallet.prototype.getPaymentInstrument = function () {};
Wallet.prototype.getPaymentInstruments = function () {
  return [];
};
Wallet.prototype.removePaymentInstrument = function () {};

module.exports = Wallet;
