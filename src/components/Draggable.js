import React, {Component} from 'react';

export default class Draggable extends Component{
   // constructor(){
   //    this.state.dragging =  false;
   // }
   constructor(){
      super();
      this.clickedStyle = {
         'backgroundColor': 'gray'
      };
      this.nonClickStyle = {
         'backgroundColor': 'pink'
      };
   }
   handleClick = (e) =>{
      console.log('got here');
      this.finalStyle = this.clickedStyle;
      this.setState({clicked: true});
   }
   render(){
      return (
         <div onClick={this.handleClick} style={this.finalStyle}>
            {this.props.children}
         </div>
      );
   }
}
