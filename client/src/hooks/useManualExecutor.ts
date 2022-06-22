import { useState } from 'react';
import {
  ManualCallInput,
  ManualExecutor,
  PlaygroundApiCallResult,
  PlaygroundRequest,
  SettledPlaygroundApiCallResult,
} from '../types';
import { API_BASE_URL } from '../consts';

function updateHistory(
  lastCallResult: PlaygroundApiCallResult,
  setCallsHistory: (
    value:
      | ((
          prevState: SettledPlaygroundApiCallResult[]
        ) => SettledPlaygroundApiCallResult[])
      | SettledPlaygroundApiCallResult[]
  ) => void,
  callsHistory: SettledPlaygroundApiCallResult[]
) {
  if (lastCallResult !== 'loading' && typeof lastCallResult !== 'undefined') {
    setCallsHistory([...callsHistory, lastCallResult]);
  }
}

function buildUrl(
  input: ManualCallInput,
  inputUrl: URL,
  simulateHttps: boolean,
  locale: string
) {
  return `${API_BASE_URL}/routes${inputUrl.pathname}?${new URLSearchParams({
    simulateHttps: simulateHttps ? 'true' : 'false',
    lang: locale ? locale : 'default',
    ...Object.fromEntries(inputUrl.searchParams.entries()),
    ...JSON.parse(input.query || '{}'),
  })}`;
}

export function useManualExecutor(
  simulateHttps: boolean,
  locale: string
): ManualExecutor {
  const [lastCallResult, setLastCallResult] =
    useState<PlaygroundApiCallResult>();
  const [callsHistory, setCallsHistory] = useState<
    SettledPlaygroundApiCallResult[]
  >([]);

  return {
    lastCallResult,
    clearLastCallResult: () => {
      setLastCallResult(undefined);
    },
    history: callsHistory,
    clearHistory: () => {
      setCallsHistory([]);
    },
    execute: async (input: ManualCallInput) => {
      updateHistory(lastCallResult, setCallsHistory, callsHistory);
      setLastCallResult('loading');

      try {
        const inputUrl = new URL(`https://example.com/${input.url}`);
        const executionTime = new Date();
        const body = input.method === 'GET' ? undefined : input.body;

        const request: PlaygroundRequest = {
          url: inputUrl.pathname,
          executedAt: executionTime,
          method: input.method,
          query: input.query,
          body,
          header: input.header,
        };

        const response = await fetch(
          buildUrl(input, inputUrl, simulateHttps, locale),
          {
            method: input.method,
            body,
            headers: input.header ? JSON.parse(input.header) : undefined,
          }
        );

        if (response.ok) {
          const jsonData = await response.json();
          setLastCallResult({
            ...jsonData,
            isError: false,
            request,
          });
        } else {
          setLastCallResult({
            isError: true,
            status: response.status,
            statusText: response.statusText,
            response: await response.text(),
            request,
          });
        }
      } catch (e) {
        console.error(e);
      }
    },
  };
}
