const { existsSync, realpathSync } = require('fs');
const moduleAlias = require('module-alias');

require('dw-api-mock/demandware-globals');

/**
 * @param cartridgesDir {string}
 * @param cartridgePath {string}
 * @param modulesDir {string}
 * @param rootDir {string}
 */
function setupAliases(cartridgesDir, cartridgePath, modulesDir, rootDir) {
  moduleAlias.addAlias('server', `${__dirname}/server`);

  moduleAlias.addAlias('*/cartridge', (fromTarget, request, alias) => {
    console.debug(
      `[PLAYGROUND] [ALIAS="${alias}"] Aliasing module "${request}" for "${fromTarget}"`
    );

    const requestedModule = request.replace('*/cartridge', 'cartridge');

    for (const cartridge of cartridgePath.split(':')) {
      const modulePath = `${cartridgesDir}/${cartridge}/${requestedModule}`;
      console.debug(`[PLAYGROUND] Searching for module "${modulePath}"`);
      if (
        existsSync(`${modulePath}`) ||
        existsSync(`${modulePath}.js`) ||
        existsSync(`${modulePath}.json`)
      ) {
        console.debug(
          `[PLAYGROUND] Alias found (${cartridgesDir}/${cartridge}/cartridge)`
        );
        return `${cartridgesDir}/${cartridge}/cartridge`;
      }
    }
  });

  moduleAlias.addAlias('*/modules', (fromTarget, request, alias) => {
    console.debug(
      `[PLAYGROUND] [ALIAS="${alias}"] Aliasing module "${request}" for "${fromTarget}"`
    );

    const requestedModule = request.replace('*/modules/', '');

    const modulePath = `${modulesDir}/${requestedModule}`;
    console.debug(`[PLAYGROUND] Searching for module "${modulePath}"`);
    if (existsSync(`${modulePath}.js`) || existsSync(`${modulePath}.json`)) {
      console.debug(`[PLAYGROUND] Alias found in modules`);
      return modulesDir;
    }
  });

  moduleAlias.addAlias('dw', (fromTarget, request, alias) => {
    console.debug(
      `[PLAYGROUND] [ALIAS="${alias}"] Aliasing module "${request}" for "${fromTarget}"`
    );

    const customMock = request.replace('dw', `mocks/dw`);

    if (existsSync(`${__dirname}/${customMock}.js`)) {
      console.log('FOUND in custom mocks');

      return `${__dirname}/mocks/dw`;
    }

    const requestedModule = request.replace(
      'dw',
      realpathSync(`${__dirname}/../../node_modules/dw-api-mock/dw`)
    );

    if (existsSync(requestedModule) || existsSync(`${requestedModule}.js`)) {
      console.log('FOUND in dw-api-mock');
      return `${__dirname}/../../node_modules/dw-api-mock/dw`;
    }

    throw new Error(`Alias cannot be found (${request} from ${fromTarget})`);
  });
}

module.exports = setupAliases;
