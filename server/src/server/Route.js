class Route {
  constructor(name, chain) {
    this.name = name;
    this.chain = chain;
    this.chain.on = this.on.bind(this);
  }

  on(event, callback) {
    global.response.addListener(event, callback);
  }

  getRoute() {
    return (err) => {
      let i = 0;
      if (err && err.ErrorText) {
        const system = require('dw/system/System');
        const showError = system.getInstanceType() !== system.PRODUCTION_SYSTEM;
        global.request.error = {
          errorText: showError ? err.ErrorText : '',
          controllerName: showError ? err.ControllerName : '',
          startNodeName: showError ? err.CurrentStartNodeName || this.name : '',
        };
      }

      Object.freeze(global.request);

      const next = (error) => {
        if (error) {
          // process error here and output error template
          global.response.log(error);
          throw new Error(error.message);
        }

        if (global.response.redirectUrl) {
          this.emit('route:Redirect', global.request, global.response);
          return;
        }

        if (i < this.chain.length) {
          response.currentCartridge = 'server/Route';
          this.emit('route:Step', global.request, global.response);
          const cartridge = this.chain[i].cartridge;
          const middleware = this.chain[i++].bind(this);
          response.currentCartridge = cartridge;
          middleware(global.request, global.response, next);
        } else {
          this.done(global.request, global.response);
        }
      };

      i++;
      response.currentCartridge = 'server/Route';
      this.emit('route:Start', global.request, global.response);
      response.currentCartridge = this.chain[0].cartridge;
      this.chain[0](global.request, global.response, next);
    };
  }

  append(step) {
    this.chain.push(step);
  }

  done(request, response) {
    response.currentCartridge = 'server/Route';
    this.emit('route:BeforeComplete', request, response);
    this.emit('route:Complete', request, response);
  }

  emit(event, ...args) {
    global.response.emit(event, ...args);
  }
}

module.exports = Route;
