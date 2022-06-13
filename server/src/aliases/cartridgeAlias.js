const { existsSync } = require('fs');

function moduleExists(modulePath) {
  return (
    existsSync(`${modulePath}`) ||
    existsSync(`${modulePath}.js`) ||
    existsSync(`${modulePath}.json`)
  );
}

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

      if (moduleExists(modulePath)) {
        console.debug(
          `[PLAYGROUND] Alias found (${cartridgesDir}/${cartridge}/cartridge)`
        );
        return `${cartridgesDir}/${cartridge}/cartridge`;
      }
    }
  };
};
