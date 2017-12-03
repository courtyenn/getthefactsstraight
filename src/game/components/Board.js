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
        this.hideChoice = this.hideChoice.bind(this)
    }

    // mixins: [Reflux.connect(boardStore, "boardState")],
    onGameOver () {
        console.log('SETTING GAME OVER');
        this.show = true;
    }

    render () {
        let columns = this.renderColumns();
        let choices = this.renderChoices();
        let style = {
            display: 'none'
        };
        if (this.props.gameOver == true) {
            style = {
                display: 'block'
            }
        }
        return (
            <div className="root">
                <div className="title">
                    <h1>{this.props.title}</h1>
                </div>
                <div style={ColumnStyle.Container}>
                    <div style={ColumnStyle.Test}>
                        {choices}
                    </div>
                    {columns}
                    <Message style={style} className="endGame" totalCorrect={this.props.totalCorrect} totalAnswered={this.props.totalAnswered} quizId={this.props._id} />
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

    hideChoice(index){
        Actions.removeChoice(index)
    }

    handleDrop(drop, drag, index){
        this.handleDroppedDraggable(drop, drag, index)
    }

    renderColumns () {
        let columns = this.props.columns.map((column, index) => {
            return (
                <Column {...column}
                        manager={dragDropManager}
                        handleDrop={this.handleDroppedDraggable}
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
                <Choice index={index} {...choice} manager={dragDropManager} handleDrop={() => this.hideChoice(index)} key={index + "-choice"}
                        id={index + "-choice"}/>
            );
        });
        return choices;
    }
}
