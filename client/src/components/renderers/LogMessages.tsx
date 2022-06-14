import React from 'react';
import { Accordion, Col, Row } from 'react-bootstrap';

import { RouteCallResult } from '../../types';
import { CartridgeBadge } from '../CartridgeBadge';

type Props = { eventKey: string; result: RouteCallResult };

export function LogMessages({ eventKey, result }: Props) {
  return (
    <Accordion.Item eventKey={eventKey}>
      <Accordion.Header>
        Message log ({result.messageLog.length})
      </Accordion.Header>
      <Accordion.Body>
        {result.messageLog.map(({ cartridge, message }, i) => (
          <Row key={i} className="py-2 border-bottom">
            <Col sm={2}>
              <CartridgeBadge cartridge={cartridge} />
            </Col>
            <Col>{message}</Col>
          </Row>
        ))}
      </Accordion.Body>
    </Accordion.Item>
  );
}
