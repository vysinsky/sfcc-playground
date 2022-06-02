const ArrayList = require('dw/util/ArrayList');

function getCurrentBasket() {
  return {
    allProductLineItems: new ArrayList([
      {
        UUID: undefined,
        getOptionProductLineItems: function () {
          return new ArrayList();
        },
        bonusProductLineItems: new ArrayList([]),
        bonusProducts: new ArrayList([]),
        custom: {},
        quantityValue: 0,
        product: new (require('dw/catalog/Product'))(),
        bundledProductLineItems: new ArrayList([]),
      },
    ]),
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
      setShippingMethod: function () {},
      createShippingAddress: function () {},
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
        UUID: undefined,
        getBonusProductPrice: function () {
          return {
            toFormattedString: function () {
              return 'someFormattedString';
            },
          };
        },
        bonusProductLineItems: new ArrayList([]),
        bonusProducts: new ArrayList([]),
        custom: {},
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
    createBillingAddress() {
      return {
        setFirstName() {},
        setLastName() {},
        setAddress1() {},
        setAddress2() {},
        setCity() {},
        setPostalCode() {},
        setStateCode() {},
        setCountryCode() {},
        setPhone() {},
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
