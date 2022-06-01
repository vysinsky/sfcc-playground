import React, { useCallback, useContext, useState } from 'react';
import {
  Badge,
  Button,
  ButtonGroup,
  Card,
  Col,
  Container,
  FloatingLabel,
  Form,
  ProgressBar,
  Row,
} from 'react-bootstrap';

import RouteCallResultRenderer from '../components/RouteCallResultRenderer';
import { PlaygroundContext } from '../components/PlaygroundContext';

function getBadgeBg(method: 'GET' | 'POST') {
  switch (method) {
    case 'GET':
      return 'primary';
    case 'POST':
      return 'info';
  }
}

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
          <Card>
            <Card.Header>
              Execution summary (click label or progressbar to filter)
            </Card.Header>
            <Card.Body>
              <Row>
                <Col>
                  <a
                    className={`text-body${
                      routeFilterState === 'all' ? ' fw-bold' : ''
                    }`}
                    href="#all-calls"
                    onClick={(e) => {
                      e.preventDefault();
                      setRouteFilterState('all');
                    }}
                  >
                    Routes called: {Object.keys(routeCallStatus).length}
                  </a>
                </Col>
                <Col>
                  <a
                    className={`text-success${
                      routeFilterState === 'successful' ? ' fw-bold' : ''
                    }`}
                    href="#successful-calls"
                    onClick={(e) => {
                      e.preventDefault();
                      setRouteFilterState('successful');
                    }}
                  >
                    Successful calls:{' '}
                    {
                      Object.values(routeCallStatus).filter(
                        (s) => !s.hasOwnProperty('isError')
                      ).length
                    }
                  </a>
                </Col>
                <Col>
                  <a
                    className={`text-danger${
                      routeFilterState === 'failed' ? ' fw-bold' : ''
                    }`}
                    href="#failed-calls"
                    onClick={(e) => {
                      e.preventDefault();
                      setRouteFilterState('failed');
                    }}
                  >
                    Failed calls:{' '}
                    {
                      Object.values(routeCallStatus).filter((s) =>
                        s.hasOwnProperty('isError')
                      ).length
                    }
                  </a>
                </Col>
              </Row>
            </Card.Body>
            {Object.keys(routeCallStatus).length > 0 && (
              <Card.Footer>
                <ProgressBar>
                  <ProgressBar
                    striped={routeFilterState === 'successful'}
                    style={{ cursor: 'pointer' }}
                    onClick={() => {
                      setRouteFilterState('successful');
                    }}
                    variant="success"
                    max={Object.keys(selectedRoutes).length}
                    now={
                      Object.values(routeCallStatus).filter(
                        (status) =>
                          status !== 'loading' &&
                          !status.hasOwnProperty('isError')
                      ).length
                    }
                    key={1}
                  />
                  <ProgressBar
                    striped={routeFilterState === 'failed'}
                    style={{ cursor: 'pointer' }}
                    onClick={() => {
                      setRouteFilterState('failed');
                    }}
                    variant="danger"
                    max={Object.keys(selectedRoutes).length}
                    now={
                      Object.values(routeCallStatus).filter(
                        (status) =>
                          status !== 'loading' &&
                          status.hasOwnProperty('isError')
                      ).length
                    }
                    key={2}
                  />
                </ProgressBar>
              </Card.Footer>
            )}
          </Card>
        </Container>
      )}
      {Object.keys(selectedRoutes)
        .filter((r) => r.match(routeFilterTerm))
        .filter((r) => {
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
        })
        .map((route) => {
          const [controller, action] = route.split('-');

          const metadata = routes.find((r) => r.name === controller)!.metadata[
            action
          ];

          return { route, metadata };
        })
        .map(({ route, metadata }) => (
          <Container key={route} className="mb-2">
            <Card>
              <Card.Header className="d-flex justify-content-between align-items-center">
                <div className="d-flex">
                  <div style={{ width: 50 }}>
                    <Badge bg={getBadgeBg(metadata.method)}>
                      {metadata.method}
                    </Badge>
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
                {routeCallStatus[route] && (
                  <RouteCallResultRenderer result={routeCallStatus[route]} />
                )}
              </Card.Body>
            </Card>
          </Container>
        ))}
    </>
  );
}
