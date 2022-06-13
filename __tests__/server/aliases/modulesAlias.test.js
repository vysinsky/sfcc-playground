const { realpathSync } = require('fs');

const createModulesAliasResolver = require('../../../server/src/aliases/modulesAlias');

describe('modulesAlias', () => {
  it('finds correct module file', () => {
    const modulesAlias = createModulesAliasResolver(
      realpathSync(`${__dirname}/../../../__mocks__/cartridges/modules`)
    );

    expect(
      modulesAlias(
        'unittest',
        '*/modules/server/forms/forms',
        'test_modules_alias'
      )
    ).toMatch(/__mocks__\/cartridges\/modules/);
  });

  it('returns undefined if module is not found', () => {
    const dwAlias = createModulesAliasResolver(
      realpathSync(`${__dirname}/../../../__mocks__/cartridges/modules`)
    );

    expect(
      dwAlias(
        'unittest',
        '*/modules/server/forms/non-existent',
        'test_modules_alias'
      )
    ).toBeUndefined();
  });
});
