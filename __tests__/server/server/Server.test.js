const server = require('../../../server/src/server/Server');
const metadataRegistry = require('../../../server/src/analyzer/MetadataRegistry');

describe('Server', () => {
  beforeEach(() => {
    metadataRegistry.currentCaller = 'Home';
    metadataRegistry.currentCartridge = 'test_cartridge';
    server.clearRoutes();
  });

  test('get', () => {
    server.get('Show', { fn: 'get.show' });

    expect(server.exports()).toMatchInlineSnapshot(`
      Object {
        "Show": [Function],
        "__routes": Object {
          "Show": Route {
            "chain": Array [
              Object {
                "cartridge": "test_cartridge",
                "fn": "middleware.get",
              },
              Object {
                "cartridge": "test_cartridge",
                "fn": "get.show",
              },
            ],
            "name": "Show",
          },
        },
      }
    `);
  });

  test('get throws error when route exists', () => {
    server.get('Show', { fn: 'get.show' });

    expect(() => {
      server.get('Show', () => {});
    }).toThrow('Route with this name (Show) already exists');
  });

  test('post', () => {
    server.post('Show', { fn: 'post.show' });

    expect(server.exports()).toMatchInlineSnapshot(`
      Object {
        "Show": [Function],
        "__routes": Object {
          "Show": Route {
            "chain": Array [
              Object {
                "cartridge": "test_cartridge",
                "fn": "middleware.post",
              },
              Object {
                "cartridge": "test_cartridge",
                "fn": "post.show",
              },
            ],
            "name": "Show",
          },
        },
      }
    `);
  });

  test('prepend', () => {
    server.get('Show', { fn: 'original.home' });
    server.prepend('Show', { fn: 'prepend.home' });

    expect(server.exports()).toMatchInlineSnapshot(`
      Object {
        "Show": [Function],
        "__routes": Object {
          "Show": Route {
            "chain": Array [
              Object {
                "cartridge": "test_cartridge",
                "fn": "prepend.home",
              },
              Object {
                "cartridge": "test_cartridge",
                "fn": "middleware.get",
              },
              Object {
                "cartridge": "test_cartridge",
                "fn": "original.home",
              },
            ],
            "name": "Show",
          },
        },
      }
    `);
  });

  test('append', () => {
    server.get('Show', { fn: 'original.home' });
    server.append('Show', { fn: 'append.home' });

    expect(server.exports()).toMatchInlineSnapshot(`
      Object {
        "Show": [Function],
        "__routes": Object {
          "Show": Route {
            "chain": Array [
              Object {
                "cartridge": "test_cartridge",
                "fn": "middleware.get",
              },
              Object {
                "cartridge": "test_cartridge",
                "fn": "original.home",
              },
              Object {
                "cartridge": "test_cartridge",
                "fn": "append.home",
              },
            ],
            "name": "Show",
          },
        },
      }
    `);
  });

  test('replace', () => {
    server.get('Show', { fn: 'handler.to.be.replaced' });
    server.replace('Show', { fn: 'actual.handler' });

    expect(server.exports()).toMatchInlineSnapshot(`
      Object {
        "Show": [Function],
        "__routes": Object {
          "Show": Route {
            "chain": Array [
              Object {
                "cartridge": "test_cartridge",
                "fn": "actual.handler",
              },
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
    server.get('Show', { fn: 'superModule.Show' });
    const superModule = server.exports();
    server.clearRoutes();

    server.extend(superModule);

    server.prepend('Show', { fn: 'extend.Show.prepend' });
    server.append('Show', { fn: 'extend.Show.append' });
    server.get('ErrorNotFound', { fn: 'extend.ErrorNotFound.get' });

    expect(server.exports()).toMatchInlineSnapshot(`
      Object {
        "ErrorNotFound": [Function],
        "Show": [Function],
        "__routes": Object {
          "ErrorNotFound": Route {
            "chain": Array [
              Object {
                "cartridge": "test_cartridge",
                "fn": "middleware.get",
              },
              Object {
                "cartridge": "test_cartridge",
                "fn": "extend.ErrorNotFound.get",
              },
            ],
            "name": "ErrorNotFound",
          },
          "Show": Route {
            "chain": Array [
              Object {
                "cartridge": "test_cartridge",
                "fn": "extend.Show.prepend",
              },
              Object {
                "cartridge": "test_cartridge",
                "fn": "middleware.get",
              },
              Object {
                "cartridge": "test_cartridge",
                "fn": "superModule.Show",
              },
              Object {
                "cartridge": "test_cartridge",
                "fn": "extend.Show.append",
              },
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
