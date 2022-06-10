const server = require('../../../server/src/server/Server');
const metadataRegistry = require('../../../server/src/analyzer/MetadataRegistry');

describe('Server', () => {
  beforeEach(() => {
    metadataRegistry.currentCaller = 'Home';
    server.clearRoutes();
  });

  test('get', () => {
    server.get('Show', () => {});

    expect(server.exports()).toMatchInlineSnapshot(`
      Object {
        "Show": [Function],
        "__routes": Object {
          "Show": Route {
            "chain": Array [
              "middleware.get",
              [Function],
            ],
            "name": "Show",
          },
        },
      }
    `);
  });

  test('get throws error when route exists', () => {
    server.get('Show', () => {});

    expect(() => {
      server.get('Show', () => {});
    }).toThrow('Route with this name (Show) already exists');
  });

  test('post', () => {
    server.post('Show', () => {});

    expect(server.exports()).toMatchInlineSnapshot(`
      Object {
        "Show": [Function],
        "__routes": Object {
          "Show": Route {
            "chain": Array [
              "middleware.post",
              [Function],
            ],
            "name": "Show",
          },
        },
      }
    `);
  });

  test('prepend', () => {
    server.get('Show', 'original.home');
    server.prepend('Show', 'prepend.home');

    expect(server.exports()).toMatchInlineSnapshot(`
      Object {
        "Show": [Function],
        "__routes": Object {
          "Show": Route {
            "chain": Array [
              "prepend.home",
              "middleware.get",
              "original.home",
            ],
            "name": "Show",
          },
        },
      }
    `);
  });

  test('append', () => {
    server.get('Show', 'original.home');
    server.append('Show', 'append.home');

    expect(server.exports()).toMatchInlineSnapshot(`
      Object {
        "Show": [Function],
        "__routes": Object {
          "Show": Route {
            "chain": Array [
              "middleware.get",
              "original.home",
              "append.home",
            ],
            "name": "Show",
          },
        },
      }
    `);
  });

  test('replace', () => {
    server.get('Show', 'handler.to.be.replaced');
    server.replace('Show', 'actual.handler');

    expect(server.exports()).toMatchInlineSnapshot(`
      Object {
        "Show": [Function],
        "__routes": Object {
          "Show": Route {
            "chain": Array [
              "actual.handler",
            ],
            "name": "Show",
          },
        },
      }
    `);
  });

  test('prepend throws error if route does not exist', () => {
    expect(() => {
      server.prepend('Show', 'prepend.home');
    }).toThrow('Route with this name (Show) does not exist');
  });

  test('append throws error if route does not exist', () => {
    expect(() => {
      server.append('Show', 'append.home');
    }).toThrow('Route with this name (Show) does not exist');
  });

  test('replace throws error if route does not exist', () => {
    expect(() => {
      server.replace('Show', 'replace.home');
    }).toThrow('Route with this name (Show) does not exist');
  });

  test('extend', () => {
    server.get('Show', 'superModule.Show');
    const superModule = server.exports();
    server.clearRoutes();

    server.extend(superModule);

    server.prepend('Show', 'extend.Show.prepend');
    server.append('Show', 'extend.Show.append');
    server.get('ErrorNotFound', 'extend.ErrorNotFound.get');

    expect(server.exports()).toMatchInlineSnapshot(`
      Object {
        "ErrorNotFound": [Function],
        "Show": [Function],
        "__routes": Object {
          "ErrorNotFound": Route {
            "chain": Array [
              "middleware.get",
              "extend.ErrorNotFound.get",
            ],
            "name": "ErrorNotFound",
          },
          "Show": Route {
            "chain": Array [
              "extend.Show.prepend",
              "middleware.get",
              "superModule.Show",
              "extend.Show.append",
            ],
            "name": "Show",
          },
        },
      }
    `);
  });

  test('extend throws on invalid server object', () => {
    expect(() => {
      server.extend({});
    }).toThrow('Cannot extend non-valid server object');
  });

  test('extend throws if server has no routes', () => {
    expect(() => {
      server.extend({
        __routes: [],
      });
    }).toThrow('Cannot extend server without routes');
  });
});
