import AppDispatcher from '../Dispatcher';

export default class DraggableAction{
	constructor(){
		this.ad = AppDispatcher;
	}
	loadDrag(){
		let data = {
			'dragging': true,
			'style': {'backgroundColor': 'gray'}
		};
		console.log("amazing!");
		console.log(data);
		this.ad.dispatch(
		{
	      actionType: 'DRAGON',
	      data: data
		});
	}
}
