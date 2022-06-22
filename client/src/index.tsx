import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
//import 'react-bootstrap-typeahead/css/Typeahead.min.css';
//import 'react-bootstrap-typeahead/css/Typeahead.bs5.min.css';

import App from './App';
import './index.css';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
