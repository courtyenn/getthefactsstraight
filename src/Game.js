import React, {Component} from 'react';
import List from './components/List'

export default class Game extends Component{
   constructor(){
      super();
      this.columns = [];
   }
   render(){
      return(
         <div className="Game">
            <h1>{this.props.title}</h1>
            {this.createColumns()}
         </div>
      );
   }
   componentWillMount(){

   }
   createColumns(){
      this.props.columns.forEach((column, index) =>{
         this.columns.push(<List key={index} {...column} choices={this.props.choices} />);
      });
      return this.columns;
   }
}
