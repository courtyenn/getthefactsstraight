import Reflux from 'reflux'
import axios from 'axios'
import Actions from './actions'
import CuteData from './cuteData'
import { List, Map } from 'immutable'

CuteData.init();

function shuffle (array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}


export default class AppStore extends Reflux.Store {

    constructor () {
        super()
        this.state = {};
        this.listenables = Actions
        this.originalGame;
        this.defaultChoices = [];
    }

    getInitialState () {
        let columns, choices, title, _id

        if (this.originalGame) {
            columns = this.originalGame.columns.toJS()
            choices = this.originalGame.choices.toJS()
            title = this.originalGame.title
            _id = this.originalGame._id
        }
        else if (window.game) {
            columns = JSON.parse(JSON.stringify(window.game.columns))
            choices = JSON.parse(JSON.stringify(window.game.choices))
            title = window.game.title
            _id = window.game._id
        }
        else {
            columns = JSON.parse(localStorage.getItem('game')).columns
            choices = JSON.parse(localStorage.getItem('game')).choices
            title = JSON.parse(localStorage.getItem('game')).title
            _id = JSON.parse(localStorage.getItem('game'))._id
        }

        return {
            game: {
                _id: _id,
                title: title,
                columns: columns,
                choices: choices,
                totalCorrect: 0,
                totalAnswered: 0,
                gameOver: false
            }
        }
    }

    wipeGame(){
        this.state.game = null
    }

    onReset () {
        this.state.game = this.getInitialState().game;
        this.trigger(this.state);
    }

    getState () {
        return this.state;
    }
    setGame (gameState) {
        this.originalGame = Map(gameState.game)
        this.originalGame.title = gameState.game.title
        this.originalGame._id = gameState.game._id
        let newColumns = gameState.game.columns.map(column => {
            column.list = List([])
            return Map(column)
        })
        const clonedChoices = shuffle(gameState.game.choices).map( choice => {
            return Map(choice)
        })

        gameState.game.columns.forEach(column => column.list = [])
        this.originalGame.choices = List(clonedChoices)
        this.originalGame.columns = List(newColumns)

        this.state = {
            game: {
                _id: gameState.game._id,
                title: gameState.game.title,
                columns: gameState.game.columns,
                choices: shuffle(gameState.game.choices),
                totalCorrect: 0,
                totalAnswered: 0,
                gameOver: false
            }
        }
        this.trigger(this.state)
    }

    gameOver () {
        console.log('GAME OVER')
        this.state.game.gameOver = true
    }

    inspectChoice (choiceId, columnId) {
        return new Promise((resolve, reject) => {
            axios.post('/answer', {
                columnId: columnId,
                answerId: choiceId
            }).then(data => {
                resolve(data.data);
            });
        });
    }

    async selectChoice (columnId, index) {
        let correct = await this.inspectChoice(this.state.game.choices[index]._id, columnId)
        if(correct) {
            this.state.game.totalCorrect += 1
        }
        this.state.game.totalAnswered += 1

        if(this.state.game.choices.length -1 === index){
            Actions.gameOver()
        }
        this.trigger(this.state)
    }

    async choiceDropped (choiceIndex, index) {
        if (this.state) {
            let choice = this.state.game.choices[choiceIndex]
            let column = this.state.game.columns[index]
            this.state.game.choices.splice(choiceIndex, 1)
            this.trigger(this.state)
            let correct = await this.inspectChoice(choice.id, column.id)
            choice.correct = correct
            if(correct) {
                this.state.game.totalCorrect += 1
            }
            this.state.game.totalAnswered += 1
            this.state.game.columns[index].list.push(choice)
            if (this.state.game.choices.length == 0) {
                Actions.gameOver()
            }
            this.trigger(this.state)
        }
    }

    // removeChoice(choiceIndex){
    //     this.state.game.choices.splice(choiceIndex, 1)
    //     this.trigger(this.state)
    // }
}

