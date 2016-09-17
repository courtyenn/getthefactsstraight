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
  onChoiceDropped: function(choiceIndex, index){
    if(this.boardState){
      var choice = this.boardState.choices[choiceIndex];
      this.boardState.columns[index].list.push(choice);
      this.boardState.choices.splice(choiceIndex, 1);
      this.trigger(this.boardState);
    }
  },
  onRemoveChoice: function(index){
    // this.boardState.choices.splice(index, 1);
    // this.trigger(this.boardState);
  }
});

module.exports = BoardStore;
