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
        "viewData": undefined,
      }
    `);
  });

  test('toJson with some calls on response', () => {
    const response = new Response();
    global.playgroundConfig = {
      cartridgePath: 'cartridge_a',
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
          "Some message to log",
        ],
        "redirectStatus": undefined,
        "redirectUrl": undefined,
        "renderings": Array [
          Object {
            "message": "<h2>Print some HTML</h2>",
            "type": "print",
          },
        ],
        "statusCode": undefined,
        "view": "template",
        "viewData": Object {
          "render": "this json",
          "view": "data",
        },
      }
    `);
  });

  test('toJson with some other calls on response', () => {
    const response = new Response();
    global.playgroundConfig = {
      cartridgePath: 'cartridge_a',
    };

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
          "Some message to log",
          "Message with object {\\"foo\\":\\"bar\\"}",
        ],
        "redirectStatus": 301,
        "redirectUrl": "redirect.url",
        "renderings": Array [
          Object {
            "data": "<xml><document></document></xml>",
            "subType": "xml",
            "type": "render",
          },
        ],
        "statusCode": 404,
        "view": undefined,
        "viewData": Object {
          "xml": "<xml><document></document></xml>",
        },
      }
    `);
  });

  test('setViewData properly deep merges', () => {
    const response = new Response();
    response.setViewData({ foo: 'bar', some: { object: 'data' } });
    response.setViewData({ foo2: 'bar2', some: { object2: 'data' } });

    expect(response.getViewData()).toMatchInlineSnapshot(`
      Object {
        "foo": "bar",
        "foo2": "bar2",
        "some": Object {
          "object": "data",
          "object2": "data",
        },
      }
    `);
  });

  test('emit', () => {
    const response = new Response();

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
          "event": "route:Test",
        },
        Object {
          "arguments": Array [],
          "event": "route:Test2",
        },
      ]
    `);
  });

  test('render page', () => {
    const response = new Response();

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
            "subType": "page",
            "type": "render",
          },
        ],
        "statusCode": undefined,
        "view": undefined,
        "viewData": Object {
          "page": "data",
        },
      }
    `);
  });
});
