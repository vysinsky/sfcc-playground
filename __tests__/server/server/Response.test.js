const { realpathSync } = require('fs');

const Request = require('../../../server/src/server/Request');
const Response = require('../../../server/src/server/Response');

describe('Response', () => {
  test('toJson with no calls on response', () => {
    const response = new Response();

    expect(response.toJson()).toMatchInlineSnapshot(`
      Object {
        "cachePeriod": undefined,
        "cachePeriodUnit": undefined,
        "contentType": undefined,
        "events": Array [],
        "httpHeaders": Object {},
        "isJson": false,
        "isXml": false,
        "messageLog": Array [],
        "redirectStatus": undefined,
        "redirectUrl": undefined,
        "renderings": Array [],
        "statusCode": undefined,
        "view": undefined,
        "viewData": Object {},
      }
    `);
  });

  test('toJson with some calls on response', () => {
    global.request = new Request(
      { query: {} },
      {},
      {
        _locale: 'default',
        get locale() {
          return { id: this._locale };
        },
        set locale(locale) {
          this._locale = locale;
        },
      }
    );
    const response = new Response();
    response.currentCartridge = 'test_cartridge';
    global.playgroundConfig = {
      cartridgePath: 'cartridge_a',
      cartridgesDir: realpathSync(`${__dirname}/../../../__mocks__/cartridges`),
    };

    response.log('Some message', 'to log');
    response.json({ render: 'this json' });
    response.render('template', { view: 'data' });
    response.print('<h2>Print some HTML</h2>');
    response.setHttpHeader('X-Some-Header', '42');
    response.cachePeriod = 10;
    response.cachePeriodUnit = 'minutes';

    expect(response.toJson()).toMatchInlineSnapshot(`
      Object {
        "cachePeriod": 10,
        "cachePeriodUnit": "minutes",
        "contentType": undefined,
        "events": Array [],
        "httpHeaders": Object {
          "X-Some-Header": "42",
        },
        "isJson": true,
        "isXml": false,
        "messageLog": Array [
          Object {
            "cartridge": "test_cartridge",
            "message": "Some message to log",
          },
        ],
        "redirectStatus": undefined,
        "redirectUrl": undefined,
        "renderings": Array [
          Object {
            "message": "<h2>Print some HTML</h2>",
            "renderedFrom": "test_cartridge",
            "type": "print",
          },
        ],
        "statusCode": undefined,
        "view": "template",
        "viewData": Object {
          "render": Object {
            "lastUpdateFrom": "test_cartridge",
            "value": "this json",
          },
          "view": Object {
            "lastUpdateFrom": "test_cartridge",
            "value": "data",
          },
        },
      }
    `);
  });

  test('toJson with some other calls on response', () => {
    const response = new Response();
    global.playgroundConfig = {
      cartridgePath: 'cartridge_a',
    };
    response.currentCartridge = 'test_cartridge';

    response.log('Some message', 'to log');
    response.log('Message with object', { foo: 'bar' });
    response.xml('<xml><document></document></xml>');
    response.setHttpHeader('X-Some-Header', '42');
    response.cachePeriod = 20;
    response.cachePeriodUnit = 'seconds';
    response.cacheExpiration(60);
    response.setStatusCode(404);
    response.setContentType('text/html');
    response.setRedirectStatus(301);
    response.redirect('redirect.url');

    expect(response.toJson()).toMatchInlineSnapshot(`
      Object {
        "cachePeriod": 60,
        "cachePeriodUnit": "seconds",
        "contentType": "text/html",
        "events": Array [],
        "httpHeaders": Object {
          "X-Some-Header": "42",
        },
        "isJson": false,
        "isXml": true,
        "messageLog": Array [
          Object {
            "cartridge": "test_cartridge",
            "message": "Some message to log",
          },
          Object {
            "cartridge": "test_cartridge",
            "message": "Message with object {\\"foo\\":\\"bar\\"}",
          },
        ],
        "redirectStatus": 301,
        "redirectUrl": "redirect.url",
        "renderings": Array [
          Object {
            "data": "<xml><document></document></xml>",
            "renderedFrom": "test_cartridge",
            "subType": "xml",
            "type": "render",
          },
        ],
        "statusCode": 404,
        "view": undefined,
        "viewData": Object {
          "xml": Object {
            "lastUpdateFrom": "test_cartridge",
            "value": "<xml><document></document></xml>",
          },
        },
      }
    `);
  });

  test('setViewData properly deep merges', () => {
    const response = new Response();
    response.currentCartridge = 'test_cartridge';
    response.setViewData({ foo: 'bar', some: { object: 'data' } });
    response.setViewData({ foo2: 'bar2', some: { object2: 'data' } });

    expect(response.getViewData()).toMatchInlineSnapshot(`
      Object {
        "foo": Object {
          "lastUpdateFrom": "test_cartridge",
          "value": "bar",
        },
        "foo2": Object {
          "lastUpdateFrom": "test_cartridge",
          "value": "bar2",
        },
        "some": Object {
          "lastUpdateFrom": "test_cartridge",
          "value": Object {
            "object": "data",
            "object2": "data",
          },
        },
      }
    `);
  });

  test('emit', () => {
    const response = new Response();
    response.currentCartridge = 'test_cartridge';

    response.emit('route:Test', { some: 'object' }, 'string value', 42);
    response.emit('route:Test2');

    expect(response.events).toMatchInlineSnapshot(`
      Array [
        Object {
          "arguments": Array [
            "{ some: 'object' }",
            "'string value'",
            "42",
          ],
          "calledFrom": "test_cartridge",
          "event": "route:Test",
          "listeners": 0,
        },
        Object {
          "arguments": Array [],
          "calledFrom": "test_cartridge",
          "event": "route:Test2",
          "listeners": 0,
        },
      ]
    `);
  });

  test('render page', () => {
    const response = new Response();
    response.currentCartridge = 'test_cartridge';

    response.page('some-page', { page: 'data' }, {});

    expect(response.toJson()).toMatchInlineSnapshot(`
      Object {
        "cachePeriod": undefined,
        "cachePeriodUnit": undefined,
        "contentType": undefined,
        "events": Array [],
        "httpHeaders": Object {},
        "isJson": false,
        "isXml": false,
        "messageLog": Array [],
        "redirectStatus": undefined,
        "redirectUrl": undefined,
        "renderings": Array [
          Object {
            "aspectAttributes": Object {},
            "page": "some-page",
            "renderedFrom": "test_cartridge",
            "subType": "page",
            "type": "render",
          },
        ],
        "statusCode": undefined,
        "view": undefined,
        "viewData": Object {
          "page": Object {
            "lastUpdateFrom": "test_cartridge",
            "value": "data",
          },
        },
      }
    `);
  });
});
