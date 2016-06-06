import Reflux from 'reflux';
import Actions from '../actions';
import AppStore from '../AppStore';

var BoardStore = Reflux.createStore({
  listenables: [Actions],
  init: function(){
    this.listenTo(AppStore, this.setBoard);
  },
  setBoard: function(appState){
    this.boardState = appState.game;
    this.trigger(this.boardState);
  },
  getInitialState: function(){
    this.boardState = AppStore.getAppState().game;
    // Reflux.listenTo(Actions.choiceDropped, this.onChoiceDropped);
    return this.boardState;
  },
  onGameOver: function() {
    this.trigger("gameOver");
  },
  onChoiceDropped: function(drop, drag, index){
    if(this.boardState){
      this.boardState.columns[index].list.push(drag.props.children);
      // this.boardState.choices[]
      this.trigger(this.boardState);
    }
  }
});

module.exports = BoardStore;
