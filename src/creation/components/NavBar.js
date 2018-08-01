import React, { PureComponent } from 'react'
import { Link } from 'react-router-dom'

export default class NavBar extends PureComponent {
    render() {
        return (
            <nav>
                <div className="logo">
                    <Link to="/">Get the Facts Straight</Link>
                </div>
                <div className="menu">
                    <ul>
                        <li><Link to="/quiz">Create your own quiz</Link></li>
                        <li><Link to="/quizzes">View others</Link></li>
                    </ul>
                </div>
            </nav>
        )
    }
}
