import React from 'react';
import Layout from './components/Layout';
import PlaygroundContextProvider from './components/PlaygroundContext';
import { Route, Routes } from 'react-router-dom';
import { HomePage } from './pages/HomePage';

function App() {
  return (
    <PlaygroundContextProvider>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
        </Routes>
      </Layout>
    </PlaygroundContextProvider>
  );
}

export default App;
