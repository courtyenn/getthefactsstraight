import Reflux from 'reflux';
import Actions from './actions';

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
    let columns = JSON.parse(localStorage.getItem('game')).columns;
    let choices = JSON.parse(localStorage.getItem('game')).choices;
    return {
      game: {
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
