import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
// import App2 from './App2';
import 'bootstrap/dist/css/bootstrap.min.css';

ReactDOM.render(
  <React.StrictMode>
    <App index="10" column="20" />
    {/* <App2 index="10" column="20" /> */}
  </React.StrictMode>,
  document.getElementById('root')
);
