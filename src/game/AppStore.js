import Reflux from 'reflux';
import Actions from './actions';
import CuteData from './cuteData';

CuteData.init();

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

    // let columns = gameColumns.splice();
    // let choices = gameChoices.splice();
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
