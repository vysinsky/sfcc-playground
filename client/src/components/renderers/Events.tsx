import React from 'react';
import { Accordion } from 'react-bootstrap';
import JSONPretty from 'react-json-pretty';

import { RouteCallResult } from '../../types';
import { CartridgeBadge } from '../CartridgeBadge';

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
          <div key={i}>
            <CartridgeBadge cartridge={event.calledFrom} />
            <JSONPretty key={i} json={event} />
          </div>
        ))}
      </Accordion.Body>
    </Accordion.Item>
  );
}
