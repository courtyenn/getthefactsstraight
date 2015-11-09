import React, {Component} from 'react';
import ListItemDecorator from './ListItemDecorator'
import Dispatcher from 'flux';

export default class ListItem extends Component {
   // constructor(){
   //    super();
		// I need to find a way to decorate this class so that it is configurable to styling outside
      // this.divStyle = {'listStyleType': 'none', 'padding': '0', 'cursor': 'pointer'};
   // }
   // componentWillMount(){
      // let decorator = new ListItemDecorator();
      // decorator.nonSelectedStyle(this);
   // }
   render(){
      return (
         <li className="ListItem">
            <h2>{this.props.description} </h2>
         </li>
      );
   }
}
