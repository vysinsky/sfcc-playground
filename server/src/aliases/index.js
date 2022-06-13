const { realpathSync } = require('fs');
const moduleAlias = require('module-alias');

require('dw-api-mock/demandware-globals');

const createCartridgeAliasResolver = require('./cartridgeAlias');
const createModulesAliasResolver = require('./modulesAlias');
const createDwAliasResolver = require('./dwAlias');

/**
 * @param cartridgesDir {string}
 * @param cartridgePath {string}
 * @param modulesDir {string}
 */
module.exports = function setupAliases(
  cartridgesDir,
  cartridgePath,
  modulesDir
) {
  moduleAlias.addAlias('server', `${__dirname}/../server`);

  moduleAlias.addAlias(
    '*/cartridge',
    createCartridgeAliasResolver(cartridgePath, cartridgesDir)
  );

  moduleAlias.addAlias('*/modules', createModulesAliasResolver(modulesDir));

  moduleAlias.addAlias(
    'dw',
    createDwAliasResolver(
      realpathSync(`${__dirname}/../mocks`),
      realpathSync(`${__dirname}/../../../node_modules`)
    )
  );
};
