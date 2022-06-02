import {
  createContext,
  PropsWithChildren,
  useCallback,
  useEffect,
  useState,
} from 'react';

import {
  PlaygroundContextType,
  Route,
  RouteCallResults,
  SelectedRoutes,
} from '../../types/types';
import { API_BASE_URL } from '../consts';
import Loader from './Loader';

export const PlaygroundContext = createContext<PlaygroundContextType>({
  routes: [],
  selectedRoutes: {},
  loaded: false,
  simulateHttps: true,
  enableHttpsSimulation: () => {},
  disableHttpsSimulation: () => {},
  setSelectedRoutes: () => {},
  executeRoute: async () => {},
  routeCallStatus: {},
  setRouteCallStatus: () => {},
});

function PlaygroundContextProvider({ children }: PropsWithChildren<any>) {
  const [selectedRoutes, setSelectedRoutes] = useState<SelectedRoutes>({});
  const [routeCallStatus, setRouteCallStatus] = useState<RouteCallResults>({});
  const [loaded, setLoaded] = useState(false);
  const [routes, setRoutes] = useState<Route[]>([]);
  const [simulateHttps, setSimulateHttps] = useState(true);

  useEffect(() => {
    (async () => {
      setLoaded(false);
      const data = await (await fetch(`${API_BASE_URL}/routes`)).json();
      setRoutes(data.routes);
      setLoaded(true);
    })();
  }, []);

  const executeRoute = useCallback(
    async (route: string) => {
      setRouteCallStatus((prevState) => ({
        ...prevState,
        [route]: 'loading',
      }));

      const [controller, action] = route.split('-');

      try {
        const response = await fetch(
          `${API_BASE_URL}/routes/${route}?${new URLSearchParams({
            simulateHttps: simulateHttps ? 'true' : 'false',
          })}`,
          {
            method: routes.find((r) => r.name === controller)!.metadata[action]
              .method,
          }
        );

        if (response.ok) {
          const jsonData = await response.json();
          setRouteCallStatus((prevState) => ({
            ...prevState,
            [route]: jsonData,
          }));
        } else {
          const textData = await response.text();
          setRouteCallStatus((prevState) => ({
            ...prevState,
            [route]: {
              isError: true,
              status: response.status,
              statusText: response.statusText,
              response: textData,
            },
          }));
        }
      } catch (e) {
        console.error(e);
      }
    },
    [setRouteCallStatus, simulateHttps, routes]
  );

  return (
    <PlaygroundContext.Provider
      value={{
        loaded,
        routes,
        selectedRoutes,
        simulateHttps,
        setSelectedRoutes,
        enableHttpsSimulation: () => {
          setSimulateHttps(true);
        },
        disableHttpsSimulation: () => {
          setSimulateHttps(false);
        },
        executeRoute,
        routeCallStatus,
        setRouteCallStatus,
      }}
    >
      {loaded ? children : <Loader />}
    </PlaygroundContext.Provider>
  );
}

export default PlaygroundContextProvider;
