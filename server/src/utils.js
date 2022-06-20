const { existsSync, realpathSync } = require('fs');

/**
 * Locates a single file according to cartridge path. Returns the first found file
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
      return {
        cartridge,
        path: realpathSync(`${dir}/cartridge/${path}`),
      };
    }

    if (existsSync(`${dir}/cartridge/${path}.js`)) {
      return {
        cartridge,
        path: realpathSync(`${dir}/cartridge/${path}.js`),
      };
    }
  }
}

/**
 * Locates and returns first found localised file.
 * @param path {string} Relative path with `{{locale}}` (example: forms/{{locale}}/profile.xml)
 * @param locale {string}
 */
function locateSingleLocalisedFile(path, locale) {
  const localeFormFile = locateSingleFileInCartridges(
    path.replace('{{locale}}', locale)
  );

  if (localeFormFile) {
    return localeFormFile;
  }

  const defaultFormFile = locateSingleFileInCartridges(
    path.replace('{{locale}}', 'default')
  );

  if (defaultFormFile) {
    return defaultFormFile;
  }

  throw new Error(`File "${path}" (locale: ${locale}) not found`);
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
      results.push({
        cartridge,
        path: realpathSync(`${dir}/cartridge/${path}`),
      });
    }

    if (existsSync(`${dir}/cartridge/${path}.js`)) {
      results.push({
        cartridge,
        path: realpathSync(`${dir}/cartridge/${path}.js`),
      });
    }
  }
  return results;
}

module.exports = {
  locateSingleFileInCartridges,
  locateAllFilesInCartridges,
  locateSingleLocalisedFile,
};
