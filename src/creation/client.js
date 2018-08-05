import React, { PureComponent } from 'react'
import ReactDOM from 'react-dom'
import { Provider, connect } from 'react-redux'
// import { ConnectedRouter } from 'connected-react-router'
import {BrowserRouter} from 'react-router-dom'
import { renderRoutes } from 'react-router-config';
import routes from './routes'
import App from './App'
import AppStore from './AppStore'

class Root extends PureComponent {
    render() {
        return (
            <Provider store={AppStore}>
                <BrowserRouter>
                {renderRoutes(routes)}
                </BrowserRouter>
            </Provider>

        )
    }
}
export default connect(state => {
    history: state.history
})

ReactDOM.hydrate(<Root />, document.getElementById('app'));
