const { moduleExists } = require('./helpers');

module.exports = function createModulesAliasResolver(modulesDir) {
  return function modulesAlias(fromTarget, request, alias) {
    console.debug(
      `[PLAYGROUND] [ALIAS="${alias}"] Aliasing module "${request}" for "${fromTarget}"`
    );

    const requestedModule = request.replace('*/modules/', '');

    const modulePath = `${modulesDir}/${requestedModule}`;
    console.debug(`[PLAYGROUND] Searching for module "${modulePath}"`);
    const finalPath = moduleExists(modulePath);
    if (finalPath) {
      console.debug(`[PLAYGROUND] Alias found in modules`);

      requireChain.push({ from: fromTarget, result: finalPath });
      return modulesDir;
    }
  };
};
