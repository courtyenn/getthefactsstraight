import React, {Component} from 'react';
import ListItemDecorator from './ListItemDecorator'
import Dispatcher from 'flux';

export default class ListItem extends Component {
   constructor(){
      super();
      this.divStyle = {'listStyleType': 'none', 'padding': '0', 'cursor': 'pointer'};
   }
   componentWillMount(){
      let decorator = new ListItemDecorator();
      decorator.nonSelectedStyle(this);
   }
   render(){
      return (
         <li className="ListItem" style={this.divStyle}>
            <h2>{this.props.description} </h2>
         </li>
      );
   }
}
