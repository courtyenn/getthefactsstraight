import React, {Component} from 'react';
import AppDispatcher from '../Dispatcher'
import DraggableAction from '../actions/DraggableAction';
import DraggableStore from '../stores/DraggableStore'
var EventEmitter = require('events').EventEmitter;

export default class Draggable extends Component{
   constructor(){
      super();
      this.nonClickedStyle = {'backgroundColor': 'pink'};
		this.finalStyle = this.nonClickedStyle;
		this.da = new DraggableAction();
		this.emitter = new EventEmitter();
   }

	componentWillMount(){
		this.emitter.addListener('Draggable-Is-Clicked', function(data){
			this.finalStyle = data;
		})
	}

	render(){
		return (
			<div onClick={this.handleClick.bind(null, this)} style={this.finalStyle}>
				{this.props.children}
			</div>
		);
	}

	handleClick(context){

		var self = context;
		self.da.loadDrag();
	}

}
