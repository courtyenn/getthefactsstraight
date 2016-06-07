import React, { Component } from 'react';
import Reflux from 'reflux';
import { DragDropManager } from 'react-dragndrop';
import { default as Choice } from './Choice';
import Column from './Column';
import ColumnStyle from './../styles/ColumnStyle';
import Actions from '../actions';
import appStore from '../AppStore';
import boardStore from '../stores/BoardStore';

const dragDropManager = new DragDropManager();

let Board = React.createClass({
  mixins: [Reflux.connect(boardStore, "boardState")],
  componentDidMount: function(){
    this.listenTo(boardStore, this.handleSetBoard);
  },
  handleSetBoard: function(board){
    this.setState(
    {
      boardState: {
        columns: board.columns,
        choices: board.choices
      }
    });
  },
  render: function(){
    var columns = this.renderColumns();
    var choices = this.renderChoices();
    return (
      <div className="root">
        <div style={ColumnStyle.Test}>
          {choices}
          <button onClick={this.handleReset}>Reset</button>
        </div>
        {columns}
      </div>
    )
  },
  renderColumns: function(){
    var that = this;
    var columns = this.state.boardState.columns.map(function(column, index){
 
      let handleDrop = function(drop, drag){
        return that.handleDroppedDraggable(drop, drag, index);
      };
      return (
        <Column {...column}
        manager={dragDropManager}
        handleDrop={handleDrop}
        list={column.list}
        key={index + "-column"} style={ColumnStyle.Base} />
      );
    });
    return columns;
  },
  renderChoices: function(){
    var choices = this.state.boardState.choices.map(function(choice, index){
      return (
        <Choice index={index} {...choice} manager={dragDropManager} key={index + "-choice"} id={index+"-choice"} />
      );
    });
    return choices;
  },
  handleReset: function(){
    Actions.reset();
  },
  handleDroppedDraggable: function(dropTarget, draggable, index){
    Actions.choiceDropped(dropTarget, draggable, index);
  }
});

export default Board;
