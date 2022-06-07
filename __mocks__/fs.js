'use strict';

const fs = jest.createMockFromModule('fs');

let mockDirectoryContent = {};

fs.__setMockDirectoryContent = function (directoryPath, directoryContent) {
  mockDirectoryContent[directoryPath] = directoryContent;
};

fs.realpathSync = function (path) {
  if (path.includes('cartridge_c')) {
    const e = new Error();
    e.code = 'ENOENT';
    throw e;
  }
  return path;
};

fs.readdirSync = function (directoryPath) {
  return mockDirectoryContent[directoryPath];
};

module.exports = fs;
