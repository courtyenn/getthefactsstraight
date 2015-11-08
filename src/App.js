import React, {Component} from 'react'
import Game from './Game'
import Data from './presidential_candidate_game.json'

class App extends Component {
	constructor(){
		super();
		this.bodyStyle={'fontFamily':'sans-serif'};
	}
	render() {
		return (
			<div style={this.bodyStyle}>
				<Game {...Data} />
			</div>
		);
	}

}

export default App;
