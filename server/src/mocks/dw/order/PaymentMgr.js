var PaymentMgr = function () {};

PaymentMgr.getPaymentMethod = function () {
  return this.prototype.paymentMethod;
};
PaymentMgr.getApplicablePaymentMethods = function () {};
PaymentMgr.getPaymentCard = function () {};
PaymentMgr.getActivePaymentMethods = function () {};
PaymentMgr.prototype.paymentMethod = new (require('dw/order/PaymentMethod'))();
PaymentMgr.prototype.applicablePaymentMethods = null;
PaymentMgr.prototype.paymentCard = null;
PaymentMgr.prototype.activePaymentMethods = null;

module.exports = PaymentMgr;
