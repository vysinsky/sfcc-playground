const SimpleCache = require('*/modules/server/simpleCache');

class Session {
  get forms() {
    return new Proxy(
      {},
      {
        get() {
          return {
            clearFormElement() {
              return {};
            },
          };
        },
      }
    );
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

  constructor() {
    this.privacyCache = new SimpleCache({});
  }
}

module.exports = Session;
