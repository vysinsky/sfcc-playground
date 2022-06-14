const metadataRegistry = require('../../../server/src/analyzer/MetadataRegistry');

describe('MetadataRegistry', function () {
  beforeEach(() => {
    metadataRegistry.data = {};
  });

  test('collect', () => {
    metadataRegistry.currentCaller = 'Home';
    metadataRegistry.currentCartridge = 'test_cartridge';
    metadataRegistry.collect('Show', { method: 'GET' });
    metadataRegistry.collect('ErrorNotFound', { method: 'GET' });

    expect(metadataRegistry.getCallerMetadata('Home')).toMatchInlineSnapshot(`
      Object {
        "ErrorNotFound": Object {
          "cartridge": "test_cartridge",
          "method": "GET",
        },
        "Show": Object {
          "cartridge": "test_cartridge",
          "method": "GET",
        },
      }
    `);
  });

  test('collect if missing', () => {
    metadataRegistry.currentCaller = 'Home';
    metadataRegistry.currentCartridge = 'test_cartridge';
    metadataRegistry.collect('Show', { method: 'GET' });
    metadataRegistry.collect('ErrorNotFound', { method: 'GET' });
    metadataRegistry.collectIfMissing('Show', { method: 'POST' });
    metadataRegistry.collectIfMissing('Show2', { method: 'GET' });

    expect(metadataRegistry.getCallerMetadata('Home')).toMatchInlineSnapshot(`
      Object {
        "ErrorNotFound": Object {
          "cartridge": "test_cartridge",
          "method": "GET",
        },
        "Show": Object {
          "cartridge": "test_cartridge",
          "method": "GET",
        },
        "Show2": Object {
          "cartridge": "test_cartridge",
          "method": "GET",
        },
      }
    `);
  });
});
