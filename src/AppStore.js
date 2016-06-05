import Reflux from 'reflux';
import Actions from './actions';

const AppStore = Reflux.createStore({
  init: function(){
    Reflux.listenTo(Actions.reset, this.onReset);
    this.appState = this.getInitialState();
  },
  onReset: function(){
    this.appState = this.getInitialState();
    this.trigger(this.appState);
  },
  getInitialState: function() {
    let columns = JSON.parse(localStorage.getItem('game')).columns;
    let choices = JSON.parse(localStorage.getItem('game')).choices;
    return {
      game: {
        columns: columns,
        choices: choices
      }
    }
  },
  getAppState: function(){
    return this.appState;
  }
});

module.exports = AppStore;
