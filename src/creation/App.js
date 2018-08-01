import React, { PureComponent } from 'react'
import { Route, Switch } from 'react-router'
import CreateQuiz from './components/CreateQuiz'
import HomePage from './components/HomePage'
import NavBar from './components/NavBar'

export default class App extends PureComponent {
    render() {
        return (
            <div>
                <NavBar />
                <Switch>
                    <Route exact path="/" component={HomePage}/>
                    <Route path="/quiz" component={CreateQuiz}/>
                </Switch>
            </div>
        )
    }
}