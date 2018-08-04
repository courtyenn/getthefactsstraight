import React, { PureComponent } from 'react'
import ReactDom from 'react-dom'
import { Provider } from 'react-redux'

import App from './App'
import AppStore from './AppStore'


export default class Root extends PureComponent {
    render() {
        return (
            <html>
                <head>
                <meta charSet="utf-8" />
    <title>Get The Facts Straight!</title>
    <link rel="stylesheet" href="/public/style.css" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0,
  maximum-scale=1.0, user-scalable=no" />
                </head>
                <body>
                    <Provider store={AppStore}>
                        <App />
                    </Provider>
                </body>
            </html>
        )
    }
}

// ReactDom.render(

// )
