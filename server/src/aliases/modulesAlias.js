const { existsSync } = require('fs');

module.exports = function createModulesAliasResolver(modulesDir) {
  return function modulesAlias(fromTarget, request, alias) {
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
  };
};
