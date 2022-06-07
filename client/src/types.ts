import { Rendering } from '../../types/shared';
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
  viewData: any;
  messageLog: string[];
};
