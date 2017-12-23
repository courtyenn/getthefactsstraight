import React from 'react';
import ReactDom from 'react-dom';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import Nav from './Nav';
import Home from './Home';
import Game from '../game/app';
import Create from '../creation/index'
import ListGames from './ListGames'

class GetTheFactsStraight extends React.Component {

    render () {
        return (
            <Router>
                <div>
                    <Nav/>
                    <Switch>
                        <Route exact path="/" component={Home}/>
                        <Route exact path="/create" component={Create}/>
                        <Route exact path="/all" component={ListGames}/>
                        <Route path="/:id" component={Game}/>
                    </Switch>
                </div>
            </Router>
        )
    }
}

ReactDom.render(<GetTheFactsStraight/>, document.getElementById('app'));
