import React from 'react';
import { Link } from 'react-router-dom'
import Home from './Home'
import Game from '../game/'

export default () => (
    <div>
        <nav>
            <div className="logo">
                <Link to="/">Get the Facts Straight</Link>
            </div>
            <div className="menu">
                <ul>
                    <li><Link to="/create">Create your own quiz</Link></li>
                    <li><Link to="/quizzes">View others</Link></li>
                </ul>
            </div>
        </nav>
    </div>
)
