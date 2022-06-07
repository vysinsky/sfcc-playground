import React from 'react';
import { Accordion, Alert, Badge } from 'react-bootstrap';
import JSONPretty from 'react-json-pretty';
import 'react-json-pretty/themes/monikai.css';

import { RouteCallError, RouteCallResult } from '../types';

interface Props {
  result: RouteCallResult | RouteCallError | 'loading';
}

function RouteCallResultRenderer({ result }: Props) {
  if (result === 'loading') {
    return null;
  }

  if (result.isError) {
    const routeCallError = result as RouteCallError;
    return (
      <Alert className="mt-2" variant="danger">
        <Badge bg="danger">{routeCallError.status}</Badge> Error calling the
        route.
        {typeof routeCallError.response !== 'undefined' && (
          <div
            className="p-2"
            dangerouslySetInnerHTML={{
              __html: routeCallError.response,
            }}
          ></div>
        )}
      </Alert>
    );
  }

  return (
    <Accordion defaultActiveKey="basics">
      <Accordion.Item eventKey="basics">
        <Accordion.Header>Basic info</Accordion.Header>
        <Accordion.Body>
          <ul>
            <li>View: {result.view}</li>
            <li>
              Caching: {result.cachePeriod} {result.cachePeriodUnit}
            </li>
            <li>Is Json: {result.isJson ? 'true' : 'false'}</li>
            <li>Is XML: {result.isXml ? 'true' : 'false'}</li>
          </ul>
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="renderings">
        <Accordion.Header>
          Renderings ({result.renderings.length})
        </Accordion.Header>
        <Accordion.Body>
          {result.renderings.map((rendering, i) => (
            <JSONPretty key={i} data={rendering} />
          ))}
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="view-data">
        <Accordion.Header>View data</Accordion.Header>
        <Accordion.Body>
          <JSONPretty data={result.viewData} />
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="events">
        <Accordion.Header>Events ({result.events.length})</Accordion.Header>
        <Accordion.Body>
          {result.events.map((event, i) => (
            <JSONPretty key={i} data={event} />
          ))}
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="log">
        <Accordion.Header>
          Message log ({result.messageLog.length})
        </Accordion.Header>
        <Accordion.Body>
          {result.messageLog.map((message, i) => (
            <Alert key={i} variant="info">
              {message}
            </Alert>
          ))}
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="raw">
        <Accordion.Header>Raw response</Accordion.Header>
        <Accordion.Body>
          <JSONPretty data={result} />
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
}

export default RouteCallResultRenderer;
