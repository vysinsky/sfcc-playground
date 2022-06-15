const { existsSync, realpathSync } = require('fs');

const { moduleExists } = require('./helpers');

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

      requireChain.push({
        from: fromTarget,
        result: `${customMocksDir}/${request}.js`,
      });
      return `${customMocksDir}/dw`;
    }

    const requestedModule = request.replace(
      'dw',
      realpathSync(`${nodeModulesDir}/dw-api-mock/dw`)
    );

    const finalPath = moduleExists(requestedModule);
    if (finalPath) {
      console.log('FOUND in dw-api-mock');

      requireChain.push({ from: fromTarget, result: finalPath });
      return `${nodeModulesDir}/dw-api-mock/dw`;
    }

    throw new Error(`Alias cannot be found (${request} from ${fromTarget})`);
  };
};
