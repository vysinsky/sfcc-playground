const utils = require('../../server/src/utils');
const { realpathSync } = require('fs');

describe('locateSingleFileInCartridges', () => {
  it('locates a file that exists (with extension)', () => {
    global.playgroundConfig = {
      cartridgePath: 'cartridge_a',
      cartridgesDir: realpathSync(`${__dirname}/../../__mocks__/cartridges`),
    };

    const actual = utils.locateSingleFileInCartridges('controllers/Home.js');

    expect(actual.path).toMatch(
      /__mocks__\/cartridges\/cartridge_a\/cartridge\/controllers\/Home\.js/
    );
    expect(actual.cartridge).toBe('cartridge_a');
  });

  it('locates a file that exists (no extension)', () => {
    global.playgroundConfig = {
      cartridgePath: 'cartridge_a:cartridge_b',
      cartridgesDir: realpathSync(`${__dirname}/../../__mocks__/cartridges`),
    };

    const actual = utils.locateSingleFileInCartridges('controllers/Product');

    expect(actual.path).toMatch(
      /__mocks__\/cartridges\/cartridge_b\/cartridge\/controllers\/Product\.js/
    );
    expect(actual.cartridge).toBe('cartridge_b');
  });

  it('ignores non-existent cartridge', () => {
    global.playgroundConfig = {
      cartridgePath: 'cartridge_x:cartridge_b',
      cartridgesDir: realpathSync(`${__dirname}/../../__mocks__/cartridges`),
    };

    const actual = utils.locateSingleFileInCartridges('controllers/Product');

    expect(actual.path).toMatch(
      /__mocks__\/cartridges\/cartridge_b\/cartridge\/controllers\/Product\.js/
    );
    expect(actual.cartridge).toBe('cartridge_b');
  });

  it('does not return path if file does not exist', () => {
    global.playgroundConfig = {
      cartridgePath: 'cartridge_a:cartridge_b',
      cartridgesDir: realpathSync(`${__dirname}/../../__mocks__/cartridges`),
    };

    const actual = utils.locateSingleFileInCartridges(
      'controllers/NonExistent'
    );

    expect(actual).toBe(undefined);
  });
});

describe('locateTemplate', () => {
  it('locates a template that exists (without extension)', () => {
    global.playgroundConfig = {
      cartridgePath: 'cartridge_a',
      cartridgesDir: realpathSync(`${__dirname}/../../__mocks__/cartridges`),
    };

    const actual = utils.locateTemplate('home/homePage', {
      id: 'en_US',
    });

    expect(actual.path).toMatch(
      /__mocks__\/cartridges\/cartridge_a\/cartridge\/templates\/default\/home\/homePage\.isml/
    );
    expect(actual.cartridge).toBe('cartridge_a');
  });

  it('throws error for non-existing template', () => {
    global.playgroundConfig = {
      cartridgePath: 'cartridge_a',
      cartridgesDir: realpathSync(`${__dirname}/../../__mocks__/cartridges`),
    };

    expect(() => {
      utils.locateTemplate('home/nonExistingTemplate', {
        id: 'en_US',
      });
    }).toThrow(
      'Template "home/nonExistingTemplate.isml" (locale: en_US) not found'
    );
  });

  it('locates a template that exists (with extension)', () => {
    global.playgroundConfig = {
      cartridgePath: 'cartridge_a',
      cartridgesDir: realpathSync(`${__dirname}/../../__mocks__/cartridges`),
    };

    const actual = utils.locateTemplate('home/homePage.isml', {
      id: 'en_US',
    });

    expect(actual.path).toMatch(
      /__mocks__\/cartridges\/cartridge_a\/cartridge\/templates\/default\/home\/homePage\.isml/
    );
    expect(actual.cartridge).toBe('cartridge_a');
  });

  it('locates a template for the locale', () => {
    global.playgroundConfig = {
      cartridgePath: 'cartridge_a',
      cartridgesDir: realpathSync(`${__dirname}/../../__mocks__/cartridges`),
    };

    const actual = utils.locateTemplate('home/homePage.isml', {
      id: 'fr_FR',
    });

    expect(actual.path).toMatch(
      /__mocks__\/cartridges\/cartridge_a\/cartridge\/templates\/fr_FR\/home\/homePage\.isml/
    );
    expect(actual.cartridge).toBe('cartridge_a');
  });

  it('locates a template for the locale while using multiple cartridges', () => {
    global.playgroundConfig = {
      cartridgePath: 'cartridge_a:cartridge_b',
      cartridgesDir: realpathSync(`${__dirname}/../../__mocks__/cartridges`),
    };

    const actual = utils.locateTemplate('home/homePage.isml', {
      id: 'cs_CZ',
    });

    expect(actual.path).toMatch(
      /__mocks__\/cartridges\/cartridge_b\/cartridge\/templates\/cs_CZ\/home\/homePage\.isml/
    );
    expect(actual.cartridge).toBe('cartridge_b');
  });
});

describe('locateAllFilesInCartridges', () => {
  it('locates all files that exist (with extension)', () => {
    global.playgroundConfig = {
      cartridgePath: 'cartridge_a',
      cartridgesDir: realpathSync(`${__dirname}/../../__mocks__/cartridges`),
    };

    const actual = utils.locateAllFilesInCartridges('controllers/Home.js');

    expect(actual).toMatchObject([
      /__mocks__\/cartridges\/cartridge_a\/cartridge\/controllers\/Home\.js/,
    ]);
  });

  it('locates all files that exist (with extension, both cartridges)', () => {
    global.playgroundConfig = {
      cartridgePath: 'cartridge_a:cartridge_b',
      cartridgesDir: realpathSync(`${__dirname}/../../__mocks__/cartridges`),
    };

    const actual = utils.locateAllFilesInCartridges('controllers/Home.js');

    expect(actual).toMatchObject([
      /__mocks__\/cartridges\/cartridge_a\/cartridge\/controllers\/Home\.js/,
      /__mocks__\/cartridges\/cartridge_b\/cartridge\/controllers\/Home\.js/,
    ]);
  });

  it('locates all files that exist (no extension)', () => {
    global.playgroundConfig = {
      cartridgePath: 'cartridge_a:cartridge_b',
      cartridgesDir: realpathSync(`${__dirname}/../../__mocks__/cartridges`),
    };

    const actual = utils.locateAllFilesInCartridges('controllers/Product');

    expect(actual).toMatchObject([
      /__mocks__\/cartridges\/cartridge_b\/cartridge\/controllers\/Product\.js/,
    ]);
  });

  it('locates all files and comply to cartridge path order', () => {
    global.playgroundConfig = {
      cartridgePath: 'cartridge_b:cartridge_a',
      cartridgesDir: realpathSync(`${__dirname}/../../__mocks__/cartridges`),
    };

    const actual = utils.locateAllFilesInCartridges('controllers/Home');

    expect(actual).toMatchObject([
      /__mocks__\/cartridges\/cartridge_b\/cartridge\/controllers\/Home\.js/,
      /__mocks__\/cartridges\/cartridge_a\/cartridge\/controllers\/Home\.js/,
    ]);
  });

  it('ignores non-existent cartridge', () => {
    global.playgroundConfig = {
      cartridgePath: 'cartridge_x:cartridge_b',
      cartridgesDir: realpathSync(`${__dirname}/../../__mocks__/cartridges`),
    };

    const actual = utils.locateAllFilesInCartridges('controllers/Product');

    expect(actual).toMatchObject([
      /__mocks__\/cartridges\/cartridge_b\/cartridge\/controllers\/Product\.js/,
    ]);
  });

  it('does not return any path if file does not exist', () => {
    global.playgroundConfig = {
      cartridgePath: 'cartridge_a:cartridge_b',
      cartridgesDir: realpathSync(`${__dirname}/../../__mocks__/cartridges`),
    };

    const actual = utils.locateAllFilesInCartridges('controllers/NonExistent');

    expect(actual.length).toBe(0);
  });
});
