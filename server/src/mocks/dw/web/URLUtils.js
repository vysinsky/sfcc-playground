class URLUtils {}

URLUtils.url = function (path) {
  return {
    path,
    relative: function () {
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

module.exports = URLUtils;
