const SimpleCache = require('*/modules/server/simpleCache');
const FormField = require('dw/web/FormField');
const FormGroup = require('dw/web/FormGroup');
class Session {
  get forms() {
    return {
      profile: {
        customer: (() => {
          const group = new FormGroup();

          group.email = new FormField();
          group.emailconfirm = new FormField();
          group.firstname = new FormField();
          group.lastname = new FormField();
          group.phone = new FormField();

          return group;
        })(),
        login: (() => {
          const group = new FormGroup();

          group.password = new FormField();
          group.passwordconfirm = new FormField();

          group.newpasswords = new FormGroup();
          group.newpasswords.newpassword = new FormField();
          group.newpasswords.newpasswordconfirm = new FormField();
          group.currentpassword = new FormField();

          return group;
        })(),
        clearFormElement() {},
      },
      newPasswords: {
        newpassword: new FormField(),
        newpasswordconfirm: new FormField(),
        clearFormElement() {},
      },
      address: {
        clearFormElement() {},
      },
      shipping: {
        shippingAddress: (() => {
          const group = new FormGroup();

          group.addressFields = new FormGroup();
          group.addressFields.firstName = new FormField();
          group.addressFields.lastName = new FormField();
          group.addressFields.address1 = new FormField();
          group.addressFields.address2 = new FormField();
          group.addressFields.city = new FormField();
          group.addressFields.postalCode = new FormField();
          group.addressFields.country = new FormField();
          group.addressFields.phone = new FormField();

          return group;
        })(),
        clearFormElement() {},
      },
    };
  }

  get sourceCodeInfo() {
    return {};
  }

  get clickStream() {
    return {
      clicks: [
        {
          pipelineName: 'Foo-Bar',
          queryString: '',
        },
        {
          pipelineName: 'Search-ShowAjax',
          queryString:
            'cgid=womens-clothing-tops&prefn1=refinementColor&prefv1=Blue&start=12&sz=12&selectedUrl=qwertyuiop',
        },
        {
          pipelineName: 'Product-Show',
          queryString: 'qwertyuiopiutrewerty',
        },
        {
          pipelineName: 'Search-Show',
          queryString: 'cgid=womens-clothing-tops',
        },
      ],
    };
  }

  get raw() {
    return {};
  }

  get currency() {
    return {
      currencyCode: 'XYZ',
      defaultFractionDigits: 10,
      name: 'Volodin Dollars',
      symbol: '៛',
    };
  }

  constructor() {
    this.privacyCache = new SimpleCache({});
  }
}

module.exports = Session;
