import React, { Component } from 'react';
import { DragDropManager } from 'react-dragndrop';
import Choice from './Choice';
import Column from './Column';
import ChoiceStyle from './../styles/ChoiceStyle';
import ColumnStyle from './../styles/ColumnStyle';
import Actions from '../actions';

const dragDropManager = new DragDropManager();

const Board = React.createClass({
  render(){
    var columns = this.renderColumns();
    var choices = this.renderChoices();
    return (
      <div>
        <div style={ColumnStyle.Test}>
          {choices}
          <button onClick={this.handleReset}>Reset</button>
        </div>
        {columns}
      </div>
    )
  },
  renderColumns(){
    var columns = this.props.columns.map(function(column, index){
      return (
        <Column {...column} manager={dragDropManager} key={index + "-column"} style={ColumnStyle.Base}/>
      );
    });
    return columns;
  },
  renderChoices(){
    var choices = this.props.choices.map(function(choice, index){
      return (
        <Choice {...choice} manager={dragDropManager} key={index + "-choice"} style={ChoiceStyle.Base}/>
      );
    });
    return choices;
  },
  handleReset(){
    actions.reset();
  }
});

module.exports = Board;
