const express = require('express');
const { cosmiconfigSync } = require('cosmiconfig');

const config = cosmiconfigSync('sfcc-playground').search()?.config || {};
global.playgroundConfig = config;

const setupAliases = require('./aliases');
setupAliases(config.cartridgesDir, config.cartridgePath, config.modulesPath);

const server = require('./server/Server');
const Session = require('./server/Session');
const Request = require('./server/Request');
const Response = require('./server/Response');
const { locateAllFilesInCartridges } = require('./utils');
const controllersRegistry = require('./analyzer/ControllersRegistry');
const Module = require('module');

const app = express();

app.get('/controllers', (req, res, next) => {
  controllersRegistry.registerAllControllers(config.cartridgePath);

  res.send({
    controllers: controllersRegistry.controllers,
  });
  next();
});

app.all('/route/:route', (req, res, next) => {
  server.clearRoutes();
  const [controllerName, action] = req.params.route.split('-');

  global.session = new Session();
  global.request = new Request(req, global.customer, global.session);
  global.response = new Response();

  let actionFn;

  locateAllFilesInCartridges(`controllers/${controllerName}`)
    .reverse()
    .forEach((controllerFilePath) => {
      const controller = require(controllerFilePath);
      Module.prototype.superModule = controller;

      if (!controller[action]) {
        global.response.log(
          'Controller action',
          action,
          'not found in the controller',
          controllerName
        );
        global.response.setStatusCode(404);
      } else {
        actionFn = controller[action];
      }
    });

  if (typeof actionFn !== 'function') {
    global.response.log('Controller', controllerName, 'not found');
    global.response.setStatusCode(404);
  } else {
    actionFn();
  }

  res.send(global.response.toJson());
  next();
});

app.listen(config.apiPort || 8080, () => {
  console.log(`🚀 Salesforce playground is running on port ${config.apiPort}`);
});
