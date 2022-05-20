import React from 'react';
import { Link } from 'react-router-dom';

import './Header.css';

export function Header() {
  return (
    <div>
      <div className="app-header header-shadow">
        <div className="app-header__title">
          <Link to="/">Salesforce Playground</Link>
        </div>
      </div>
    </div>
  );
}
