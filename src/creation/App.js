import React, { PureComponent } from 'react'
import { Route, Switch } from 'react-router-dom'
import CreateQuiz from './components/CreateQuiz'
import HomePage from './components/HomePage'
import NavBar from './components/NavBar'

export default class App extends PureComponent {
    render() {
        return (
            <div>
                <NavBar />
                <Switch>
                    <Route exact path="/quiz" component={CreateQuiz}/>
                    <Route component={HomePage}/>
                </Switch>
            </div>
        )
    }
}