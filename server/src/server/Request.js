class Request {
  error = {};

  get queryString() {
    return this.expressRequest.query;
  }

  get querystring() {
    return this.expressRequest.query;
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
    };
  }

  get locale() {
    return {
      id: 'en_US',
    };
  }

  get currentCustomer() {
    return {
      profile: {
        email: 'abc@test.com',
      },
      addressBook: {
        addresses: [],
        preferredAddress: {
          address1: '5 Wall St.',
        },
      },
      raw: {
        getOrderHistory: function () {
          return {
            getOrders: function () {
              return {
                first: function () {
                  return null;
                },
              };
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

  constructor(expressRequest, customer, session) {
    this.expressRequest = expressRequest;
    this.customer = customer;
    this.session = session;
  }
}

module.exports = Request;
