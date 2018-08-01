import React, {PureComponent} from 'react'
import ReactDom from 'react-dom'
import { Provider } from 'react-redux'

import App from './App'
import AppStore from './AppStore'


export default class Root extends PureComponent {
    render() { return(
        <Provider store={AppStore}>
            <App />
        </Provider>
    )}
}

// ReactDom.render(
    
// )
