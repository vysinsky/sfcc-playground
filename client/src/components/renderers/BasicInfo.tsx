import React from 'react';
import { Accordion } from 'react-bootstrap';

import { RouteCallResult } from '../../types';

type Props = {
  eventKey: string;
  result: RouteCallResult;
};

export function BasicInfo({ eventKey, result }: Props) {
  return (
    <Accordion.Item eventKey={eventKey}>
      <Accordion.Header>Basic info</Accordion.Header>
      <Accordion.Body>
        <ul>
          <li>Status code: {result.statusCode}</li>
          <li>View: {result.view}</li>
          <li>
            Caching: {result.cachePeriod} {result.cachePeriodUnit}
          </li>
          <li>Is Json: {result.isJson ? 'true' : 'false'}</li>
          <li>Is XML: {result.isXml ? 'true' : 'false'}</li>
        </ul>
      </Accordion.Body>
    </Accordion.Item>
  );
}
