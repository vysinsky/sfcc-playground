import React from 'react';
import { Accordion, Alert, Badge } from 'react-bootstrap';
import 'react-json-pretty/themes/monikai.css';

import { RouteCallError, RouteCallResult } from '../types';

import { BasicInfo } from './renderers/BasicInfo';
import { RequestInfo } from './renderers/RequestInfo';
import { Renderings } from './renderers/Renderings';
import { ViewData } from './renderers/ViewData';
import { Events } from './renderers/Events';
import { LogMessages } from './renderers/LogMessages';
import { RawResponse } from './renderers/RawResponse';
import { CallError } from './renderers/CallError';
import { RequireChain } from './renderers/RequireChain';
import { MethodBadge } from './MethodBadge';

interface Props {
  result: RouteCallResult | RouteCallError | 'loading';
  displayRequestInfo?: boolean;
}

function RouteCallResultRenderer({ result, displayRequestInfo }: Props) {
  if (result === 'loading') {
    return null;
  }

  if (result.isError) {
    const routeCallError = result as RouteCallError;
    return <CallError routeCallError={routeCallError} />;
  }

  return (
    <>
      {displayRequestInfo && result.request && (
        <Alert variant="info">
          <Badge>{result.request.executedAt?.toLocaleTimeString()}</Badge>{' '}
          <MethodBadge method={result.request.method} />{' '}
          <strong>{result.request.url}</strong>
        </Alert>
      )}
      <Accordion alwaysOpen>
        <BasicInfo eventKey="basics" result={result} />
        <RequestInfo eventKey="request" result={result} />
        <Renderings eventKey="renderings" result={result} />
        <ViewData eventKey="view-data" result={result} />
        <Events eventKey="events" result={result} />
        <LogMessages eventKey="log" result={result} />
        <RawResponse eventKey="raw" result={result} />
        <RequireChain eventKey="requireChain" result={result} />
      </Accordion>
    </>
  );
}

export default RouteCallResultRenderer;
