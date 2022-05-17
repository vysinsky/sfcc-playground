const { readdirSync, realpathSync } = require('fs');

class ControllersRegistry {
  controllers = {};

  registerAllControllers(cartridgesPath) {
    cartridgesPath.split(':').forEach((cartridge) => {
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
    });
  }

  registerController(cartridge, controller, filePath) {
    if (this.controllers[controller]) {
      this.controllers[controller].cartridges.push(cartridge);
    } else {
      this.controllers[controller] = {
        cartridges: [cartridge],
        filePath,
      };
    }
  }
}

module.exports = new ControllersRegistry();
