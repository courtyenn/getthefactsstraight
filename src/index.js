var React = require('react');
var App = require('./app');
var CuteData = require('./cuteData');

CuteData.init();
React.render(<App />, document.getElementById('app'));
