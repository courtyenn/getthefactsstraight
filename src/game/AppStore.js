import Reflux from 'reflux';
import Actions from './actions';
import CuteData from './cuteData';

CuteData.init();

function shuffle(array) {
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

const AppStore = Reflux.createStore({
  listenables: [Actions],
  init: function(){
    this.appState = this.getInitialState();
  },
  onReset: function(){
    this.appState = this.getInitialState();
    this.trigger(this.appState);
  },
  onGameOver: function(){
    this.appState.gameOver = true;
  },
  getInitialState: function() {
    let columns = window.game ? JSON.parse(JSON.stringify(window.game.columns)) : JSON.parse(localStorage.getItem('game')).columns;
    let choices = window.game ? JSON.parse(JSON.stringify(window.game.choices)) : JSON.parse(localStorage.getItem('game')).choices;
    let title = window.game ? window.game.title : JSON.parse(localStorage.getItem('game')).title;
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
  },
  getAppState: function(){
    return this.appState;
  }
});

module.exports = AppStore;
