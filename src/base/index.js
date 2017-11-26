import React from 'react';
import ReactDom from 'react-dom';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import Nav from './Nav';
import Home from './Home';
import Game from '../game/app';
import Create from '../creation/index';

let getTheFactsStraight = () => (
    <div>
        <Router>
            <div>
                <Nav />
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route exact path="/create" component={Create} />
                    <Route exact path="/:id" component={Game} />
                </Switch>
            </div>
        </Router>
    </div>
)

ReactDom.render(getTheFactsStraight(), document.getElementById('app'));
