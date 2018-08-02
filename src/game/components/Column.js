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
        let listItems = this.props.list.map((item, index) => {
            let style = ChoiceStyles.Correct
            if (!item.correct) {
                style = ChoiceStyles.Incorrect
            }
            return (<li key={"column-" + index} style={style}>{item.title}</li>);
        })
        return (
            <DropTarget
                manager={this.props.manager}
                className="drop-column"
                handleDroppedDraggable={this.test}
                style={this.props.style}>
                <h2 className="column-h">{this.props.title}</h2>
                <ul>
                    {listItems}
                </ul>
            </DropTarget>
        );
    }
}
