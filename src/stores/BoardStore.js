import Reflux from 'reflux';
import Actions from '../actions';
import AppStore from '../AppStore';

let BoardStore = Reflux.createStore({
  listenables: [Actions],
  init: function(){
    this.listenTo(AppStore, this.setBoard);
  },
  setBoard: function(appState){
    console.log('RESET');
    this.boardState = appState.game;
    this.trigger(this.boardState);
  },
  getInitialState: function(){
    this.boardState = AppStore.getAppState().game;
    // Reflux.listenTo(Actions.choiceDropped, this.onChoiceDropped);
    return this.boardState;
  },
  onGameOver: function() {
    console.log('GAME OVER');
    this.boardState.gameOver = true;
    this.trigger(this.boardState);
  },
  inspectChoice: function(choiceIndex, columnIndex){
    this.boardState.totalAnswered += 1;
    if(this.boardState.choices[choiceIndex].correctId == this.boardState.columns[columnIndex].id){
      this.boardState.totalCorrect += 1;
    }
  },
  onChoiceDropped: function(choiceIndex, index){
    if(this.boardState){
      var choice = this.boardState.choices[choiceIndex];
      this.inspectChoice(choiceIndex, index);
      this.boardState.columns[index].list.push(choice);
      this.boardState.choices.splice(choiceIndex, 1);
      if(this.boardState.choices.length == 0){
        Actions.gameOver();
      }
      this.trigger(this.boardState);
    }
  },
  onRemoveChoice: function(index){
    // this.boardState.choices.splice(index, 1);
    // this.trigger(this.boardState);
  }
});

module.exports = BoardStore;
