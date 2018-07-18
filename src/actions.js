import Redux from 'redux';

let Actions = Reflux.createActions([
  "reset",
  "choiceDropped",
  "removeChoice" ,
  "checkChoice",
  "gameOver"
]);

export default Actions;
