const FormField = require('dw/web/FormField');
const FormGroup = require('dw/web/FormGroup');
const FormsLoader = require('../forms/FormsLoader');

class Session {
  _locale = 'default';

  get locale() {
    return {
      id: this._locale,
    };
  }

  set locale(locale) {
    this._locale = locale;
  }

  setLocale(locale) {
    this._locale = locale;
  }

  get forms() {
    return this._formsAccessor;
  }

  get sourceCodeInfo() {
    return {};
  }

  get clickStream() {
    return {
      clicks: [
        {
          pipelineName: 'Foo-Bar',
          queryString: '',
        },
        {
          pipelineName: 'Search-ShowAjax',
          queryString:
            'cgid=womens-clothing-tops&prefn1=refinementColor&prefv1=Blue&start=12&sz=12&selectedUrl=qwertyuiop',
        },
        {
          pipelineName: 'Product-Show',
          queryString: 'qwertyuiopiutrewerty',
        },
        {
          pipelineName: 'Search-Show',
          queryString: 'cgid=womens-clothing-tops',
        },
      ],
    };
  }

  get raw() {
    return {
      setTrackingAllowed() {},
    };
  }

  get currency() {
    return {
      currencyCode: 'XYZ',
      defaultFractionDigits: 10,
      name: 'Volodin Dollars',
      symbol: '៛',
    };
  }

  constructor(privacyCache) {
    this.privacyCache = privacyCache;
    this._formsAccessor = FormsLoader.getAccessor();
  }
}

module.exports = Session;
