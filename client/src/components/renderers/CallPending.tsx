import { Alert } from 'react-bootstrap';
import React, { MouseEventHandler } from 'react';

type Props = {
  onClick: MouseEventHandler<HTMLAnchorElement>;
};

export function CallPending({ onClick }: Props) {
  return (
    <Alert variant="info">
      No results for action yet.{' '}
      <a href="#call-route" onClick={onClick}>
        Call route
      </a>{' '}
      to get some.
    </Alert>
  );
}
