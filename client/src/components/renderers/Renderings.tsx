import React from 'react';
import { Accordion } from 'react-bootstrap';
import JSONPretty from 'react-json-pretty';

import { RouteCallResult } from '../../types';

type Props = {
  eventKey: string;
  result: RouteCallResult;
};

export function Renderings({ eventKey, result }: Props) {
  return (
    <Accordion.Item eventKey={eventKey}>
      <Accordion.Header>
        Renderings ({result.renderings.length})
      </Accordion.Header>
      <Accordion.Body>
        {result.renderings.map((rendering, i) => (
          <JSONPretty key={i} json={rendering} />
        ))}
      </Accordion.Body>
    </Accordion.Item>
  );
}
