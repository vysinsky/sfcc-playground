const Request = require('../../../server/src/server/Request');

describe('Request', () => {
  const EXPRESS_REQUEST = {
    method: 'GET',
    query: {
      some: 'query',
      other: 'string',
    },
  };
  const CUSTOMER = {};
  const SESSION = {};

  let request;
  beforeEach(() => {
    request = new Request(EXPRESS_REQUEST, CUSTOMER, SESSION);
  });

  test('querystring getter', () => {
    expect(request.querystring).toMatchInlineSnapshot(`
      Object {
        "Location": Object {
          "stringValue": "",
        },
        "components": "[]",
        "data": "{}",
        "other": "string",
        "pids": "{\\"bonusProducts\\": []}",
        "some": "query",
      }
    `);
  });

  test('queryString getter', () => {
    expect(request.queryString).toMatchInlineSnapshot(`
      Object {
        "Location": Object {
          "stringValue": "",
        },
        "components": "[]",
        "data": "{}",
        "other": "string",
        "pids": "{\\"bonusProducts\\": []}",
        "some": "query",
      }
    `);
  });

  test('httpMethod getter', () => {
    expect(request.httpMethod).toBe('GET');
  });

  test('pageMetaData getter', () => {
    expect(request.pageMetaData).toMatchObject({ pageMetaTags: [] });
  });
});
