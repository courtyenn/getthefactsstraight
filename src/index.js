import React from 'react'
import ReactDom from 'react-dom'
import { connect, createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import AppStore from './store'
import App from './app'
import ReduxObservable from 'redux-observable'
import { composeWithDevTools } from 'redux-devtools-extension'
const { createEpicMiddleware } = ReduxObservable;

import rootReducer from './reducers/index'
import epic from './epic'
const epicMiddleware = createEpicMiddleware(epic)
const composedEnhancers = composeWithDevTools(...enhancers)

let appStore = AppStore;
let appState = createStore(rootReducer, applyMiddleware(epicMiddleware), composedEnhancers);

ReactDom.render(<Provider store={appStore}><App /></Provider>, document.getElementById('app'));