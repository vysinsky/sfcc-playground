const metadataRegistry = require('../../../server/src/analyzer/MetadataRegistry');

describe('MetadataRegistry', function () {
  beforeEach(() => {
    metadataRegistry.data = {};
  });

  test('collect', () => {
    metadataRegistry.currentCaller = 'Home';
    metadataRegistry.collect('Show', { method: 'GET' });
    metadataRegistry.collect('ErrorNotFound', { method: 'GET' });

    expect(metadataRegistry.getCallerMetadata('Home')).toMatchInlineSnapshot(`
      Object {
        "ErrorNotFound": Object {
          "method": "GET",
        },
        "Show": Object {
          "method": "GET",
        },
      }
    `);
  });

  test('collect if missing', () => {
    metadataRegistry.currentCaller = 'Home';
    metadataRegistry.collect('Show', { method: 'GET' });
    metadataRegistry.collect('ErrorNotFound', { method: 'GET' });
    metadataRegistry.collectIfMissing('Show', { method: 'POST' });
    metadataRegistry.collectIfMissing('Show2', { method: 'GET' });

    expect(metadataRegistry.getCallerMetadata('Home')).toMatchInlineSnapshot(`
      Object {
        "ErrorNotFound": Object {
          "method": "GET",
        },
        "Show": Object {
          "method": "GET",
        },
        "Show2": Object {
          "method": "GET",
        },
      }
    `);
  });
});
