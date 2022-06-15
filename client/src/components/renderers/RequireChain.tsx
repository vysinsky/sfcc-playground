import React from 'react';
import { Accordion } from 'react-bootstrap';
import JSONPretty from 'react-json-pretty';

import { RouteCallError, RouteCallResult } from '../../types';

type Props = {
  eventKey: string;
  result: RouteCallResult | RouteCallError;
};

export function RequireChain({ eventKey, result }: Props) {
  return (
    <Accordion.Item eventKey={eventKey}>
      <Accordion.Header>Require chain</Accordion.Header>
      <Accordion.Body>
        <JSONPretty json={result.requireChain} />
      </Accordion.Body>
    </Accordion.Item>
  );
}
