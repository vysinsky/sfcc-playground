const { moduleExists } = require('./helpers');

module.exports = function createCartridgeAliasResolver(
  cartridgePath,
  cartridgesDir
) {
  return function cartridgeAlias(fromTarget, request, alias) {
    console.debug(
      `[PLAYGROUND] [ALIAS="${alias}"] Aliasing module "${request}" for "${fromTarget}"`
    );

    const requestedModule = request.replace('*/cartridge', 'cartridge');

    for (const cartridge of cartridgePath.split(':')) {
      const modulePath = `${cartridgesDir}/${cartridge}/${requestedModule}`;
      console.debug(`[PLAYGROUND] Searching for module "${modulePath}"`);

      const finalPath = moduleExists(modulePath);
      if (finalPath) {
        console.debug(
          `[PLAYGROUND] Alias found (${cartridgesDir}/${cartridge}/cartridge)`
        );
        requireChain.push({ from: fromTarget, result: finalPath });

        return `${cartridgesDir}/${cartridge}/cartridge`;
      }
    }
  };
};
