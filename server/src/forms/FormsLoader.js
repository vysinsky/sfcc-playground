const { locateSingleLocalisedFile } = require('../utils');
const { readFileSync } = require('cosmiconfig/dist/readFile');
const xml2js = require('xml2js');
const FormGroup = require('dw/web/FormGroup');
const FormField = require('dw/web/FormField');

class FormsLoader {
  constructor() {
    const self = this;
    this._accessor = new Proxy(
      {},
      {
        get(obj, formName) {
          return self.getForm(formName);
        },
      }
    );
  }

  getAccessor() {
    return this._accessor;
  }

  getForm(formName) {
    if (!formName.endsWith('.xml')) {
      formName += '.xml';
    }

    const { cartridge, path } = locateSingleLocalisedFile(
      `forms/{{locale}}/${formName}`,
      request.locale.id
    );

    let formDefinition;
    xml2js.parseString(readFileSync(path), (error, result) => {
      if (error) {
        throw error;
      }

      formDefinition = result;
    });

    return this._buildForm(formDefinition);
  }

  _buildForm(formDefinition) {
    const form = new FormGroup();

    if (formDefinition.form.group) {
      this._processFormGroups(formDefinition.form.group, form);
    }

    if (formDefinition.form.field) {
      this._processFormFields(formDefinition.form.field, form);
    }

    if (formDefinition.form.include) {
      this._processIncludes(formDefinition.form.include, form);
    }

    form.clearFormElement = () => {};

    return form;
  }

  _processFormGroups(groups, form) {
    groups.forEach((group) => {
      const formGroup = new FormGroup();

      group.field.forEach((field) => {
        formGroup[field.$.formid] = new FormField(field);
      });

      if (group.include) {
        group.include.forEach((include) => {
          formGroup[include.$.formid] = this.getForm(include.$.name);
        });
      }

      form[group.$.formid] = formGroup;
    });
  }

  _processFormFields(fields, form) {
    fields.forEach((field) => {
      form[field.$.formid] = new FormField(field);
    });
  }

  _processIncludes(includes, form) {
    includes.forEach((include) => {
      form[include.$.formid] = this.getForm(include.$.name);
    });
  }
}

module.exports = new FormsLoader();
