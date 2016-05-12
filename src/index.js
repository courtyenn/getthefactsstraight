var React = require('react');
var ReactDOM = require('react-dom');
var App = require('./app');
var CuteData = require('./cuteData');

CuteData.init();
ReactDOM.render(<App />, document.getElementById('app'));
