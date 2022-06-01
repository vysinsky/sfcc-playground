const ArrayList = require('../../../../../sfra/test/mocks/dw.util.Collection');

function getCurrentBasket() {
  return {
    defaultShipment: {
      shippingAddress: {
        firstName: 'Amanda',
        lastName: 'Jones',
        address1: '65 May Lane',
        address2: '',
        city: 'Allston',
        postalCode: '02135',
        countryCode: { value: 'us' },
        phone: '617-555-1234',
        stateCode: 'MA',

        setFirstName: function (firstNameInput) {
          this.firstName = firstNameInput;
        },
        setLastName: function (lastNameInput) {
          this.lastName = lastNameInput;
        },
        setAddress1: function (address1Input) {
          this.address1 = address1Input;
        },
        setAddress2: function (address2Input) {
          this.address2 = address2Input;
        },
        setCity: function (cityInput) {
          this.city = cityInput;
        },
        setPostalCode: function (postalCodeInput) {
          this.postalCode = postalCodeInput;
        },
        setStateCode: function (stateCodeInput) {
          this.stateCode = stateCodeInput;
        },
        setCountryCode: function (countryCodeInput) {
          this.countryCode.value = countryCodeInput;
        },
        setPhone: function (phoneInput) {
          this.phone = phoneInput;
        },
      },
    },
    totalGrossPrice: {
      value: 250.0,
    },
    productLineItems: new ArrayList(),
    shipments: new ArrayList(),
    allLineItems: new ArrayList(),
    couponLineItems: new ArrayList(),
    priceAdjustments: new ArrayList(),
    allShippingPriceAdjustments: new ArrayList(),
    bonusDiscountLineItems: new ArrayList([
      {
        UUID: 'someUUID',
        getBonusProductPrice: function () {
          return {
            toFormattedString: function () {
              return 'someFormattedString';
            },
          };
        },
      },
    ]),
    getBonusDiscountLineItems: function () {
      return this.bonusDiscountLineItems;
    },
    getShipments() {
      return this.shipments;
    },
    updateCurrency() {},
    getAdjustedMerchandizeTotalPrice() {
      return {
        available: true,
        subtract() {
          return { value: 0 };
        },
      };
    },
    shippingTotalPrice: {
      subtract() {
        return { value: 0 };
      },
    },
  };
}

module.exports = {
  getCurrentBasket: getCurrentBasket,
  getCurrentOrNewBasket: getCurrentBasket,
};
