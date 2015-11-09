import React, {Component} from 'react';
import List from './components/List'

export default class Game extends Component{
   constructor(){
      super();
      this.columns = [];
		this.bodyStyle={'fontFamily':'sans-serif'}
   }
   render(){
      return(
         <div className="Game" style={this.bodyStyle}>
            <h1>{this.props.title}</h1>
            {this.renderColumns()}
         </div>
      );
   }
   renderColumns(){
      this.props.columns.forEach((column, index) =>{
         this.columns.push(<List key={this.props.key +"."+ index} id={this.props.key +"."+ index} choices={this.props.choices} {...column} />);
      });
      return this.columns;
   }
}
