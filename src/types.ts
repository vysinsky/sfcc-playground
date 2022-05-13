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

export type Rendering = {
  type: string;
  subType?: string;
  view?: string;
  data?: object | string;
  page?: string;
  aspectAttributes?: object;
  message?: string;
};

export type RouteStepError = {
  ErrorText: string;
  ControllerName: string;
  CurrentStartNodeName: string;
  message?: string;
};
