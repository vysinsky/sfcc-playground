const { realpathSync } = require('fs');

const createDwAliasResolver = require('../../../server/src/aliases/dwAlias');

describe('dwAlias', () => {
  it('finds correct dw file in custom mocks', () => {
    const dwAlias = createDwAliasResolver(
      realpathSync(`${__dirname}/../../../__mocks__`),
      realpathSync(`${__dirname}/../../../__mocks__/node_modules_mocks`)
    );

    expect(
      dwAlias('unittest', 'dw/campaign/Campaign', 'test_dw_alias')
    ).toMatch(/__mocks__\/dw/);
  });

  it('finds correct dw file in node_modules mocks', () => {
    const dwAlias = createDwAliasResolver(
      realpathSync(`${__dirname}/../../../__mocks__`),
      realpathSync(`${__dirname}/../../../__mocks__/node_modules_mocks`)
    );

    expect(dwAlias('unittest', 'dw/catalog/Product', 'test_dw_alias')).toMatch(
      /node_modules_mocks\/dw-api-mock/
    );
  });

  it('throws error if module is not found', () => {
    const dwAlias = createDwAliasResolver(
      realpathSync(`${__dirname}/../../../__mocks__`),
      realpathSync(`${__dirname}/../../../__mocks__/node_modules_mocks`)
    );

    expect(() => {
      dwAlias('unittest', 'dw/non-existent', 'test_dw_alias');
    }).toThrow(/Alias cannot be found/);
  });
});
