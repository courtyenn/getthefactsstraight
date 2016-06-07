import Reflux from 'reflux';
import Actions from '../actions';
import AppStore from '../AppStore';

let BoardStore = Reflux.createStore({
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
      
      this.trigger(this.boardState);
    }
  },
  onRemoveChoice: function(index){
    this.boardState.choices.splice(index, 1);
    this.trigger(this.boardState);
  }
});

module.exports = BoardStore;
