import React from 'react';
import { Alert, Badge } from 'react-bootstrap';

import { RouteCallError } from '../../types';

type Props = { routeCallError: RouteCallError };

export function CallError(props: Props) {
  return (
    <Alert className="mt-2" variant="danger">
      <Badge bg="danger">{props.routeCallError.status}</Badge> Error calling the
      route.
      {typeof props.routeCallError.response !== 'undefined' && (
        <div
          className="p-2"
          dangerouslySetInnerHTML={{
            __html: props.routeCallError.response,
          }}
        ></div>
      )}
    </Alert>
  );
}
