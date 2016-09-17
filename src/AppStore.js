import Reflux from 'reflux';
import Actions from './actions';

function handleLoad(Action, Subaction){
    console.log("The on" + Action + Subaction + " handler was called");
};

const AppStore = Reflux.createStore({
  listenables: [Actions],
  init: function(){
    // Reflux.listenTo('reset', this.onReset);
    this.appState = this.getInitialState();
  },
  onReset: function(){
    this.appState = this.getInitialState();
    this.trigger(this.appState);
    handleLoad("Reset");
  },
  onGameOver: function(){
    this.appState.gameOver = true;
    // this.trigger(this.appState);
    handleLoad("GameOver");
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
