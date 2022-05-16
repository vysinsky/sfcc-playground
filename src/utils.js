const { existsSync, realpathSync } = require('fs');

/**
 * Locates single file according to cartridge path. Returns the first found file
 * Ignores non-existing cartridges.
 *
 * @param path {string}
 */
function locateSingleFileInCartridges(path) {
  for (const cartridge of playgroundConfig.cartridgePath.split(':')) {
    const dir = `${playgroundConfig.cartridgesDir}/${cartridge}`;
    if (!existsSync(dir)) {
      continue;
    }

    if (existsSync(`${dir}/cartridge/${path}`)) {
      return realpathSync(`${dir}/cartridge/${path}`);
    }

    if (existsSync(`${dir}/cartridge/${path}.js`)) {
      return realpathSync(`${dir}/cartridge/${path}.js`);
    }
  }
}

/**
 * Locates all files according to cartridge path.
 * Ignores non-existing cartridges.
 *
 * @param path {string}
 */
function locateAllFilesInCartridges(path) {
  const results = [];
  for (const cartridge of playgroundConfig.cartridgePath.split(':')) {
    const dir = `${playgroundConfig.cartridgesDir}/${cartridge}`;
    if (!existsSync(dir)) {
      continue;
    }

    if (existsSync(`${dir}/cartridge/${path}`)) {
      results.push(realpathSync(`${dir}/cartridge/${path}`));
    }

    if (existsSync(`${dir}/cartridge/${path}.js`)) {
      results.push(realpathSync(`${dir}/cartridge/${path}.js`));
    }
  }
  return results;
}

module.exports = {
  locateSingleFileInCartridges,
  locateAllFilesInCartridges,
};
