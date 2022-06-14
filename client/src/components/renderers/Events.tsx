import React from 'react';
import { Accordion } from 'react-bootstrap';
import JSONPretty from 'react-json-pretty';

import { RouteCallResult } from '../../types';

type Props = {
  eventKey: string;
  result: RouteCallResult;
};

export function Events({ eventKey, result }: Props) {
  return (
    <Accordion.Item eventKey={eventKey}>
      <Accordion.Header>Events ({result.events.length})</Accordion.Header>
      <Accordion.Body>
        {result.events.map((event, i) => (
          <JSONPretty key={i} json={event} />
        ))}
      </Accordion.Body>
    </Accordion.Item>
  );
}
