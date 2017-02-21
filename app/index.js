var React = require('react');
var ReactDOM = require('react-dom');
import {StyleRoot} from 'radium';


var App = require('./components/Dashboard/dashboard');

ReactDOM.render(
  <StyleRoot>
  <App />
  </StyleRoot>,
  document.getElementById('app')
);