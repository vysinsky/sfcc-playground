const Route = require('../../../server/src/server/Route');
const Request = require('../../../server/src/server/Request');
const Response = require('../../../server/src/server/Response');

describe('Route', () => {
  test('getRoute', () => {
    global.request = new Request();
    global.response = new Response();

    const chain0 = jest.fn((req, res, next) => next());
    const chain1 = jest.fn((req, res, next) => next());

    const route = new Route('Show', [chain0, chain1]);
    const routeCall = route.getRoute();
    routeCall();

    expect(chain0).toBeCalledTimes(1);
    expect(chain1).toBeCalledTimes(1);
    expect(global.response.events.map(({ event }) => event))
      .toMatchInlineSnapshot(`
      Array [
        "route:Start",
        "route:Step",
        "route:BeforeComplete",
        "route:Complete",
      ]
    `);
  });

  test('getRoute with errors in request', () => {
    global.request = new Request();
    global.response = new Response();

    const chain0 = jest.fn((req, res, next) => next());
    const chain1 = jest.fn((req, res, next) => next());

    const route = new Route('Show', [chain0, chain1]);
    const routeCall = route.getRoute();
    routeCall({ ControllerName: 'Home', ErrorText: 'Some error happened' });

    expect(chain0).toBeCalledTimes(1);
    expect(chain1).toBeCalledTimes(1);
    expect(global.request.error).toMatchInlineSnapshot(`
      Object {
        "controllerName": "Home",
        "errorText": "Some error happened",
        "startNodeName": "Show",
      }
    `);
    expect(global.response.events.map(({ event }) => event))
      .toMatchInlineSnapshot(`
      Array [
        "route:Start",
        "route:Step",
        "route:BeforeComplete",
        "route:Complete",
      ]
    `);
  });

  test('getRoute with errors in middleware', () => {
    global.request = new Request();
    global.response = new Response();

    const chain0 = jest.fn((req, res, next) =>
      next(new Error('Error in middleware'))
    );
    const chain1 = jest.fn((req, res, next) => next());

    const route = new Route('Show', [chain0, chain1]);
    const routeCall = route.getRoute();

    expect(routeCall).toThrow('Error in middleware');
    expect(chain0).toBeCalledTimes(1);
    expect(chain1).toBeCalledTimes(0);
    expect(global.response.events.map(({ event }) => event))
      .toMatchInlineSnapshot(`
      Array [
        "route:Start",
      ]
    `);
  });

  test('getRoute append', () => {
    global.request = new Request();
    global.response = new Response();

    const chain0 = jest.fn((req, res, next) => next());
    const chain1 = jest.fn((req, res, next) => next());

    const route = new Route('Show', [chain0, chain1]);

    const chain2 = jest.fn((req, res, next) => next());

    route.append(chain2);

    const routeCall = route.getRoute();
    routeCall();

    expect(chain0).toBeCalledTimes(1);
    expect(chain1).toBeCalledTimes(1);
    expect(chain2).toBeCalledTimes(1);
    expect(global.response.events.map(({ event }) => event))
      .toMatchInlineSnapshot(`
      Array [
        "route:Start",
        "route:Step",
        "route:Step",
        "route:BeforeComplete",
        "route:Complete",
      ]
    `);
  });

  test('getRoute - break chain on redirect', () => {
    global.request = new Request();
    global.response = new Response();

    const chain0 = jest.fn((req, res, next) => {
      res.redirect('some-redirect-url');
      next();
    });
    const chain1 = jest.fn((req, res, next) => next());

    const route = new Route('Show', [chain0, chain1]);
    const routeCall = route.getRoute();
    routeCall();

    expect(chain0).toBeCalledTimes(1);
    expect(chain1).toBeCalledTimes(0);
    expect(global.response.events.map(({ event }) => event))
      .toMatchInlineSnapshot(`
      Array [
        "route:Start",
        "route:Redirect",
      ]
    `);
  });
});
