const { existsSync, realpathSync } = require('fs');

module.exports = function createDwAliasResolver(
  customMocksDir,
  nodeModulesDir
) {
  return function dwAlias(fromTarget, request, alias) {
    console.debug(
      `[PLAYGROUND] [ALIAS="${alias}"] Aliasing module "${request}" for "${fromTarget}"`
    );

    if (existsSync(`${customMocksDir}/${request}.js`)) {
      console.log('FOUND in custom mocks');

      return `${customMocksDir}/dw`;
    }

    const requestedModule = request.replace(
      'dw',
      realpathSync(`${nodeModulesDir}/dw-api-mock/dw`)
    );

    if (existsSync(requestedModule) || existsSync(`${requestedModule}.js`)) {
      console.log('FOUND in dw-api-mock');
      return `${nodeModulesDir}/dw-api-mock/dw`;
    }

    throw new Error(`Alias cannot be found (${request} from ${fromTarget})`);
  };
};
