import AppDispatcher from '../Dispatcher'
var EventEmitter = require('events').EventEmitter;
export default class DraggableStore {
	constructor(){
		this.emitter = new EventEmitter();
	}
	isBeingClickedOn(){
		console.log('Notified store of clicking');
		var color = {'backgroundColor': 'gray'};
		this.emitter.emit('Draggable-Is-Clicked', color);
	};
};

let ds = new DraggableStore();
AppDispatcher.register(function(action) {
	console.log("DraggableStore is LISTENING");
  switch(action.actionType) {
    case "DRAGON":
	 	console.log("WE SLAY THE DRAGONS!");
		ds.isBeingClickedOn();
      break;
    default:
      // no op
  }
});
