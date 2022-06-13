const createCartridgeAliasResolver = require('../../../server/src/aliases/cartridgeAlias');
const { realpathSync } = require('fs');

describe('cartridgeAlias', () => {
  it('finds correct cartridge file', () => {
    const cartridgeAlias = createCartridgeAliasResolver(
      'cartridge_a',
      realpathSync(`${__dirname}/../../../__mocks__/cartridges`)
    );

    expect(
      cartridgeAlias(
        'unittest',
        '*/cartridge/scripts/helpers/productHelpers',
        'test_cartridge_alias'
      )
    ).toMatch(/__mocks__\/cartridges\/cartridge_a\/cartridge/);
  });

  it('respects cartridge path', () => {
    const cartridgeAlias = createCartridgeAliasResolver(
      'cartridge_b:cartridge_a',
      realpathSync(`${__dirname}/../../../__mocks__/cartridges`)
    );

    expect(
      cartridgeAlias(
        'unittest',
        '*/cartridge/scripts/helpers/productHelpers',
        'test_cartridge_alias'
      )
    ).toMatch(/__mocks__\/cartridges\/cartridge_b\/cartridge/);
  });

  it('returns undefined in case module does not exist', () => {
    const cartridgeAlias = createCartridgeAliasResolver(
      'cartridge_b:cartridge_a',
      realpathSync(`${__dirname}/../../../__mocks__/cartridges`)
    );

    expect(
      cartridgeAlias(
        'unittest',
        '*/cartridge/non-existing-module',
        'test_cartridge_alias'
      )
    ).toBeUndefined();
  });

  it('resolves also json files', () => {
    const cartridgeAlias = createCartridgeAliasResolver(
      'cartridge_b:cartridge_a',
      realpathSync(`${__dirname}/../../../__mocks__/cartridges`)
    );

    expect(
      cartridgeAlias(
        'unittest',
        '*/cartridge/config/countries',
        'test_cartridge_alias'
      )
    ).toMatch(/__mocks__\/cartridges\/cartridge_b\/cartridge/);
  });
});
