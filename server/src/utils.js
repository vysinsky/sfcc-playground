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
 * Locates template respecting the locale
 * @param templateName {string}
 * @param locale {{ id: string }}
 */
function locateTemplate(templateName, locale) {
  const langCode = locale.id;

  const localeTemplate = locateSingleFileInCartridges(
    `templates/${langCode}/${templateName}.isml`
  );

  if (localeTemplate) {
    return localeTemplate;
  }

  const [language] = langCode.split('_');

  const langTemplate = locateSingleFileInCartridges(
    `templates/${language}/${templateName}.isml`
  );

  if (langTemplate) {
    return langTemplate;
  }

  const defaultTemplate = locateSingleFileInCartridges(
    `templates/default/${templateName}.isml`
  );

  if (defaultTemplate) {
    return defaultTemplate;
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
  locateTemplate,
};
