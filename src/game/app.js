import React from 'react'
import Reflux from 'reflux'
import axios from 'axios'

import AppStore from './AppStore'
import Actions from './actions'
import Board from './components/Board'
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
                // appStore.onSetGame({game: res.data.game})
            })
        }
    }

    render () {
        console.log(this.props);
        if(this.state.game) {
            return (
                <Board {...this.state.game} />
            )
        }
        else {
            return (<div>Loading...</div>)
        }
    }
}
