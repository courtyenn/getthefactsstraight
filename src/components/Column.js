import React, { Component } from 'react';
import ReactDom from 'react-dom';
import { DropTarget } from 'react-dragndrop';
import Actions from '../actions';

let Column = React.createClass({
  render: function(){
    return (
      <DropTarget manager={this.props.manager} style={this.props.style}>
        <h2>{this.props.title}</h2>
        <ul>
          {this.props.children}
        </ul>
      </DropTarget>
    );
  },
  handleDroppedChoice: function(){
    Actions.choiceDropped();
  }
});

export default Column;
