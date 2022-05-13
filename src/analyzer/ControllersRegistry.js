const { readdirSync, realpathSync } = require('fs');

class ControllersRegistry {
  controllers = {};

  registerAllControllers(cartridgesPath) {
    cartridgesPath.split(':').forEach((cartridge) => {
      const path = realpathSync(
        `${__dirname}/../../sfra/cartridges/${cartridge}/cartridge/controllers`
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
    this.controllers[controller] = {
      cartridge,
      filePath,
    };
  }
}

module.exports = new ControllersRegistry();
