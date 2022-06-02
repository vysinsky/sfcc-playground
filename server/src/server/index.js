const server = require('./Server');
const Session = require('./Session');

global.session = new Session();

server.middleware = require('*/modules/server/middleware');
server.forms = require('*/modules/server/forms/forms')(global.session);
server.querystring = require('*/modules/server/queryString');

module.exports = server;
