const controllersRegistry = require('../../src/analyzer/ControllersRegistry');

jest.mock('fs');

describe('ControllersRegistry', () => {
  const CARTRIDGE_A_CONTENT = [
    'Home.js',
    'Account.js',
    'Tile.js',
    '.eslintrc.json',
    'small.js',
  ];

  const CARTRIDGE_B_CONTENT = [
    'Home.js',
    'Product.js',
    'Tile.js',
    '.eslintrc.json',
    'small.js',
  ];

  beforeEach(() => {
    controllersRegistry.controllers = {};
    // Set up some mocked out file info before each test
    require('fs').__setMockDirectoryContent(
      'cartridges/cartridge_a/cartridge/controllers',
      CARTRIDGE_A_CONTENT
    );
    require('fs').__setMockDirectoryContent(
      'cartridges/cartridge_b/cartridge/controllers',
      CARTRIDGE_B_CONTENT
    );
  });

  test('registers all controllers from single cartridge', () => {
    global.playgroundConfig = {
      cartridgesDir: 'cartridges',
    };

    controllersRegistry.registerAllControllers('cartridge_a');

    expect(controllersRegistry.controllers).toMatchInlineSnapshot(`
      Object {
        "Account": Object {
          "cartridges": Array [
            "cartridge_a",
          ],
          "filePath": "cartridges/cartridge_a/cartridge/controllers/Account.js",
        },
        "Home": Object {
          "cartridges": Array [
            "cartridge_a",
          ],
          "filePath": "cartridges/cartridge_a/cartridge/controllers/Home.js",
        },
        "Tile": Object {
          "cartridges": Array [
            "cartridge_a",
          ],
          "filePath": "cartridges/cartridge_a/cartridge/controllers/Tile.js",
        },
      }
    `);
  });

  test('registers all controllers from multiple cartridges (A first)', () => {
    global.playgroundConfig = {
      cartridgesDir: 'cartridges',
    };

    controllersRegistry.registerAllControllers('cartridge_a:cartridge_b');

    expect(controllersRegistry.controllers).toMatchInlineSnapshot(`
      Object {
        "Account": Object {
          "cartridges": Array [
            "cartridge_a",
          ],
          "filePath": "cartridges/cartridge_a/cartridge/controllers/Account.js",
        },
        "Home": Object {
          "cartridges": Array [
            "cartridge_a",
            "cartridge_b",
          ],
          "filePath": "cartridges/cartridge_a/cartridge/controllers/Home.js",
        },
        "Product": Object {
          "cartridges": Array [
            "cartridge_b",
          ],
          "filePath": "cartridges/cartridge_b/cartridge/controllers/Product.js",
        },
        "Tile": Object {
          "cartridges": Array [
            "cartridge_a",
            "cartridge_b",
          ],
          "filePath": "cartridges/cartridge_a/cartridge/controllers/Tile.js",
        },
      }
    `);
  });

  test('registers all controllers from multiple cartridges (B first)', () => {
    global.playgroundConfig = {
      cartridgesDir: 'cartridges',
    };

    controllersRegistry.registerAllControllers('cartridge_b:cartridge_a');

    expect(controllersRegistry.controllers).toMatchInlineSnapshot(`
      Object {
        "Account": Object {
          "cartridges": Array [
            "cartridge_a",
          ],
          "filePath": "cartridges/cartridge_a/cartridge/controllers/Account.js",
        },
        "Home": Object {
          "cartridges": Array [
            "cartridge_b",
            "cartridge_a",
          ],
          "filePath": "cartridges/cartridge_b/cartridge/controllers/Home.js",
        },
        "Product": Object {
          "cartridges": Array [
            "cartridge_b",
          ],
          "filePath": "cartridges/cartridge_b/cartridge/controllers/Product.js",
        },
        "Tile": Object {
          "cartridges": Array [
            "cartridge_b",
            "cartridge_a",
          ],
          "filePath": "cartridges/cartridge_b/cartridge/controllers/Tile.js",
        },
      }
    `);
  });
});
