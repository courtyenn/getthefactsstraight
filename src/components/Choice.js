import React, { Component } from 'react';
import { Draggable } from 'react-dragndrop';
import ChoiceStyle from './../styles/ChoiceStyle';
import Actions from '../actions';

export default class Choice extends React.Component {
  constructor(){
    super();
    this.removeChoice = this.removeChoice.bind(this);
  }
  render(){
    return (
      <Draggable
      id={this.props.id + 'draggable'}
      manager={this.props.manager}
      handleHideDraggable={this.removeChoice}
      style={ChoiceStyle.Base}>
        <h2 style={ChoiceStyle.Base}>{this.props.title}</h2>
      </Draggable>
    );
  }
  removeChoice(){
    Actions.removeChoice(this.props.index);
  }
};
