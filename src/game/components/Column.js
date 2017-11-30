import React, { Component } from 'react';
import ReactDom from 'react-dom';
import { DropTarget } from 'react-dragndrop';
import Actions from '../actions';
import ChoiceStyles from '../styles/ChoiceStyle';

export default class Column extends React.Component {
    constructor(){
        super()
        this.test = this.test.bind(this)
    }
    test(drag, drop){
        this.props.handleDrop(drag, drop, this.props.index)
    }
    render () {
        var listItems = this.props.list.map((item, index) => {
            var style = ChoiceStyles.Correct
            if (!item.correct) {
                style = ChoiceStyles.Incorrect
            }
            return (<li key={"column-" + index} style={style}>{item.title}</li>);
        })
        return (
            <DropTarget
                manager={this.props.manager}
                handleDroppedDraggable={this.test}
                style={this.props.style}>
                <h2>{this.props.title}</h2>
                <ul>
                    {listItems}
                </ul>
            </DropTarget>
        );
    }
}
