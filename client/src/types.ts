import React from 'react';

export type SelectedRoutes = {
  [key: string]: { route: string; action: string };
};

export type RouteCallResults = {
  [key: string]: RouteCallResult | RouteCallError | 'loading';
};

export type PlaygroundContextType = {
  loaded: boolean;
  routes: Route[];
  selectedRoutes: SelectedRoutes;
  simulateHttps: boolean;
  locale: string;
  enableHttpsSimulation: () => void;
  disableHttpsSimulation: () => void;
  setSelectedRoutes: React.Dispatch<React.SetStateAction<SelectedRoutes>>;
  executeRoute: (route: string) => Promise<void>;
  routeCallStatus: RouteCallResults;
  setRouteCallStatus: React.Dispatch<React.SetStateAction<RouteCallResults>>;
  setLocale: React.Dispatch<React.SetStateAction<string>>;
};

export type Route = {
  name: string;
  actions: string[];
  metadata: { [key: string]: { method: 'GET' | 'POST' } };
};

export type RouteCallError = {
  isError: true;
  status: number;
  statusText: string;
  response?: string;
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
};

export type PlaygroundConfiguration = {
  rootDir: string;
  cartridgesDir: string;
  cartridgePath: string;
  apiPort: number;
};

export type ServerExports = {
  [key: string]: Function & {
    public?: boolean;
  };
} & {
  __routes?: { [key: string]: any };
};

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

export type RouteStepError = {
  ErrorText: string;
  ControllerName: string;
  CurrentStartNodeName: string;
  message?: string;
};
