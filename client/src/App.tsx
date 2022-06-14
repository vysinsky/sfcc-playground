import React from 'react';
import Layout from './components/Layout';
import PlaygroundContextProvider from './components/PlaygroundContext';
import { HomePage } from './pages/HomePage';

function App() {
  return (
    <PlaygroundContextProvider>
      <Layout>
        <HomePage />
      </Layout>
    </PlaygroundContextProvider>
  );
}

export default App;
