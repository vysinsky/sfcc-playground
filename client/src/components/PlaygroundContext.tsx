import { createContext, PropsWithChildren, useEffect, useState } from 'react';

import { PlaygroundContextType, Route } from '../../types/types';
import { API_BASE_URL } from '../consts';
import Loader from './Loader';

export const PlaygroundContext = createContext<PlaygroundContextType>({
  routes: [],
  loaded: false,
  simulateHttps: true,
  enableHttpsSimulation: () => {},
  disableHttpsSimulation: () => {},
});

function PlaygroundContextProvider({ children }: PropsWithChildren<any>) {
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

  return (
    <PlaygroundContext.Provider
      value={{
        loaded,
        routes,
        simulateHttps,
        enableHttpsSimulation: () => {
          setSimulateHttps(true);
        },
        disableHttpsSimulation: () => {
          setSimulateHttps(false);
        },
      }}
    >
      {loaded ? children : <Loader />}
    </PlaygroundContext.Provider>
  );
}

export default PlaygroundContextProvider;
