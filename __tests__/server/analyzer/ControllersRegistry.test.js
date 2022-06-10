const { realpathSync } = require('fs');

const controllersRegistry = require('../../../server/src/analyzer/ControllersRegistry');

function verifyControllersRegistryData(expected, actual) {
  Object.entries(expected).forEach(([controllerName, expectedData]) => {
    const actualData = actual[controllerName];

    expect(actualData.cartridges).toEqual(expectedData.cartridges);

    Object.entries(expectedData.filePaths).forEach(([key, value]) => {
      expect(actualData.filePaths).toHaveProperty(key);
      expect(actualData.filePaths[key]).toMatch(value);
    });

    expect(actualData.filePaths).toMatchObject(expectedData.filePaths);
  });
}

describe('ControllersRegistry', () => {
  beforeEach(() => {
    controllersRegistry.controllers = {};
  });

  test('registers all controllers from single cartridge', () => {
    global.playgroundConfig = {
      cartridgesDir: realpathSync(`${__dirname}/../../../__mocks__/cartridges`),
    };

    controllersRegistry.registerAllControllers('cartridge_a');

    verifyControllersRegistryData(
      {
        Account: {
          cartridges: ['cartridge_a'],
          filePaths: {
            cartridge_a:
              /__mocks__\/cartridges\/cartridge_a\/cartridge\/controllers\/Account\.js/,
          },
        },
        Home: {
          cartridges: ['cartridge_a'],
          filePaths: {
            cartridge_a:
              /__mocks__\/cartridges\/cartridge_a\/cartridge\/controllers\/Home\.js/,
          },
        },
        Tile: {
          cartridges: ['cartridge_a'],
          filePaths: {
            cartridge_a:
              /__mocks__\/cartridges\/cartridge_a\/cartridge\/controllers\/Tile\.js/,
          },
        },
      },
      controllersRegistry.controllers
    );
  });

  test('registers all controllers from multiple cartridges (A first)', () => {
    global.playgroundConfig = {
      cartridgesDir: realpathSync(`${__dirname}/../../../__mocks__/cartridges`),
    };

    controllersRegistry.registerAllControllers('cartridge_a:cartridge_b');

    verifyControllersRegistryData(
      {
        Account: {
          cartridges: ['cartridge_a'],
          filePaths: {
            cartridge_a:
              /__mocks__\/cartridges\/cartridge_a\/cartridge\/controllers\/Account\.js/,
          },
        },
        Home: {
          cartridges: ['cartridge_a', 'cartridge_b'],
          filePaths: {
            cartridge_a:
              /__mocks__\/cartridges\/cartridge_a\/cartridge\/controllers\/Home\.js/,
            cartridge_b:
              /__mocks__\/cartridges\/cartridge_b\/cartridge\/controllers\/Home\.js/,
          },
        },
        Tile: {
          cartridges: ['cartridge_a', 'cartridge_b'],
          filePaths: {
            cartridge_a:
              /__mocks__\/cartridges\/cartridge_a\/cartridge\/controllers\/Tile\.js/,
            cartridge_b:
              /__mocks__\/cartridges\/cartridge_b\/cartridge\/controllers\/Tile\.js/,
          },
        },
      },
      controllersRegistry.controllers
    );
  });

  test('registers all controllers from multiple cartridges (B first)', () => {
    global.playgroundConfig = {
      cartridgesDir: realpathSync(`${__dirname}/../../../__mocks__/cartridges`),
    };

    controllersRegistry.registerAllControllers('cartridge_b:cartridge_a');

    verifyControllersRegistryData(
      {
        Account: {
          cartridges: ['cartridge_a'],
          filePaths: {
            cartridge_a:
              /__mocks__\/cartridges\/cartridge_a\/cartridge\/controllers\/Account\.js/,
          },
        },
        Home: {
          cartridges: ['cartridge_b', 'cartridge_a'],
          filePaths: {
            cartridge_b:
              /__mocks__\/cartridges\/cartridge_b\/cartridge\/controllers\/Home\.js/,
            cartridge_a:
              /__mocks__\/cartridges\/cartridge_a\/cartridge\/controllers\/Home\.js/,
          },
        },
        Tile: {
          cartridges: ['cartridge_b', 'cartridge_a'],
          filePaths: {
            cartridge_b:
              /__mocks__\/cartridges\/cartridge_b\/cartridge\/controllers\/Tile\.js/,
            cartridge_a:
              /__mocks__\/cartridges\/cartridge_a\/cartridge\/controllers\/Tile\.js/,
          },
        },
      },
      controllersRegistry.controllers
    );
  });

  test('ignores non-existent cartridges', () => {
    global.playgroundConfig = {
      cartridgesDir: realpathSync(`${__dirname}/../../../__mocks__/cartridges`),
    };

    controllersRegistry.registerAllControllers('cartridge_c:cartridge_a');

    verifyControllersRegistryData(
      {
        Account: {
          cartridges: ['cartridge_a'],
          filePaths: {
            cartridge_a:
              /__mocks__\/cartridges\/cartridge_a\/cartridge\/controllers\/Account\.js/,
          },
        },
        Home: {
          cartridges: ['cartridge_a'],
          filePaths: {
            cartridge_a:
              /__mocks__\/cartridges\/cartridge_a\/cartridge\/controllers\/Home\.js/,
          },
        },
        Tile: {
          cartridges: ['cartridge_a'],
          filePaths: {
            cartridge_a:
              /__mocks__\/cartridges\/cartridge_a\/cartridge\/controllers\/Tile\.js/,
          },
        },
      },
      controllersRegistry.controllers
    );
  });
});
