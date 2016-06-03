import React from 'react';
import ReactDom from 'react-dom';
import App from './app';
import CuteData from './cuteData';
import AppStore from './AppStore';
import BoardStore from './stores/BoardStore';

CuteData.init();

let appStore = AppStore();


ReactDom.render(<App />, document.getElementById('app'));
