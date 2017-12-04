import React, { Component } from 'react';
import { Draggable } from 'react-dragndrop';
import ChoiceStyle from './../styles/ChoiceStyle';
import Actions from '../actions';

export default class Choice extends React.Component {
  constructor(){
    super();
    this.style = ChoiceStyle.Base;
  }
  render(){
    return (
      <Draggable
      id={this.props.id + 'draggable'}
      manager={this.props.manager}
      handleDrop={this.props.handleDrop}
      title={this.props.title}
      baseClassName="draggable"
      draggingClassName=" dragging"
      style={this.style}>
        <h2 style={ChoiceStyle.Base}>{this.props.title}</h2>
      </Draggable>
    );
  }
};
