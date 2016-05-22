import React, { Component } from 'react';
import { Draggable } from 'react-dragndrop';

export default class Choice extends Component {

  render(){
    return (
      <Draggable manager={this.props.manager} style={this.props.style}>
        <h2>{this.props.title}</h2>
      </Draggable>
    );
  }
}
