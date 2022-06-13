const server = require('./Server');
const Session = require('./Session');
const SimpleCache = require('*/modules/server/simpleCache');

global.session = new Session(new SimpleCache());

server.middleware = require('*/modules/server/middleware');
server.forms = require('*/modules/server/forms/forms')(global.session);
server.querystring = require('*/modules/server/queryString');

module.exports = server;
