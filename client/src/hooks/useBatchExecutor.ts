import {
  BatchExecutor,
  PlaygroundRequest,
  Route,
  RouteCallResults,
  SelectedRoutes,
} from '../types';
import { Dispatch, SetStateAction, useState } from 'react';
import { API_BASE_URL } from '../consts';

function updateRouteState(
  setResults: (
    value:
      | ((prevState: RouteCallResults) => RouteCallResults)
      | RouteCallResults
  ) => void,
  route: string
) {
  setResults((prevState) => ({
    ...prevState,
    [route]: 'loading',
  }));
}

function getMethod(routes: Route[], controller: string, action: string) {
  return routes.find((r) => r.name === controller)!.metadata[action].method;
}

function createRequest(
  route: string,
  executionTime: Date,
  method: 'GET' | 'POST',
  queryObject: { simulateHttps: string; lang: string }
): PlaygroundRequest {
  return {
    url: route,
    executedAt: executionTime,
    method,
    query: JSON.stringify(queryObject),
  };
}

function getQueryObject(simulateHttps: boolean, locale: string) {
  return {
    simulateHttps: simulateHttps.toString(),
    lang: locale || 'default',
  };
}

async function processSuccessfulResponse(
  route: string,
  request: PlaygroundRequest,
  response: Response,
  setResults: Dispatch<SetStateAction<RouteCallResults>>
) {
  const jsonData = await response.json();
  setResults((prevState) => ({
    ...prevState,
    [route]: {
      ...jsonData,
      isError: false,
      request,
    },
  }));
}

async function processFailedResponse(
  route: string,
  request: PlaygroundRequest,
  response: Response,
  setResults: Dispatch<SetStateAction<RouteCallResults>>
) {
  const textData = await response.text();
  setResults((prevState) => ({
    ...prevState,
    [route]: {
      isError: true,
      status: response.status,
      statusText: response.statusText,
      response: textData,
      request,
    },
  }));
}

export function useBatchExecutor(
  routes: Route[],
  selectedRoutes: SelectedRoutes,
  simulateHttps: boolean,
  locale: string
): BatchExecutor {
  const [results, setResults] = useState<RouteCallResults>({});

  async function executeSingle(route: string) {
    updateRouteState(setResults, route);

    const [controller, action] = route.split('-');

    try {
      const executionTime = new Date();
      const method = getMethod(routes, controller, action);
      const baseUrl = `${API_BASE_URL}/routes/${route}`;
      const queryObject = getQueryObject(simulateHttps, locale);
      const request = createRequest(route, executionTime, method, queryObject);

      const response = await fetch(
        `${baseUrl}?${new URLSearchParams(queryObject)}`,
        {
          method,
        }
      );

      if (response.ok) {
        await processSuccessfulResponse(route, request, response, setResults);
      } else {
        await processFailedResponse(route, request, response, setResults);
      }
    } catch (e) {
      console.error(e);
    }
  }

  return {
    results,
    resultsCount: Object.keys(results).length,
    executeSingle,
    execute: async function () {
      for (const route of Object.keys(selectedRoutes)) {
        await executeSingle(route);
      }
    },
    clearResults: () => setResults({}),
  };
}
