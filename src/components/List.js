import React, {Component} from 'react';
import Draggable from './Draggable'
import ListItem from './ListItem'

export default class List extends Component{
   constructor(){
      super();
      this.columnStyle = {'padding':'0', 'width':'300px', 'display': 'inline-block', 'float': 'left'};
      this.ulStyle = {'padding': '0'};
      this.listItems = [];
   }
   render(){
      return(
      <div className="Column" style={this.columnStyle}>
         <h2>{this.props.title}</h2>
         <ul style={this.ulStyle}>
            {this.listItems}
         </ul>
      </div>
      );
   }
   componentWillMount(){
      this.createChoices();
   }
   createChoices(){
      let choices = this.props.choices.filter((choice) => {
         return this.props.answers.indexOf(choice.id) > -1;
      });
      choices.forEach((choice, index) => {
			var componentId = this.props.id + "." + index;
         this.listItems.push(<Draggable key={componentId}><ListItem key={componentId + "." + choice.id} {...choice} /></Draggable>);
      }
      );
   }
}
