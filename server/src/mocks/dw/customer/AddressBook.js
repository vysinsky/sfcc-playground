const Iterator = require('dw/util/Iterator');

var AddressBook = function () {};

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
AddressBook.prototype.address1 = null;
AddressBook.prototype.address2 = null;
AddressBook.prototype.preferredAddress = null;
AddressBook.prototype.addresses = null;
AddressBook.prototype.countryCode = null;
AddressBook.prototype.postalCode = null;
AddressBook.prototype.city = null;

module.exports = AddressBook;
