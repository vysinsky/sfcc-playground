const Iterator = require('dw/util/Iterator');

var AddressBook = function () {};

const address = {
  address1: '15 South Point Drive',
  address2: null,
  city: 'Boston',
  countryCode: {
    displayValue: 'United States',
    value: 'US',
  },
  firstName: 'John',
  lastName: 'Snow',
  ID: 'Home',
  postalCode: '02125',
  stateCode: 'MA',
};

AddressBook.prototype.getAddress = function () {
  return this.address;
};
AddressBook.prototype.getAddress1 = function () {
  return this.address1;
};
AddressBook.prototype.setAddress1 = function () {};
AddressBook.prototype.getAddress2 = function () {
  return this.address2;
};
AddressBook.prototype.setAddress2 = function () {};
AddressBook.prototype.createAddress = function () {};
AddressBook.prototype.removeAddress = function () {};
AddressBook.prototype.getPreferredAddress = function () {};
AddressBook.prototype.getAddresses = function () {
  return new Iterator([]);
};
AddressBook.prototype.setPreferredAddress = function () {};
AddressBook.prototype.getCountryCode = function () {};
AddressBook.prototype.setCountryCode = function () {};
AddressBook.prototype.getPostalCode = function () {};
AddressBook.prototype.setPostalCode = function () {};
AddressBook.prototype.getCity = function () {};
AddressBook.prototype.setCity = function () {};
AddressBook.prototype.address = {
  getUUID() {
    return 'uuid';
  },
};
AddressBook.prototype.address1 = address;
AddressBook.prototype.address2 = address;
AddressBook.prototype.preferredAddress = address;
AddressBook.prototype.addresses = [address];
AddressBook.prototype.countryCode = null;
AddressBook.prototype.postalCode = null;
AddressBook.prototype.city = null;

module.exports = AddressBook;
