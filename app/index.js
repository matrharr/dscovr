import React from 'react';
import ReactDOM from 'react-dom';
import {StyleRoot} from 'radium';


import Dashboard from './components/Dashboard/dashboard';

ReactDOM.render(
  <StyleRoot>
    <Dashboard />
  </StyleRoot>,
  document.getElementById('app')
);
