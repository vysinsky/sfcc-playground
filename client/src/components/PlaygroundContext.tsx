import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from 'react';

import { PlaygroundContextType, Route, SelectedRoutes } from '../types';
import { API_BASE_URL } from '../consts';
import Loader from './Loader';
import { useManualExecutor } from '../hooks/useManualExecutor';
import { useBatchExecutor } from '../hooks/useBatchExecutor';

export const PlaygroundContext = createContext<PlaygroundContextType>({
  routes: [],
  routesCount: 0,
  selectedRoutes: {},
  selectedRoutesCount: 0,
  routesLoaded: false,
  globalCallSettings: {
    simulateHttps: true,
    locale: 'default',
    setLocale: () => undefined,
    disableHttpsSimulation: () => undefined,
    enableHttpsSimulation: () => undefined,
  },
  batchExecutor: {
    results: {},
    resultsCount: 0,
    clearResults: () => undefined,
    execute: async () => undefined,
    executeSingle: async () => undefined,
  },
  manualExecutor: {
    lastCallResult: undefined,
    history: [],
    execute: async () => undefined,
    clearHistory: () => undefined,
    clearLastCallResult: () => undefined,
  },
  setSelectedRoutes: () => undefined,
});

function PlaygroundContextProvider({ children }: PropsWithChildren<any>) {
  const [selectedRoutes, setSelectedRoutes] = useState<SelectedRoutes>({});
  const [locale, setLocale] = useState('default');
  const [routesLoaded, setRoutesLoaded] = useState(false);
  const [routes, setRoutes] = useState<Route[]>([]);
  const [simulateHttps, setSimulateHttps] = useState(true);

  const manualExecutor = useManualExecutor(simulateHttps, locale);
  const batchExecutor = useBatchExecutor(
    routes,
    selectedRoutes,
    simulateHttps,
    locale
  );

  // Load routes
  useEffect(() => {
    (async () => {
      setRoutesLoaded(false);
      const data = await (await fetch(`${API_BASE_URL}/routes`)).json();
      setRoutes(data.routes);
      setRoutesLoaded(true);
    })();
  }, []);

  return (
    <PlaygroundContext.Provider
      value={{
        globalCallSettings: {
          simulateHttps,
          locale,
          enableHttpsSimulation: () => {
            setSimulateHttps(true);
          },
          disableHttpsSimulation: () => {
            setSimulateHttps(false);
          },
          setLocale,
        },
        batchExecutor,
        manualExecutor,
        routesLoaded,
        routes,
        routesCount: Object.keys(routes).length,
        selectedRoutes,
        selectedRoutesCount: Object.keys(selectedRoutes).length,
        setSelectedRoutes,
      }}
    >
      {routesLoaded ? children : <Loader />}
    </PlaygroundContext.Provider>
  );
}

export default PlaygroundContextProvider;

export function usePlaygroundContext() {
  return useContext(PlaygroundContext);
}
