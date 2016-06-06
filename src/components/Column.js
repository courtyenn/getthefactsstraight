import React, { Component } from 'react';
import ReactDom from 'react-dom';
import { DropTarget } from 'react-dragndrop';
import Actions from '../actions';
import ChoiceStyles from '../styles/ChoiceStyle';

let Column = React.createClass({
  render: function(){
    var listItems = this.props.list.map((item, index) => {
      return (<li key={"column-" + index} style={ChoiceStyles.Dropped}>{item}</li>);
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
