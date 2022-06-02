var ContentMgr = function () {};

ContentMgr.getContent = function () {
  return this.prototype.content;
};
ContentMgr.getFolder = function () {};
ContentMgr.getSiteLibrary = function () {};
ContentMgr.prototype.content = {
  custom: {
    body: {},
  },
};
ContentMgr.prototype.folder = null;
ContentMgr.prototype.siteLibrary = null;

module.exports = ContentMgr;
