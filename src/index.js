import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import FileUploadPage from './FileUploadPage';
import reportWebVitals from './reportWebVitals';
import UploadImage from './uploadImage';

ReactDOM.render(
  <React.StrictMode>
    <App />
    <UploadImage />
    <FileUploadPage/>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
