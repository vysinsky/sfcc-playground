import React, { useContext } from 'react';
import { Link } from 'react-router-dom';

import './Header.css';
import { Form } from 'react-bootstrap';
import { PlaygroundContext } from './PlaygroundContext';

export function Header() {
  const { simulateHttps, enableHttpsSimulation, disableHttpsSimulation } =
    useContext(PlaygroundContext);

  return (
    <div>
      <div className="app-header header-shadow">
        <div className="app-header__title">
          <Link to="/">Salesforce Playground</Link>
        </div>
        <Form>
          <Form.Check
            type="switch"
            id="http-simulation-toggle"
            checked={simulateHttps}
            onChange={() => {
              simulateHttps
                ? disableHttpsSimulation()
                : enableHttpsSimulation();
            }}
            label="Simulate HTTPS"
          />
        </Form>
      </div>
    </div>
  );
}
