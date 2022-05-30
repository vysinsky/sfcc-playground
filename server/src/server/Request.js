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
    };
  }

  constructor(expressRequest, customer, session) {
    this.expressRequest = expressRequest;
    this.customer = customer;
    this.session = session;
  }
}

module.exports = Request;
