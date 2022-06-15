import { render, screen } from '@testing-library/react';
import { CartridgeBadge } from './CartridgeBadge';

describe('CartridgeBadge', () => {
  it('renders cartridge badge (testing_cartridge)', () => {
    const { container } = render(
      <CartridgeBadge cartridge="testing_cartridge" />
    );

    expect(container).toMatchInlineSnapshot(`
      <div>
        <span
          class="badge bg-custom"
          style="background-color: rgb(188, 55, 27); color: white; margin-top: 5px; margin-bottom: 5px; font-size: .8rem;"
        >
          testing_cartridge
        </span>
      </div>
    `);
  });

  it('renders cartridge badge (another_testing_cartridge)', () => {
    const { container } = render(
      <CartridgeBadge cartridge="another_testing_cartridge" />
    );

    expect(container).toMatchInlineSnapshot(`
      <div>
        <span
          class="badge bg-custom"
          style="background-color: rgb(64, 243, 106); color: black; margin-top: 5px; margin-bottom: 5px; font-size: .8rem;"
        >
          another_testing_cartridge
        </span>
      </div>
    `);
  });
});
