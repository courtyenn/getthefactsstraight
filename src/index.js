import React from 'react';
import ReactDom from 'react-dom';
import App from './app';
import CuteData from './cuteData';

CuteData.init();
ReactDom.render(<App />, document.getElementById('app'));
