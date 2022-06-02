var CustomerMgr = function () {};

const Customer = require('dw/customer/Customer');
const CustomerList = require('dw/customer/CustomerList');
const customerList = new CustomerList();

CustomerMgr.getCustomerGroups = function () {};
CustomerMgr.getProfile = function () {};
CustomerMgr.describeProfileType = function () {};
CustomerMgr.getRegisteredCustomerCount = function () {};
CustomerMgr.queryProfile = function () {};
CustomerMgr.processProfiles = function () {};
CustomerMgr.queryProfiles = function () {};
CustomerMgr.searchProfile = function () {};
CustomerMgr.searchProfiles = function () {};
CustomerMgr.getCustomerGroup = function () {};
CustomerMgr.createExternallyAuthenticatedCustomer = function () {};
CustomerMgr.getExternallyAuthenticatedCustomerProfile = function () {};
CustomerMgr.loginExternallyAuthenticatedCustomer = function () {};
CustomerMgr.getCustomerByCustomerNumber = function () {
  return new Customer();
};
CustomerMgr.createCustomer = function () {};
CustomerMgr.getSiteCustomerList = () => customerList;
CustomerMgr.authenticateCustomer = function () {
  return { status: 'AUTH_OK' };
};
CustomerMgr.loginCustomer = function () {
  return { authenticatedCustomer: {} };
};
CustomerMgr.logoutCustomer = function () {};
CustomerMgr.getCustomerByToken = function () {};
CustomerMgr.isAcceptablePassword = function () {
  return true;
};
CustomerMgr.prototype.customerGroups = null;
CustomerMgr.prototype.profile = null;
CustomerMgr.prototype.registeredCustomerCount = null;
CustomerMgr.prototype.customerGroup = null;
CustomerMgr.prototype.externallyAuthenticatedCustomerProfile = null;
CustomerMgr.prototype.getCustomerByCustomerNumber = null;
CustomerMgr.prototype.createCustomer = null;
CustomerMgr.prototype.siteCustomerList = customerList;

module.exports = CustomerMgr;
