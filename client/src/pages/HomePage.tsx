import React, { useCallback, useContext, useState } from 'react';
import {
  Button,
  ButtonGroup,
  Card,
  Container,
  FloatingLabel,
  Form,
} from 'react-bootstrap';

import RouteCallResultRenderer from '../components/RouteCallResultRenderer';
import { PlaygroundContext } from '../components/PlaygroundContext';
import { CallPending } from '../components/renderers/CallPending';
import { MethodBadge } from '../components/MethodBadge';
import { ExecutionSummaryCard } from '../components/ExecutionSummaryCard';

export function HomePage() {
  const {
    executeRoute,
    routeCallStatus,
    setRouteCallStatus,
    selectedRoutes,
    routes,
  } = useContext(PlaygroundContext);
  const [routeFilterTerm, setRouteFilterTerm] = useState<string>('');
  const [routeFilterState, setRouteFilterState] = useState<
    'all' | 'successful' | 'failed'
  >('all');

  const executeAllRoutes = useCallback(async () => {
    for (const route of Object.keys(selectedRoutes)) {
      await executeRoute(route);
    }
  }, [executeRoute, selectedRoutes]);

  const clearResults = useCallback(() => {
    setRouteCallStatus({});
  }, [setRouteCallStatus]);

  const filterResultBySearchTerm = useCallback(
    (r: string) => {
      return r.match(routeFilterTerm);
    },
    [routeFilterTerm]
  );

  const filterResultByStatus = useCallback(
    (r: string) => {
      const result = routeCallStatus[r];
      if (!result || result === 'loading') {
        return true;
      }

      if (routeFilterState === 'successful') {
        return !result.hasOwnProperty('isError');
      }

      if (routeFilterState === 'failed') {
        return result.hasOwnProperty('isError');
      }

      return true;
    },
    [routeFilterState, routeCallStatus]
  );

  const enhanceWithMetadata = useCallback(
    (route: string) => {
      const [controller, action] = route.split('-');

      const metadata = routes.find((r) => r.name === controller)!.metadata[
        action
      ];

      return { route, metadata };
    },
    [routes]
  );

  return (
    <>
      <Container className="mb-4">
        <Card>
          <Card.Body>
            {Object.keys(selectedRoutes).length === 0 ? (
              <h2>Select routes from the sidebar</h2>
            ) : (
              <div className="d-flex justify-content-between gap-5">
                <div className="w-50">
                  <FloatingLabel
                    controlId="routeFilterInput"
                    label="Filter routes"
                  >
                    <Form.Control
                      type="search"
                      value={routeFilterTerm}
                      onChange={(e) => setRouteFilterTerm(e.target.value)}
                      placeholder="Filter routes"
                    />
                  </FloatingLabel>
                </div>
                <ButtonGroup aria-label="Execution controls">
                  <Button variant="primary" onClick={executeAllRoutes}>
                    Execute {Object.keys(selectedRoutes).length} route
                    {Object.keys(selectedRoutes).length > 1 ? 's' : ''}
                  </Button>
                  <Button
                    variant="secondary"
                    onClick={clearResults}
                    disabled={Object.keys(routeCallStatus).length === 0}
                  >
                    Clear results
                  </Button>
                </ButtonGroup>
              </div>
            )}
          </Card.Body>
        </Card>
      </Container>
      {Object.keys(routeCallStatus).length > 0 && (
        <Container className="mb-4">
          <ExecutionSummaryCard
            routeFilterState={routeFilterState}
            routeCallResults={routeCallStatus}
            selectedRoutes={selectedRoutes}
            displayAllStatuses={() => {
              setRouteFilterState('all');
            }}
            displayOnlySuccessful={() => {
              setRouteFilterState('successful');
            }}
            displayOnlyFailed={() => {
              setRouteFilterState('failed');
            }}
          />
        </Container>
      )}
      {Object.keys(selectedRoutes)
        .filter(filterResultBySearchTerm)
        .filter(filterResultByStatus)
        .map(enhanceWithMetadata)
        .map(({ route, metadata }) => (
          <Container key={route} className="mb-2">
            <Card>
              <Card.Header className="d-flex justify-content-between align-items-center">
                <div className="d-flex">
                  <div style={{ width: 50 }}>
                    <MethodBadge method={metadata.method} />
                  </div>{' '}
                  /{route}
                </div>
                <Button
                  variant="primary"
                  size="sm"
                  disabled={routeCallStatus[route] === 'loading'}
                  onClick={() => {
                    executeRoute(route);
                  }}
                  className="px-4"
                >
                  {routeCallStatus[route] === 'loading'
                    ? 'Loading...'
                    : 'Call route'}
                </Button>
              </Card.Header>
              <Card.Body>
                {routeCallStatus[route] ? (
                  <RouteCallResultRenderer result={routeCallStatus[route]} />
                ) : (
                  <CallPending
                    onClick={(e) => {
                      e.preventDefault();
                      executeRoute(route);
                    }}
                  />
                )}
              </Card.Body>
            </Card>
          </Container>
        ))}
    </>
  );
}
