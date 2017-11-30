import React from 'react';
import { Link } from 'react-router-dom'

export default () => (
    <div>
        <nav>
            <div className="logo">
                <Link to="/">Get the Facts Straight</Link>
            </div>
            <div className="menu">
                <ul>
                    <li><Link to="/create">Create your own quiz</Link></li>
                    <li><Link to="/all">View others</Link></li>
                </ul>
            </div>
        </nav>
    </div>
)
