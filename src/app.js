import { React, Component } from 'react';
import ReactDom from 'react-dom';
import Board from './components/Board';
import { dispatch } from 'redux'
import { connect } from 'react-redux'
import { connection } from 'mongoose';

class App extends Component {
  componentDidMount = () => {

  }

  endSession = () => {

  }

  render = () => {
    return (
      <div>
        <h1>Hello Session</h1>
        <h2>Session Start: {this.state.sessionStart}}</h2>
        <h2>Session End: {this.state.sessionEnd}}</h2>
        {this.state.resetting ? <h3>Restarting Session...</h3> : 
        <button onClick={endSession}>End Session</button>}
        
      </div>
    )
  }
}

export default connect(state => ({
  sessionStart: state.sessionStart
}))(App);
