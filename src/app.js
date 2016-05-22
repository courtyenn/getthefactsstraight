import React, { Component } from 'react';
import { DragDropManager } from 'react-dragndrop';
import Choice from './components/Choice';
import Column from './components/Column';
import ChoiceStyle from './../styles/ChoiceStyle';
import ColumnStyle from './../styles/ColumnStyle';

const dragDropManager = new DragDropManager();

export default class App extends Component {
  componentWillMount(){
    this.columns = JSON.parse(localStorage.getItem('game')).columns;
    this.choices = JSON.parse(localStorage.getItem('game')).choices;
  }

  render(){
    var columns = this.renderColumns();
    var choices = this.renderChoices();
    return (
      <div className="root">
        <div style={ColumnStyle.Test}>
          {choices}
        </div>
        {columns}
      </div>
    )
  }

  renderColumns(){
    var columns = this.columns.map(function(column, index){
      return (
        <Column {...column} manager={dragDropManager} key={index + "-column"} style={ColumnStyle.Base}/>
      );
    });
    return columns;
  }

  renderChoices(){
    var choices = this.choices.map(function(choice, index){
      return (
        <Choice {...choice} manager={dragDropManager} key={index + "-choice"} style={ChoiceStyle.Base}/>
      );
    });
    return choices;
  }
}
