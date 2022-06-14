import React from 'react';
import { Accordion, Col, Row } from 'react-bootstrap';
import JSONPretty from 'react-json-pretty';

import { RouteCallResult } from '../../types';
import { CartridgeBadge } from '../CartridgeBadge';

type Props = {
  eventKey: string;
  result: RouteCallResult;
};

export function ViewData({ eventKey, result }: Props) {
  return (
    <Accordion.Item eventKey={eventKey}>
      <Accordion.Header>View data (pdict)</Accordion.Header>
      <Accordion.Body>
        {Object.entries(result.viewData).map(
          ([key, { value, lastUpdateFrom }]) => (
            <Row key={key} className="py-2 border-bottom">
              <Col sm={2}>
                <div>{key}</div>
                <CartridgeBadge cartridge={lastUpdateFrom} />
              </Col>
              <Col>
                <JSONPretty data={value} />
              </Col>
            </Row>
          )
        )}
      </Accordion.Body>
    </Accordion.Item>
  );
}
