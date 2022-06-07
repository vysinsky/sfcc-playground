const { readdirSync, realpathSync } = require('fs');

class ControllersRegistry {
  controllers = {};

  registerAllControllers(cartridgesPath) {
    cartridgesPath.split(':').forEach((cartridge) => {
      try {
        const path = realpathSync(
          `${playgroundConfig.cartridgesDir}/${cartridge}/cartridge/controllers`
        );

        readdirSync(path)
          .filter((fileName) => fileName.match(/[A-Z]+/))
          .forEach((fileName) => {
            this.registerController(
              cartridge,
              fileName.replace('.js', ''),
              `${path}/${fileName}`
            );
          });
      } catch (e) {
        if (e.code === 'ENOENT') {
          // Ignore cartridge that does not exist
        } else {
          throw e;
        }
      }
    });
  }

  registerController(cartridge, controller, filePath) {
    if (this.controllers[controller]) {
      this.controllers[controller].cartridges.push(cartridge);
      this.controllers[controller].filePaths = {
        ...this.controllers[controller].filePaths,
        [cartridge]: filePath,
      };
    } else {
      this.controllers[controller] = {
        cartridges: [cartridge],
        filePaths: { [cartridge]: filePath },
      };
    }
  }
}

module.exports = new ControllersRegistry();
