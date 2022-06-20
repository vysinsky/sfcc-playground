const { realpathSync } = require('fs');

const Request = require('../../../server/src/server/Request');
const FormsLoaderTest = require('../../../server/src/forms/FormsLoader');

describe('FormsLoader', function () {
  it('rethrows xml parsing error', () => {
    global.playgroundConfig = {
      cartridgePath: 'cartridge_a',
      cartridgesDir: realpathSync(`${__dirname}/../../../__mocks__/cartridges`),
    };

    global.request = new Request(
      {
        query: {},
      },
      {},
      {
        get locale() {
          return { id: 'en_US' };
        },
        set locale(locale) {},
      }
    );

    expect(() => {
      FormsLoaderTest.getForm('faulty');
    }).toThrow(/Unexpected close tag/);
  });

  it('creates form from XML definition', () => {
    global.playgroundConfig = {
      cartridgePath: 'cartridge_a',
      cartridgesDir: realpathSync(`${__dirname}/../../../__mocks__/cartridges`),
    };

    global.request = new Request(
      {
        query: {},
      },
      {},
      {
        get locale() {
          return { id: 'en_US' };
        },
        set locale(locale) {},
      }
    );

    const form = FormsLoaderTest.getForm('profile.xml');

    expect(form).toMatchInlineSnapshot(`
      Object {
        "clearFormElement": [Function],
        "customer": Object {
          "addtoemaillist": Object {},
          "email": Object {},
          "emailconfirm": Object {},
          "firstname": Object {},
          "lastname": Object {},
          "phone": Object {},
        },
        "include": Object {
          "clearFormElement": [Function],
          "includedField": Object {},
        },
        "login": Object {
          "currentpassword": Object {},
          "newpasswords": Object {
            "clearFormElement": [Function],
            "newpassword": Object {},
            "newpasswordconfirm": Object {},
          },
          "password": Object {},
          "passwordconfirm": Object {},
        },
      }
    `);
  });
});
