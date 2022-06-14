import React, { useContext } from 'react';

import './Header.css';
import { Col, Form, Row } from 'react-bootstrap';
import { PlaygroundContext } from './PlaygroundContext';

export function Header() {
  const {
    simulateHttps,
    enableHttpsSimulation,
    disableHttpsSimulation,
    locale,
    setLocale,
  } = useContext(PlaygroundContext);

  return (
    <div>
      <div className="app-header header-shadow">
        <div className="app-header__title">
          <a href="/">Salesforce Playground</a>
        </div>
        <Form>
          <div className="d-flex align-items-center">
            <Form.Check
              style={{ minWidth: 200 }}
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
            <Form.Group controlId="localeInput" as={Row}>
              <Form.Label column sm={5}>
                Simulated locale
              </Form.Label>
              <Col>
                <Form.Control
                  size="sm"
                  type="text"
                  value={locale}
                  onChange={(e) => setLocale(e.target.value)}
                  placeholder="Simulated locale"
                />
              </Col>
            </Form.Group>
          </div>
        </Form>
      </div>
    </div>
  );
}
