const path = require('path');
const { existsSync } = require('fs');
const express = require('express');
const dm = require('deepmerge');
const { cosmiconfigSync } = require('cosmiconfig');

const cwd = process.cwd();
const config = dm(
  {
    rootDir: cwd,
    cartridgesDir: `${cwd}/cartridges`,
    cartridgePath: 'app_storefront_base',
    modulesPath: `${cwd}/cartridges/modules`,
    apiPort: 8080,
  },
  cosmiconfigSync('sfcc-playground').search()?.config || {}
);
global.playgroundConfig = config;

const setupAliases = require('./aliases');
setupAliases(
  config.cartridgesDir,
  config.cartridgePath,
  config.modulesPath,
  config.rootDir
);

const server = require('./server/Server');
const Request = require('./server/Request');
const Response = require('./server/Response');
const { locateAllFilesInCartridges } = require('./utils');
const controllersRegistry = require('./analyzer/ControllersRegistry');
const actionsExtractor = require('./analyzer/ActionsExtractor');
const Module = require('module');

const app = express();

app.use(express.static(path.join(__dirname, '..', '..', 'client', 'build')));

app.get('/api/routes', (req, res, next) => {
  controllersRegistry.registerAllControllers(config.cartridgePath);
  const controllers = controllersRegistry.controllers;

  const routes = [];

  Object.entries(controllers).forEach(
    ([controllerName, { cartridges, filePaths }]) => {
      server.currentController = controllerName;
      server.clearRoutes();

      let actions = [];
      cartridges.reverse().forEach((cartridge) => {
        actions = [
          ...actions,
          ...actionsExtractor.extractControllerActions(filePaths[cartridge]),
        ];
      });

      routes.push({
        name: controllerName,
        actions: actions.filter((value, index, self) => {
          return self.indexOf(value) === index;
        }),
        metadata: server.routesMetadata[controllerName],
      });
    }
  );

  res.send({ routes });
  next();
});

app.all('/api/routes/:route', (req, res, next) => {
  server.clearRoutes();
  const [controllerName, action] = req.params.route.split('-');

  // noinspection JSConstantReassignment
  global.request = new Request(req, global.customer, global.session);
  global.response = new Response();

  let actionFn;
  let controllerFound = false;

  locateAllFilesInCartridges(`controllers/${controllerName}`)
    .reverse()
    .forEach((controllerFilePath) => {
      const controller = require(controllerFilePath);
      Module.prototype.superModule = controller;
      controllerFound = true;
      actionFn = controller[action];
    });

  if (typeof actionFn !== 'function') {
    if (!controllerFound) {
      global.response.log('Controller', controllerName, 'not found');
    } else {
      global.response.log(
        'Controller action',
        action,
        'not found in the controller',
        controllerName
      );
    }
    global.response.setStatusCode(404);
  } else {
    actionFn();
  }

  res.send(global.response.toJson());
  next();
});

app.get('/*', (req, res) => {
  const indexPath = path.join(
    __dirname,
    '..',
    '..',
    'client',
    'build',
    'index.html'
  );
  if (!existsSync(indexPath)) {
    res
      .status(404)
      .send(
        'Cannot start UI. Client build folder is missing. Did you run `yarn build` in `client` folder?'
      );
    return;
  }

  res.sendFile(indexPath);
});

module.exports = {
  run: () => {
    app.listen(config.apiPort || 8080, () => {
      console.log(
        `🚀 Salesforce playground is running on port ${config.apiPort}`
      );
    });
  },
};
