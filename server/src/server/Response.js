const { inspect } = require('util');
const dm = require('deepmerge');
const { locateTemplate } = require('../utils');
const { readFileSync } = require('cosmiconfig/dist/readFile');

class Response {
  cachePeriod;

  cachePeriodUnit;

  contentType;

  isJson = false;

  isXml = false;

  httpHeaders = {};

  messageLog = [];

  redirectStatus;

  redirectUrl;

  renderings = [];

  statusCode;

  view;

  viewData = {};

  events = [];

  eventListeners = {};

  log(...args) {
    const output = args.map(function (item) {
      if (typeof item === 'object' || Array.isArray(item)) {
        return JSON.stringify(item);
      }
      return item;
    });

    this.messageLog.push(output.join(' '));
  }

  render(name, data) {
    this._applyViewData(data);
    this.view = name;

    const templatePath = locateTemplate(name, request.locale);

    this._appendRenderings({
      type: 'render',
      subType: 'isml',
      view: name,
      templatePath,
      templateSource: templatePath ? readFileSync(templatePath) : undefined,
    });
  }

  json(data) {
    this._applyViewData(data);
    this.isJson = true;

    this._appendRenderings({ type: 'render', subType: 'json', data });
  }

  xml(xmlString) {
    this.isXml = true;
    this._applyViewData({ xml: xmlString });
    this._appendRenderings({ type: 'render', subType: 'xml', data: xmlString });
  }

  cacheExpiration(period) {
    this.cachePeriod = period;
  }

  page(page, data, aspectAttributes) {
    this._applyViewData(data);
    this._appendRenderings({
      type: 'render',
      subType: 'page',
      page,
      aspectAttributes,
    });
  }

  redirect(url) {
    this.redirectUrl = url;
  }

  print(message) {
    this._appendRenderings({ type: 'print', message });
  }

  getViewData() {
    return this.viewData;
  }

  setViewData(data) {
    this._applyViewData(data);
  }

  setStatusCode(statusCode) {
    this.statusCode = statusCode;
  }

  setContentType(contentType) {
    this.contentType = contentType;
  }

  setRedirectStatus(redirectStatus) {
    this.redirectStatus = redirectStatus;
  }

  setHttpHeader(name, value) {
    this.httpHeaders[name] = value;
  }

  toJson() {
    return {
      cachePeriod: this.cachePeriod,
      cachePeriodUnit: this.cachePeriodUnit,
      contentType: this.contentType,
      isJson: this.isJson,
      isXml: this.isXml,
      httpHeaders: this.httpHeaders,
      messageLog: this.messageLog,
      redirectStatus: this.redirectStatus,
      redirectUrl: this.redirectUrl,
      renderings: this.renderings,
      statusCode: this.statusCode,
      view: this.view,
      viewData: this.viewData,
      events: this.events,
    };
  }

  emit(event, ...args) {
    if (this.eventListeners[event]) {
      this.eventListeners[event].forEach((listener) => {
        listener(...args);
      });
    }
    this.events.push({
      event,
      listeners: this.eventListeners[event]
        ? this.eventListeners[event].length
        : 0,
      arguments: args.map((a) => inspect(a, false, 2, false)),
    });
  }

  addListener(event, callback) {
    if (!this.eventListeners[event]) {
      this.eventListeners[event] = [];
    }

    this.eventListeners[event].push(callback);
  }

  _applyViewData(data = {}) {
    this.viewData = dm(this.viewData, data);
  }

  _appendRenderings(renderingData) {
    let hasRendering = false;

    if (this.renderings.length) {
      for (let i = this.renderings.length - 1; i >= 0; i--) {
        if (this.renderings[i].type === 'render') {
          this.renderings[i] = renderingData;
          hasRendering = true;
          break;
        }
      }
    }

    if (!hasRendering) {
      this.renderings.push(renderingData);
    }
  }
}

module.exports = Response;
