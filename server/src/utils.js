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
 * Locates template respecting the locale
 * @param templateName {string}
 * @param locale {{ id: string }}
 */
function locateTemplate(templateName, locale) {
  if (!templateName.endsWith('.isml')) {
    templateName += '.isml';
  }

  const langCode = locale.id;

  const localeTemplate = locateSingleFileInCartridges(
    `templates/${langCode}/${templateName}`
  );

  if (localeTemplate) {
    return localeTemplate;
  }

  const defaultTemplate = locateSingleFileInCartridges(
    `templates/default/${templateName}`
  );

  if (defaultTemplate) {
    return defaultTemplate;
  }

  throw new Error(`Template "${templateName}" (locale: ${langCode}) not found`);
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
  locateTemplate,
};
