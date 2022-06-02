class URLUtils {}

URLUtils.url = function (path) {
  return {
    path,
    relative: function () {
      return path;
    },
    abs: function () {
      return path;
    },
    append: function (append) {
      return path + append;
    },
  };
};

URLUtils.home = function () {
  return 'Home-Show';
};

URLUtils.httpHome = function () {
  return 'http://Home-Show';
};

URLUtils.https = function (url) {
  return url.replace('http://', 'https://');
};

module.exports = URLUtils;
