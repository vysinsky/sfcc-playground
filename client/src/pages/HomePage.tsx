import React from 'react';
import { Tab, Tabs } from 'react-bootstrap';

import { BatchExecutor } from '../components/BatchExecutor';
import { ManualExecutor } from '../components/ManualExecutor';

export function HomePage() {
  return (
    <Tabs defaultActiveKey="manual" className="mb-4">
      <Tab title="Execute single manual call" eventKey="manual">
        <ManualExecutor />
      </Tab>
      <Tab title="Execute multiple calls" eventKey="batch">
        <BatchExecutor />
      </Tab>
    </Tabs>
  );
}
