class Request {
  error = {};

  get queryString() {
    return this.expressRequest.query;
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