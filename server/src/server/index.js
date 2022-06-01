const server = require('./Server');

server.middleware = require('*/modules/server/middleware');
server.forms = require('*/modules/server/forms/forms')(session);
server.querystring = require('*/modules/server/queryString');

module.exports = server;
