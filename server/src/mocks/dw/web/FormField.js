const FormElement = require('dw/web/FormElement');

class FormField extends FormElement {
  _value = '';

  options = [];

  constructor(field) {
    super();

    if (field.options) {
      this.options = this._processOptions(field.options[0].option);
    }
  }

  get value() {
    return this._value;
  }

  set value(value) {
    this._value = value;
  }

  _processOptions(options) {
    options.optionsCount = options.length;
    return options;
  }
}

module.exports = FormField;
