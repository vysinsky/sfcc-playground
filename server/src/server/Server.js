const middleware = require('*/modules/server/middleware');
const Route = require('./Route');
const metadataRegistry = require('../analyzer/MetadataRegistry');

class Server {
  metadataRegistry;

  routes = {};

  constructor(metadataRegistry) {
    this.metadataRegistry = metadataRegistry;
  }

  use(name, ...middlewares) {
    if (this.routes[name]) {
      throw new Error(`Route with this name (${name}) already exists`);
    }

    this.metadataRegistry.collectIfMissing(name, { method: 'GET' });

    this.routes[name] = new Route(name, middlewares);
  }

  get(name, ...middlewares) {
    this._handleRequest(name, 'GET', [middleware.get, ...middlewares]);
  }

  post(name, ...middlewares) {
    this._handleRequest(name, 'POST', [middleware.post, ...middlewares]);
  }

  extend(server) {
    const newRoutes = {};

    if (!server.__routes) {
      throw new Error('Cannot extend non-valid server object');
    }

    if (Object.keys(server.__routes).length === 0) {
      throw new Error('Cannot extend server without routes');
    }

    Object.keys(server.__routes).forEach(function (key) {
      newRoutes[key] = server.__routes?.[key];
    });

    this.routes = newRoutes;
  }

  prepend(name, ...middlewares) {
    if (!this.routes[name]) {
      throw new Error(`Route with this name (${name}) does not exist`);
    }

    this.routes[name].chain = middlewares.concat(this.routes[name].chain);
  }

  append(name, ...middlewares) {
    if (!this.routes[name]) {
      throw new Error(`Route with this name (${name}) does not exist`);
    }

    this.routes[name].chain = this.routes[name].chain.concat(middlewares);
  }

  replace(name, ...middlewares) {
    if (!this.routes[name]) {
      throw new Error(`Route with this name (${name}) does not exist`);
    }

    delete this.routes[name];

    this.use(name, ...middlewares);
  }

  exports() {
    const exportStatement = {};
    Object.keys(this.routes).forEach((key) => {
      exportStatement[key] = this.routes[key].getRoute();
      exportStatement[key].public = true;
    });
    if (!exportStatement.__routes) {
      exportStatement.__routes = this.routes;
    }

    return exportStatement;
  }

  clearRoutes() {
    this.routes = {};
  }

  _handleRequest(name, method, middlewares) {
    this.metadataRegistry.collect(name, { method });
    this.use(name, ...middlewares);
  }
}

module.exports = new Server(metadataRegistry);
