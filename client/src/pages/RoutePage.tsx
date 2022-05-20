import React, { useCallback, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  Alert,
  Badge,
  Button,
  Card,
  Col,
  Container,
  Row,
} from 'react-bootstrap';

import { API_BASE_URL } from '../consts';
import { RouteCallError, RouteCallResult } from '../../types/types';
import RouteCallResultRenderer from '../components/RouteCallResultRenderer';

export function RoutePage() {
  const params = useParams();
  const route = params.route as string;
  const [loading, setLoading] = useState(false);
  const [routeCallError, setRouteCallError] = useState<{
    [key: string]: RouteCallError;
  }>();
  const [routeCallResult, setRouteCallResult] = useState<{
    [key: string]: RouteCallResult;
  }>();

  const callRoute = useCallback(async () => {
    setLoading(true);

    try {
      const response = await fetch(`${API_BASE_URL}/routes/${route}`);

      if (response.ok) {
        setRouteCallResult({
          ...routeCallResult,
          [route]: await response.json(),
        });
      } else {
        setRouteCallError({
          ...routeCallError,
          [route]: {
            status: response.status,
            statusText: response.statusText,
            response: await response.text(),
          },
        });
      }
    } catch (e) {
      console.error(e);
    }

    setLoading(false);
  }, [route, routeCallResult, routeCallError]);

  return (
    <Container>
      <Card>
        <Card.Body>
          <Container>
            <Row>
              <Col className="pt-2">
                <h4>http://localhost:8080/route/{route}</h4>
              </Col>
              <Col xs={3} className="d-flex pt-1 justify-content-end">
                <Button
                  variant="primary"
                  disabled={loading}
                  onClick={callRoute}
                  className="px-4"
                >
                  {loading ? 'Loading...' : 'Call route'}
                </Button>
              </Col>
            </Row>
          </Container>
        </Card.Body>
      </Card>
      {routeCallError?.[route] && (
        <Alert className="mt-2" variant="danger">
          <Badge bg="danger">{routeCallError[route].status}</Badge> Error
          calling the route.
          {typeof routeCallError[route].response !== 'undefined' && (
            <div
              className="p-2"
              dangerouslySetInnerHTML={{
                // @ts-expect-error
                __html: routeCallError[route].response,
              }}
            ></div>
          )}
        </Alert>
      )}
      {routeCallResult?.[route] && (
        <RouteCallResultRenderer result={routeCallResult[route]} />
      )}
    </Container>
  );
}
