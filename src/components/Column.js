import React, { Component } from 'react';
import ReactDom from 'react-dom';
import { DropTarget } from 'react-dragndrop';

export default class Column extends Component {
  getDefaultProps(){
    return {
      title: "Default Column Name",
      correctId: "any"
    }
  }
  render(){
    return (
      <div>
        <DropTarget>
          <h2>{this.props.title}</h2>
          <ul>
            {this.props.children}
          </ul>
        </DropTarget>
      </div>
    );
  }
}
