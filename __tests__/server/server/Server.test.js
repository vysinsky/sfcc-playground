const server = require('../../../server/src/server/Server');

describe('Server', () => {
  beforeEach(() => {
    server.clearRoutes();
  });

  test('get', () => {
    server.get('Home', () => {});

    expect(server.exports()).toMatchInlineSnapshot(`
      Object {
        "Home": [Function],
        "__routes": Object {
          "Home": Route {
            "chain": Array [
              "middleware.get",
              [Function],
            ],
            "name": "Home",
          },
        },
      }
    `);
  });

  test('get throws error when route exists', () => {
    server.get('Home', () => {});

    expect(() => {
      server.get('Home', () => {});
    }).toThrow('Route with this name (Home) already exists');
  });

  test('post', () => {
    server.post('Home', () => {});

    expect(server.exports()).toMatchInlineSnapshot(`
      Object {
        "Home": [Function],
        "__routes": Object {
          "Home": Route {
            "chain": Array [
              "middleware.post",
              [Function],
            ],
            "name": "Home",
          },
        },
      }
    `);
  });

  test('prepend', () => {
    server.get('Home', 'original.home');
    server.prepend('Home', 'prepend.home');

    expect(server.exports()).toMatchInlineSnapshot(`
      Object {
        "Home": [Function],
        "__routes": Object {
          "Home": Route {
            "chain": Array [
              "prepend.home",
              "middleware.get",
              "original.home",
            ],
            "name": "Home",
          },
        },
      }
    `);
  });

  test('append', () => {
    server.get('Home', 'original.home');
    server.append('Home', 'append.home');

    expect(server.exports()).toMatchInlineSnapshot(`
      Object {
        "Home": [Function],
        "__routes": Object {
          "Home": Route {
            "chain": Array [
              "middleware.get",
              "original.home",
              "append.home",
            ],
            "name": "Home",
          },
        },
      }
    `);
  });

  test('replace', () => {
    server.get('Home', 'handler.to.be.replaced');
    server.replace('Home', 'actual.handler');

    expect(server.exports()).toMatchInlineSnapshot(`
      Object {
        "Home": [Function],
        "__routes": Object {
          "Home": Route {
            "chain": Array [
              "actual.handler",
            ],
            "name": "Home",
          },
        },
      }
    `);
  });

  test('prepend throws error if route does not exist', () => {
    expect(() => {
      server.prepend('Home', 'prepend.home');
    }).toThrow('Route with this name (Home) does not exist');
  });

  test('append throws error if route does not exist', () => {
    expect(() => {
      server.append('Home', 'append.home');
    }).toThrow('Route with this name (Home) does not exist');
  });

  test('replace throws error if route does not exist', () => {
    expect(() => {
      server.replace('Home', 'replace.home');
    }).toThrow('Route with this name (Home) does not exist');
  });

  test('extend', () => {
    server.get('Home', 'superModule.Home');
    const superModule = server.exports();
    server.clearRoutes();

    server.extend(superModule);

    server.prepend('Home', 'extend.Home.prepend');
    server.append('Home', 'extend.Home.append');
    server.get('Show', 'extend.Show.get');

    expect(server.exports()).toMatchInlineSnapshot(`
      Object {
        "Home": [Function],
        "Show": [Function],
        "__routes": Object {
          "Home": Route {
            "chain": Array [
              "extend.Home.prepend",
              "middleware.get",
              "superModule.Home",
              "extend.Home.append",
            ],
            "name": "Home",
          },
          "Show": Route {
            "chain": Array [
              "middleware.get",
              "extend.Show.get",
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
