import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Orders from './Orders';
import UploadImage from './uploadImage';

ReactDOM.render(
  <React.StrictMode>
    <App />
    <UploadImage />
    <Orders/>
  </React.StrictMode>,
  document.getElementById('root')
);

