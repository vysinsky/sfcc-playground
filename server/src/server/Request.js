const ArrayList = require('../mocks/dw/util/ArrayList');

class Request {
  error = {};

  _locale = 'default';

  get queryString() {
    return this.querystring;
  }

  get querystring() {
    return {
      ...this.expressRequest.query,
      components: '[]',
      pids: '{"bonusProducts": []}',
      data: '{}',
      Location: { stringValue: '' },
    };
  }

  get https() {
    return this.expressRequest.query.simulateHttps === 'true';
  }

  get httpMethod() {
    return this.expressRequest.method;
  }

  get pageMetaData() {
    return {
      pageMetaTags: [],
      addPageMetaTags() {},
      setTitle() {},
    };
  }

  get locale() {
    return {
      id: this._locale,
    };
  }

  get currentCustomer() {
    return {
      profile: {
        email: 'abc@test.com',
      },
      wallet: {
        paymentInstruments: [],
        removePaymentInstrument() {},
      },
      addressBook: new (require('dw/customer/AddressBook'))(),
      raw: {
        getOrderHistory: function () {
          return {
            getOrders: function () {
              const r = new ArrayList().iterator();

              r.first = function () {};

              return r;
            },
          };
        },
      },
    };
  }

  get form() {
    return {};
  }

  get includeRequest() {
    return true;
  }

  get geolocation() {
    return {};
  }

  get httpHeaders() {
    return this.expressRequest;
  }

  constructor(expressRequest, customer, session) {
    this.expressRequest = expressRequest;
    this.customer = customer;
    this.session = session;
    this._locale = expressRequest.query.lang || 'default';
  }

  setLocale(locale) {
    this._locale = locale;
  }
}

module.exports = Request;
