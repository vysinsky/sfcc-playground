import React from 'react';

export type SelectedRoutes = {
  [key: string]: { route: string; action: string };
};

export type RouteCallResults = {
  [key: string]: SettledPlaygroundApiCallResult | 'loading';
};

export type ManualCallInput = {
  method: 'GET' | 'POST';
  url: string;
  query: string;
  body: string;
  header: string;
};

export type ManualExecutor = {
  execute: (input: ManualCallInput) => Promise<void>;
  lastCallResult: PlaygroundApiCallResult;
  clearLastCallResult: () => void;
  history: SettledPlaygroundApiCallResult[];
  clearHistory: () => void;
};

export type BatchExecutor = {
  execute: () => Promise<void>;
  executeSingle: (route: string) => Promise<void>;
  results: RouteCallResults;
  resultsCount: number;
  clearResults: () => void;
};

export type PlaygroundContextType = {
  routesLoaded: boolean;
  routes: Route[];
  routesCount: number;
  selectedRoutes: SelectedRoutes;
  selectedRoutesCount: number;
  setSelectedRoutes: React.Dispatch<React.SetStateAction<SelectedRoutes>>;
  globalCallSettings: {
    simulateHttps: boolean;
    locale: string;
    enableHttpsSimulation: () => void;
    disableHttpsSimulation: () => void;
    setLocale: React.Dispatch<React.SetStateAction<string>>;
  };
  batchExecutor: BatchExecutor;
  manualExecutor: ManualExecutor;
};

export type Route = {
  name: string;
  actions: string[];
  metadata: { [key: string]: { method: 'GET' | 'POST' } };
};

export type PlaygroundRequest = {
  url: string | undefined;
  executedAt: Date | undefined;
  method: 'GET' | 'POST';
  query: string;
  body?: string;
  header?: string;
};

export type RouteCallError = {
  isError: true;
  status: number;
  statusText: string;
  response?: string;
  requireChain?: [{ from: string; result: string }];
  request: PlaygroundRequest;
};

export type RouteCallResult = {
  isError: false;
  cachePeriod: number | undefined;
  cachePeriodUnit: string | undefined;
  isJson: boolean;
  isXml: boolean;
  events: any[];
  httpHeaders: { [key: string]: string };
  renderings: Rendering[];
  view: string;
  viewData: { [key: string]: ViewDataRecord };
  messageLog: { message: string; cartridge: string }[];
  statusCode: number;
  requireChain?: [{ from: string; result: string }];
  request: PlaygroundRequest;
};

export type PlaygroundApiCallResult =
  | RouteCallResult
  | RouteCallError
  | 'loading'
  | undefined;
export type SettledPlaygroundApiCallResult = RouteCallResult | RouteCallError;

export type ViewDataRecord = {
  value: any;
  lastUpdateFrom: string;
};

export type Rendering = {
  type: string;
  subType?: string;
  view?: string;
  data?: object | string;
  page?: string;
  aspectAttributes?: object;
  message?: string;
  renderedFrom: string;
};
