import React from 'react';
import { Accordion } from 'react-bootstrap';
import JSONPretty from 'react-json-pretty';

import { RouteCallError, RouteCallResult } from '../../types';

type Props = {
  eventKey: string;
  result: RouteCallResult | RouteCallError;
};

export function RawResponse({ eventKey, result }: Props) {
  return (
    <Accordion.Item eventKey={eventKey}>
      <Accordion.Header>Raw response</Accordion.Header>
      <Accordion.Body>
        <JSONPretty json={result} />
      </Accordion.Body>
    </Accordion.Item>
  );
}
