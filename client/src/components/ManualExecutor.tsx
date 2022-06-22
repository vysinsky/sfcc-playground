import React, { FormEvent, useEffect, useState } from 'react';
import {
  Button,
  Card,
  Col,
  Container,
  FloatingLabel,
  Form,
  Row,
  Tab,
  Tabs,
} from 'react-bootstrap';
// import { Typeahead } from 'react-bootstrap-typeahead';

import { usePlaygroundContext } from './PlaygroundContext';
import { getMethodBadgeBg } from '../utils';
import RouteCallResultRenderer from './RouteCallResultRenderer';
import { ManualCallInput } from '../types';

export function ManualExecutor() {
  const { routes, manualExecutor } = usePlaygroundContext();

  const [inputValues, setInputValues] = useState<ManualCallInput>({
    method: 'GET',
    url: '',
    body: '',
    query: '',
    header: '',
  });
  // const [manualUrlInputValue, setManualUrlInputValue] = useState('');
  const [methodMismatch, setMethodMismatch] = useState(false);

  const updateInputValues = (key: keyof ManualCallInput, value: any) => {
    setInputValues((prevValues) => ({
      ...prevValues,
      [key]: value,
    }));
  };

  const sendManualCall = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    manualExecutor.execute({
      url: inputValues.url, // ? inputValues.url[0] : manualUrlInputValue,
      method: inputValues.method,
      body: inputValues.body,
      query: inputValues.query,
      header: inputValues.header,
    });
  };

  /*const typeheadOptions = useMemo(() => {
    const options: string[] = [];

    routes.forEach(({ name, actions }) => {
      actions.forEach((action) => {
        options.push(`${name}-${action}`);
      });
    });

    return options.sort();
  }, [routes]);*/

  useEffect(() => {
    const inputUrl = new URL(`https://example.com/${inputValues.url}`);
    const [controllerName, action] = inputUrl.pathname.substring(1).split('-');
    const route = routes.find(
      ({ name, actions }) => name === controllerName && actions.includes(action)
    );

    if (route) {
      setMethodMismatch(route.metadata[action].method !== inputValues.method);
    }
  }, [setMethodMismatch, inputValues.method, inputValues.url, routes]);

  const methodSelectColor = `var(--bs-${getMethodBadgeBg(inputValues.method)})`;

  return (
    <Container>
      <Card className="mb-2">
        <Card.Header>
          <strong>Make a manual call</strong>
        </Card.Header>
        <Card.Body>
          <Form onSubmit={sendManualCall}>
            <Row>
              <Col style={{ maxWidth: 150 }}>
                <FloatingLabel label="Method" controlId="manual-call-method">
                  <Form.Select
                    className="fw-bold c-red adjust-box-shadow-color"
                    style={{
                      color: methodSelectColor,
                      borderColor: methodSelectColor,
                    }}
                    value={inputValues.method}
                    onChange={(e) =>
                      updateInputValues('method', e.target.value)
                    }
                    aria-label="Manual call method"
                  >
                    <option value="GET">GET</option>
                    <option value="POST">POST</option>
                  </Form.Select>
                </FloatingLabel>
              </Col>
              <Col>
                <FloatingLabel label="URL" controlId="manual-call-url">
                  <Form.Control
                    placeholder="URL"
                    value={inputValues.url}
                    onChange={(e) => updateInputValues('url', e.target.value)}
                  />
                </FloatingLabel>
                {/*
                TODO: Resolve how to properly support Typeahead
                <Typeahead
                  id="manual-call-url-typeahead"
                  selected={inputValues.url}
                  onChange={(v) => updateInputValues('url', v)}
                  options={typeheadOptions}
                  placeholder="URL"
                  onInputChange={(value) => {
                    setManualUrlInputValue(value);
                  }}
                  renderInput={({
                    inputRef,
                    referenceElementRef,
                    ...inputProps
                  }) => {
                    return (
                      <FloatingLabel label="URL" controlId="manual-call-url">
                         @ts-expect-error Incompatibility with Bootstrap?
                        <Form.Control
                          {...inputProps}
                          ref={(node) => {
                            inputRef(node);
                            referenceElementRef(node);
                          }}
                        />
                      </FloatingLabel>
                    );
                  }}
                />*/}
              </Col>
              <Col style={{ maxWidth: 180 }}>
                <Button
                  disabled={
                    manualExecutor.lastCallResult === 'loading' ||
                    !inputValues.url
                  }
                  className="w-100 h-100"
                  size="lg"
                  variant="primary"
                  type="submit"
                >
                  {manualExecutor.lastCallResult === 'loading'
                    ? 'Sending...'
                    : 'Send'}
                </Button>
              </Col>
            </Row>
            <Row className="mb-2">
              <Col>
                <Form.Text className="text-warning">
                  {methodMismatch ? (
                    <span>
                      The selected method does not match route. You can still
                      execute the route but expect an error.
                    </span>
                  ) : (
                    <span>&nbsp;</span>
                  )}
                </Form.Text>
              </Col>
            </Row>
            <Row>
              <Col>
                <Tabs defaultActiveKey="query" className="mb-4">
                  <Tab title="Query" eventKey="query">
                    <Tab.Content>
                      <FloatingLabel
                        label="Query (JSON string)"
                        controlId="manual-call-body"
                      >
                        <Form.Control
                          as="textarea"
                          placeholder="Query (JSON string)"
                          value={inputValues.query}
                          onChange={(e) =>
                            updateInputValues('query', e.target.value)
                          }
                        ></Form.Control>
                      </FloatingLabel>
                    </Tab.Content>
                  </Tab>
                  <Tab
                    title="Body"
                    eventKey="body"
                    disabled={inputValues.method === 'GET'}
                  >
                    <FloatingLabel
                      label="Request body"
                      controlId="manual-call-body"
                    >
                      <Form.Control
                        as="textarea"
                        placeholder="Request body"
                        value={inputValues.body}
                        onChange={(e) =>
                          updateInputValues('body', e.target.value)
                        }
                      ></Form.Control>
                    </FloatingLabel>
                  </Tab>
                  <Tab title="Header" eventKey="header">
                    <Tab.Content>
                      <FloatingLabel
                        label="Request headers"
                        controlId="manual-call-headers"
                      >
                        <Form.Control
                          as="textarea"
                          placeholder="Request headers (JSON string)"
                          value={inputValues.header}
                          onChange={(e) =>
                            updateInputValues('header', e.target.value)
                          }
                        ></Form.Control>
                      </FloatingLabel>
                    </Tab.Content>
                  </Tab>
                </Tabs>
              </Col>
            </Row>
          </Form>
        </Card.Body>
      </Card>
      {typeof manualExecutor.lastCallResult !== 'undefined' &&
        manualExecutor.lastCallResult !== 'loading' && (
          <Card className="mb-5">
            <Card.Header className="d-flex align-items-center justify-content-between">
              <strong>Latest manual call result</strong>
              <Button
                variant="outline-secondary"
                onClick={manualExecutor.clearLastCallResult}
              >
                Clear result
              </Button>
            </Card.Header>
            <Card.Body>
              <RouteCallResultRenderer
                result={manualExecutor.lastCallResult}
                displayRequestInfo
              />
            </Card.Body>
          </Card>
        )}
      {manualExecutor.history.length > 0 && (
        <Card>
          <Card.Header className="d-flex align-items-center justify-content-between">
            <strong>Manual calls history</strong>
            <Button
              variant="outline-secondary"
              onClick={manualExecutor.clearHistory}
            >
              Clear history
            </Button>
          </Card.Header>
          <Card.Body>
            {manualExecutor.history.map((historyRecord, i) => (
              <div key={i}>
                <RouteCallResultRenderer
                  result={historyRecord}
                  displayRequestInfo
                />
                <hr className="my-4" />
              </div>
            ))}
          </Card.Body>
        </Card>
      )}
    </Container>
  );
}
