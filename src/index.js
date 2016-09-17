import React from 'react';
import ReactDom from 'react-dom';
import CuteData from './cuteData';
import AppStore from './AppStore';
import BoardStore from './stores/BoardStore';
import App from './app';

CuteData.init();

let appStore = AppStore;
let appState = appStore.getInitialState();

ReactDom.render(<App {...appState} />, document.getElementById('app'));
