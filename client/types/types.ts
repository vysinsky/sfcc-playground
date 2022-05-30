import { Rendering } from '../../types/shared';

export type PlaygroundContextType = {
  loaded: boolean;
  routes: Route[];
  simulateHttps: boolean;
  enableHttpsSimulation: () => void;
  disableHttpsSimulation: () => void;
};

export type Route = {
  name: string;
  actions: string[];
};

export type RouteCallError = {
  status: number;
  statusText: string;
  response?: string;
};

export type RouteCallResult = {
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
