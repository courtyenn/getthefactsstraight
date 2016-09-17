import React, { Component } from 'react';
import ReactDom from 'react-dom';
import { DropTarget } from 'react-dragndrop';
import Actions from '../actions';
import ChoiceStyles from '../styles/ChoiceStyle';

let Column = React.createClass({
  render: function(){
    var listItems = this.props.list.map((item, index) => {
      var style = ChoiceStyles.Correct;
      if(item.correctId !== this.props.id){
        style = ChoiceStyles.Incorrect;
      }
      return (<li key={"column-" + index} style={style}>{item.title}</li>);
    });
    return (
      <DropTarget
      manager={this.props.manager}
      handleDroppedDraggable={this.props.handleDrop}
      style={this.props.style}>
        <h2>{this.props.title}</h2>
        <ul>
          {listItems}
        </ul>
      </DropTarget>
    );
  }
});

export default Column;
