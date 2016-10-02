import Reflux from 'reflux';
import Actions from './actions';
import CuteData from './cuteData';

CuteData.init();

function deepFreeze(obj) {

  // Retrieve the property names defined on obj
  var propNames = Object.getOwnPropertyNames(obj);

  // Freeze properties before freezing self
  propNames.forEach(function(name) {
    var prop = obj[name];

    // Freeze prop if it is an object
    if (typeof prop == 'object' && prop !== null)
      deepFreeze(prop);
  });

  // Freeze self (no-op if already frozen)
  return Object.freeze(obj);
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

    // let columns = gameColumns.splice();
    // let choices = gameChoices.splice();
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
