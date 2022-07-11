import React from 'react';
import ReactDOM from "react-dom";
import Main from './src/Main';

// require('./bootstrap');

if (document.getElementById('app')) {
  ReactDOM.render(<Main />, document.getElementById('app'));
}
