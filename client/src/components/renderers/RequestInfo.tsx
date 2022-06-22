import React from 'react';
import { Accordion, Col, Row } from 'react-bootstrap';
import JSONPretty from 'react-json-pretty';

import { RouteCallError, RouteCallResult } from '../../types';

type Props = {
  eventKey: string;
  result: RouteCallResult | RouteCallError;
};

export function RequestInfo({ eventKey, result }: Props) {
  return (
    <Accordion.Item eventKey={eventKey}>
      <Accordion.Header>Request</Accordion.Header>
      <Accordion.Body>
        <Row className="py-2 border-bottom">
          <Col sm={2}>
            <div>Query</div>
          </Col>
          <Col>
            <JSONPretty data={JSON.parse(result.request.query || '{}')} />
          </Col>
        </Row>
        <Row className="py-2 border-bottom">
          <Col sm={2}>
            <div>Body</div>
          </Col>
          <Col>
            <JSONPretty data={JSON.parse(result.request.body || '{}')} />
          </Col>
        </Row>
        <Row className="py-2 border-bottom">
          <Col sm={2}>
            <div>Headers</div>
          </Col>
          <Col>
            <JSONPretty data={JSON.parse(result.request.header || '{}')} />
          </Col>
        </Row>
      </Accordion.Body>
    </Accordion.Item>
  );
}
