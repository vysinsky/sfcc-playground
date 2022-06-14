import React from 'react';
import { Accordion } from 'react-bootstrap';
import JSONPretty from 'react-json-pretty';

import { RouteCallResult } from '../../types';

type Props = {
  eventKey: string;
  result: RouteCallResult;
};

export function ViewData({ eventKey, result }: Props) {
  return (
    <Accordion.Item eventKey={eventKey}>
      <Accordion.Header>View data</Accordion.Header>
      <Accordion.Body>
        <JSONPretty json={result.viewData} />
      </Accordion.Body>
    </Accordion.Item>
  );
}
