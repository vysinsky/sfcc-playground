import { Badge } from 'react-bootstrap';

import { cartridgeBadgeStyles } from '../utils';

type Props = {
  cartridge: string;
};

export function CartridgeBadge({ cartridge }: Props) {
  return (
    <Badge bg="custom" style={cartridgeBadgeStyles(cartridge)}>
      {cartridge}
    </Badge>
  );
}
