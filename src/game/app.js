import React from 'react'
import Reflux from 'reflux'
import axios from 'axios'
import MediaQuery from 'react-responsive'

import AppStore from './AppStore'
import Actions from './actions'
import Board from './components/Board'
import Mobile from './components/Mobile'
import CuteData from './cuteData'

CuteData.init()

// let appStore = AppStore
// let appState = appStore.getInitialState()

export default class App extends Reflux.Component {

    constructor(){
        super()
        this.state = {}
        this.store = AppStore;
    }
    componentDidMount(){
        if(this.props.match) {
            let quizId = this.props.match.params.id

            axios.get(`/quiz/${quizId}`).then((res) => {
                Actions.setGame({game: res.data.game})
            })
        }
    }

    componentDidUpdate(){
        let quizId = this.props.match.params.id
        if(quizId !== this.state.game._id){
            axios.get(`/quiz/${quizId}`).then((res) => {
                Actions.setGame({game: res.data.game})
            })
        }
    }

    render () {
        if(this.state.game) {
            return (
                <div>
                    <MediaQuery minDeviceWidth={1224} >
                        <Board {...this.state.game} />
                    </MediaQuery>
                    <MediaQuery maxDeviceWidth={1224}>
                        <Mobile {...this.state.game} />
                    </MediaQuery>
                </div>
            )
        }
        else {
            return (
                <div>
                    <Board columns={[]} choices={[]} title={``}/>
                </div>
            )
        }
    }
}
