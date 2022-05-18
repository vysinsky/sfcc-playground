import React from 'react';
import { Spinner } from 'react-bootstrap';

function Loader() {
  return (
    <div className="d-flex align-items-center justify-content-center vh-100">
      <Spinner
        animation="grow"
        role="status"
        style={{ height: '10rem', width: '10rem' }}
      >
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    </div>
  );
}

export default Loader;
