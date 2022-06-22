import React from 'react';
import { Badge } from 'react-bootstrap';

import { getMethodBadgeBg } from '../utils';

type Props = {
  method: 'GET' | 'POST';
};

export function MethodBadge({ method }: Props) {
  return (
    <Badge
      bg="custom"
      style={{ backgroundColor: `var(--bs-${getMethodBadgeBg(method)})` }}
    >
      {method}
    </Badge>
  );
}
