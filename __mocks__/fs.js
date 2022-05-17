'use strict';

const fs = jest.createMockFromModule('fs');

let mockDirectoryContent = {};

fs.__setMockDirectoryContent = function (directoryPath, directoryContent) {
  mockDirectoryContent[directoryPath] = directoryContent;
};

fs.realpathSync = function (path) {
  return path;
};

fs.readdirSync = function (directoryPath) {
  return mockDirectoryContent[directoryPath];
};

module.exports = fs;
