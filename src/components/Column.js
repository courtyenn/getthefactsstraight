import React, { Component } from 'react';
import ReactDom from 'react-dom';
import { DropTarget } from 'react-dragndrop';

export default class Column extends Component {
  render(){
    return (
      <DropTarget manager={this.props.manager} style={this.props.style}>
        <h2>{this.props.title}</h2>
        <ul>
          {this.props.children}
        </ul>
      </DropTarget>
    );
  }
}
