import React from 'react';
import { Badge } from 'react-bootstrap';

type Props = {
  method: 'GET' | 'POST';
};

function getBadgeBg(method: 'GET' | 'POST') {
  switch (method) {
    case 'GET':
      return 'primary';
    case 'POST':
      return 'info';
  }
}

export function MethodBadge({ method }: Props) {
  return <Badge bg={getBadgeBg(method)}>{method}</Badge>;
}
