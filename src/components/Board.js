import React, { Component } from 'react';
import Reflux from 'reflux';
import { DragDropManager } from 'react-dragndrop';
import Choice from './Choice';
import Column from './Column';
import ColumnStyle from './../styles/ColumnStyle';
import Actions from '../actions';
import appStore from '../AppStore';
import boardStore from '../stores/BoardStore';

const dragDropManager = new DragDropManager();

let Board = React.createClass({
  mixins: [Reflux.connect(boardStore, "boardState")],
  componentDidMount: function(){
    this.listenTo(boardStore, this.handleChoiceDropped);
    // this.setState({
    //   columns: columns,
    //   choices: choices
    // });
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
    var columns = this.state.boardState.columns.map(function(column, index){
      var listItems = column.list.map((item) => {
        return (<li>{item}</li>);
      });
      // var handleDrop = (draggable) => {
      //   return this.handleDroppedDraggable(draggable, index);
      // };
      return (
        <Column {...column} manager={dragDropManager} key={index + "-column"} style={ColumnStyle.Base}>
          {listItems}
        </Column>
      );
    });
    return columns;
  },
  renderChoices: function(){
    var choices = this.state.boardState.choices.map(function(choice, index){
      return (
        <Choice {...choice} manager={dragDropManager} key={index + "-choice"} id={index+"-choice"} />
      );
    });
    return choices;
  },
  handleReset: function(){
    Actions.reset();
  },
  handleDroppedDraggable: function(choice, index){
    Actions.choiceDropped(choice, index);
  }
});

export default Board;
