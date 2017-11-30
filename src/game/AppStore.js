import Reflux from 'reflux'
import axios from 'axios'
import Actions from './actions'
import CuteData from './cuteData'

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

let originalGame;

export default class AppStore extends Reflux.Store {

    constructor () {
        super()
        this.state = {};
        this.listenables = Actions
    }

    getInitialState () {
        let columns
        let choices
        let title

        if (originalGame) {
            columns = originalGame.columns
            choices = originalGame.choices
            title = originalGame.title
        }
        else if (window.game) {
            columns = JSON.parse(JSON.stringify(window.game.columns))
            choices = JSON.parse(JSON.stringify(window.game.choices))
            title = window.game.title
        }
        else {
            columns = JSON.parse(localStorage.getItem('game')).columns
            choices = JSON.parse(localStorage.getItem('game')).choices
            title = JSON.parse(localStorage.getItem('game')).title
        }


        columns.forEach(column => column.list = []);
        choices = shuffle(choices);
        return {
            game: {
                title: title,
                columns: columns,
                choices: choices,
                totalCorrect: 0,
                totalAnswered: 0,
                gameOver: false
            }
        }
    }

    onReset () {
        this.state.game = this.getInitialState().game;
        this.trigger(this.state);
    }

    getState () {
        return this.state;
    }
    setGame (gameState) {
        originalGame = Object.assign({}, gameState.game)
        gameState.game.columns.forEach(column => {
            column.list = []
        })
        this.state = this.getInitialState()
        this.trigger(this.state);
    }

    gameOver () {
        console.log('GAME OVER');
        this.state.game.gameOver = true;
        // this.trigger(this.boardState);
    }

    inspectChoice (choiceIndex, columnIndex) {
        return new Promise((resolve, reject) => {
            this.state.game.totalAnswered += 1;
            axios.post('/answer', {
                columnId: this.state.game.columns[columnIndex].id,
                answerId: this.state.game.choices[choiceIndex].id
            }).then(data => {
                resolve(data.data);
            });
        });
    }

    async choiceDropped (choiceIndex, index) {
        if (this.state) {
            var choice = this.state.game.choices[choiceIndex];
            let correct = await this.inspectChoice(choiceIndex, index);
            choice.correct = correct;
            this.state.game.totalCorrect += 1;
            this.state.game.columns[index].list.push(choice);
            this.state.game.choices.splice(choiceIndex, 1);
            if (this.state.game.choices.length == 0) {
                Actions.gameOver();
            }
            this.trigger(this.state);
        }
    }
}

