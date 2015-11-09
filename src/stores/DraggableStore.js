import AppDispatcher from '../Dispatcher'
var EventEmitter = require('events').EventEmitter;
export default class DraggableStore {
	constructor(){
		this.emitter = new EventEmitter();
	}
	isBeingClickedOn(state){
		console.log('Notified store of clicking');
		var color = {'backgroundColor': 'gray'};
		this.emitter.emit('Draggable-Is-Clicked', state);
	};
};

let ds = new DraggableStore();
AppDispatcher.register(function(action, state) {
	console.log("DraggableStore is LISTENING");
  switch(action.actionType) {
    case "DRAGON":
	 	console.log("WE SLAY THE DRAGONS!");
		ds.isBeingClickedOn(state);
      break;
    default:
      // no op
  }
});
