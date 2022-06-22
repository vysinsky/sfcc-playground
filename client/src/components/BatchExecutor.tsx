import React, { useCallback, useState } from 'react';

import { usePlaygroundContext } from './PlaygroundContext';
import {
  Button,
  ButtonGroup,
  Card,
  Container,
  FloatingLabel,
  Form,
} from 'react-bootstrap';
import { ExecutionSummaryCard } from './ExecutionSummaryCard';
import { MethodBadge } from './MethodBadge';
import RouteCallResultRenderer from './RouteCallResultRenderer';
import { CallPending } from './renderers/CallPending';

export function BatchExecutor() {
  const { batchExecutor, selectedRoutes, routes, selectedRoutesCount } =
    usePlaygroundContext();

  const [routeFilterTerm, setRouteFilterTerm] = useState<string>('');
  const [routeFilterState, setRouteFilterState] = useState<
    'all' | 'successful' | 'failed'
  >('all');

  const filterResultBySearchTerm = useCallback(
    (r: string) => {
      return r.match(routeFilterTerm);
    },
    [routeFilterTerm]
  );

  const filterResultByStatus = useCallback(
    (r: string) => {
      const result = batchExecutor.results[r];
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
    [routeFilterState, batchExecutor.results]
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
    <Container>
      <Card className="mb-2">
        <Card.Header>
          {selectedRoutesCount === 0 ? (
            <strong>
              Select routes from the sidebar and make a batch call
            </strong>
          ) : (
            <strong>
              {selectedRoutesCount} route
              {selectedRoutesCount > 1 ? 's' : ''} selected
            </strong>
          )}
        </Card.Header>
        <Card.Body>
          <div className="d-flex justify-content-between gap-5">
            <div className="w-50">
              <FloatingLabel controlId="routeFilterInput" label="Filter routes">
                <Form.Control
                  type="search"
                  value={routeFilterTerm}
                  onChange={(e) => setRouteFilterTerm(e.target.value)}
                  placeholder="Filter routes"
                />
              </FloatingLabel>
            </div>
            <ButtonGroup aria-label="Execution controls">
              <Button variant="primary" onClick={batchExecutor.execute}>
                Execute {Object.keys(selectedRoutes).length} route
                {Object.keys(selectedRoutes).length > 1 ? 's' : ''}
              </Button>
              <Button
                variant="secondary"
                onClick={batchExecutor.clearResults}
                disabled={batchExecutor.resultsCount === 0}
              >
                Clear results
              </Button>
            </ButtonGroup>
          </div>
        </Card.Body>
      </Card>
      {batchExecutor.resultsCount > 0 && (
        <ExecutionSummaryCard
          routeFilterState={routeFilterState}
          routeCallResults={batchExecutor.results}
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
      )}
      {Object.keys(selectedRoutes)
        .filter(filterResultBySearchTerm)
        .filter(filterResultByStatus)
        .map(enhanceWithMetadata)
        .map(({ route, metadata }) => (
          <Card key={route} className="mb-2">
            <Card.Header className="d-flex justify-content-between align-items-center">
              <div className="d-flex">
                <div style={{ width: 50 }}>
                  <MethodBadge method={metadata.method} />
                </div>{' '}
                <strong>/{route}</strong>
              </div>
              <Button
                variant="primary"
                size="sm"
                disabled={batchExecutor.results[route] === 'loading'}
                onClick={() => {
                  batchExecutor.executeSingle(route);
                }}
                className="px-4"
              >
                {batchExecutor.results[route] === 'loading'
                  ? 'Loading...'
                  : 'Call route'}
              </Button>
            </Card.Header>
            <Card.Body>
              {batchExecutor.results[route] ? (
                <RouteCallResultRenderer
                  result={batchExecutor.results[route]}
                />
              ) : (
                <CallPending
                  onClick={(e) => {
                    e.preventDefault();
                    batchExecutor.executeSingle(route);
                  }}
                />
              )}
            </Card.Body>
          </Card>
        ))}
    </Container>
  );
}
