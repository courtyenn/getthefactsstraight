import React, { Component } from 'react';
import { Draggable } from 'react-dragndrop';
import ChoiceStyle from './../styles/ChoiceStyle';

let Choice = React.createClass({

  render(){
    return (
      <Draggable
      id={this.props.id + 'draggable'}
      manager={this.props.manager}
      style={ChoiceStyle.Base}>
        <h2 style={ChoiceStyle.Base}>{this.props.title}</h2>
      </Draggable>
    );
  }
});

export default Choice;
