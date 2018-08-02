import React, { Component } from 'react';
import Reflux from 'reflux';
import { DragDropManager } from 'react-dragndrop';
import { default as Choice } from './Choice';
import Column from './Column';
import Message from './Message';
import ColumnStyle from './../styles/ColumnStyle';
import Actions from '../actions';
import AppStore from '../AppStore';

const dragDropManager = new DragDropManager();

export default class Board extends Reflux.Component {
    constructor () {
        super()
        this.state = {}
        this.store = AppStore
        this.handleDroppedDraggable = this.handleDroppedDraggable.bind(this)
    }

    onGameOver () {
        this.show = true;
    }
    render () {
        let columns = this.renderColumns();
        let choices = this.renderChoices();

        return (
            <div>
                <div className="title secondary">
                    <h1>{this.props.title}</h1>
                </div>
                <div style={ColumnStyle.Container} className="root">
                    <div style={ColumnStyle.Test}>
                        {choices}
                    </div>
                    {columns}
                    <Message gameOver={this.props.gameOver} className="endGame" totalCorrect={this.props.totalCorrect} totalAnswered={this.props.totalAnswered} quizId={this.props._id} />
                </div>
            </div>
        )
    }

    handleDroppedDraggable (dropTarget, draggable, index) {
        var choiceIndex = null;
        this.props.choices.forEach(function (choice, i) {
            if (draggable.props.title == choice.title) {
                choiceIndex = i;
            }
        });
        Actions.choiceDropped(choiceIndex, index);
    }

    // hideChoice(index){
    //     Actions.removeChoice(index)
    // }

    renderColumns () {
        let columns = this.props.columns.map((column, index) => {
            return (
                <Column {...column}
                        manager={dragDropManager}
                        handleDrop={(a, b, c) => this.handleDroppedDraggable(a, b, c)}
                        list={column.list}
                        index={index}
                        key={index + "-column"} style={ColumnStyle.Base}/>
            );
        });
        return columns;
    }

    renderChoices () {
        var choices = this.props.choices.map((choice, index) => {
            return (
                <Choice index={index} {...choice} manager={dragDropManager} key={index + "-choice"}
                        id={index + "-choice"}/>
            );
        });
        return choices;
    }
}
