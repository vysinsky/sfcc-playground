const { existsSync, realpathSync } = require('fs');

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
  locateAllFilesInCartridges,
};
