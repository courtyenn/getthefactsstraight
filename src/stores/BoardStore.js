import Reflux from 'reflux';
import Actions from '../actions';
import AppStore from '../AppStore';

var BoardStore = Reflux.createStore({
  getInitialState: function(){
    this.boardState = AppStore.getAppState().game;
    Reflux.listenTo(Actions.choiceDropped, this.onChoiceDropped);
    return this.boardState;
  },
  onGameOver: function() {
    this.trigger("gameOver");
  },
  onChoiceDropped: function(choice, index){
    if(this.boardState){
      this.boardState.column[index].list.push(choice);
    }
  }
});

module.exports = BoardStore;
