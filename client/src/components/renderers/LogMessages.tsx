import React from 'react';
import { Accordion, Alert } from 'react-bootstrap';

import { RouteCallResult } from '../../types';

type Props = { eventKey: string; result: RouteCallResult };

export function LogMessages({ eventKey, result }: Props) {
  return (
    <Accordion.Item eventKey={eventKey}>
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
  );
}
