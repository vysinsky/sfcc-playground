import React, { useMemo } from 'react';
import { Card, Col, ProgressBar, Row } from 'react-bootstrap';

import { RouteCallResults, SelectedRoutes } from '../types';

type Props = {
  routeFilterState: 'all' | 'successful' | 'failed';
  routeCallResults: RouteCallResults;
  selectedRoutes: SelectedRoutes;
  displayAllStatuses: () => void;
  displayOnlySuccessful: () => void;
  displayOnlyFailed: () => void;
};

const stateToVariant = {
  successful: 'success',
  failed: 'danger',
};

function Bar({
  forState,
  max,
  now,
  onClick,
  routeFilterState,
}: {
  forState: 'successful' | 'failed';
  routeFilterState: 'all' | 'successful' | 'failed';
  onClick: () => void;
  max: number;
  now: number;
}) {
  return (
    <ProgressBar
      striped={routeFilterState === forState}
      style={{ cursor: 'pointer' }}
      onClick={onClick}
      variant={stateToVariant[forState]}
      max={max}
      now={now}
    />
  );
}

const stateToClassname = {
  all: 'text-body',
  successful: 'text-success',
  failed: 'text-danger',
};

function getCallsLabelClasses(
  routeFilterState: 'all' | 'successful' | 'failed',
  forState: 'all' | 'successful' | 'failed'
) {
  const classes = [stateToClassname[forState]];

  if (routeFilterState === forState) {
    classes.push('fw-bold');
  }

  return classes.join(' ');
}

export function ExecutionSummaryCard({
  displayAllStatuses,
  displayOnlyFailed,
  displayOnlySuccessful,
  routeCallResults,
  routeFilterState,
  selectedRoutes,
}: Props) {
  const { allCallsCount, successfulCallsCount, failedCallsCount } =
    useMemo(() => {
      const values = Object.values(routeCallResults);

      return {
        allCallsCount: values.length,
        successfulCallsCount: values.filter((r) => !r.hasOwnProperty('isError'))
          .length,
        failedCallsCount: values.filter((r) => r.hasOwnProperty('isError'))
          .length,
      };
    }, [routeCallResults]);

  const selectedRoutesCount = useMemo(
    () => Object.keys(selectedRoutes).length,
    [selectedRoutes]
  );

  return (
    <Card>
      <Card.Header>
        Execution summary (click label or progressbar to filter)
      </Card.Header>
      <Card.Body>
        <Row>
          <Col>
            <a
              className={getCallsLabelClasses(routeFilterState, 'all')}
              href="#all-calls"
              onClick={(e) => {
                e.preventDefault();
                displayAllStatuses();
              }}
            >
              Routes called: {allCallsCount}
            </a>
          </Col>
          <Col>
            <a
              className={getCallsLabelClasses(routeFilterState, 'successful')}
              href="#successful-calls"
              onClick={(e) => {
                e.preventDefault();
                displayOnlySuccessful();
              }}
            >
              Successful calls: {successfulCallsCount}
            </a>
          </Col>
          <Col>
            <a
              className={getCallsLabelClasses(routeFilterState, 'failed')}
              href="#failed-calls"
              onClick={(e) => {
                e.preventDefault();
                displayOnlyFailed();
              }}
            >
              Failed calls: {failedCallsCount}
            </a>
          </Col>
        </Row>
      </Card.Body>
      {allCallsCount > 0 && (
        <Card.Footer>
          <ProgressBar>
            <Bar
              forState="successful"
              routeFilterState={routeFilterState}
              onClick={displayOnlySuccessful}
              max={selectedRoutesCount}
              now={successfulCallsCount}
            />
            <Bar
              forState="failed"
              routeFilterState={routeFilterState}
              onClick={displayOnlySuccessful}
              max={selectedRoutesCount}
              now={failedCallsCount}
            />
          </ProgressBar>
        </Card.Footer>
      )}
    </Card>
  );
}
