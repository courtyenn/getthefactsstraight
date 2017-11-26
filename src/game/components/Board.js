import React, { Component } from 'react';
import Reflux from 'reflux';
import { DragDropManager } from 'react-dragndrop';
import { default as Choice } from './Choice';
import Column from './Column';
import ColumnStyle from './../styles/ColumnStyle';
import Actions from '../actions';
import appStore from '../AppStore';
import boardStore from '../stores/BoardStore';

const dragDropManager = new DragDropManager();

let Board = React.createClass({
  mixins: [Reflux.connect(boardStore, "boardState")],
  onGameOver: function(){
    console.log('SETTING GAME OVER');
    this.show = true;
  },
  render: function(){
    let columns = this.renderColumns();
    let choices = this.renderChoices();
    let message = this.getMessage();
    let style = {
      display: 'none'
    };
    if(this.state.boardState.gameOver == true){
      style = {
        display: 'block'
      }
    }
    return (
        <div className="root">
            <div className="title">
                <h1>{this.state.boardState.title}</h1>
            </div>
            <div style={ColumnStyle.Container}>
                <div style={ColumnStyle.Test}>
                    {choices}
                </div>
                {columns}
                <div style={style} className="endGame">
                    <h2>Score: {this.state.boardState.totalCorrect}/{this.state.boardState.totalAnswered}</h2>
                    {message}
                    <button onClick={this.handleReset}>Restart</button>
                </div>
            </div>
        </div>
    )
  },
    renderColumns: function(){
        let that = this;
        let columns = this.state.boardState.columns.map(function(column, index){
            let handleDrop = function(drop, drag){
            return that.handleDroppedDraggable(drop, drag, index);
        };
        return (
            <Column {...column}
            manager={dragDropManager}
            handleDrop={handleDrop}
            list={column.list}
            key={index + "-column"} style={ColumnStyle.Base} />
        );
    });
    return columns;
  },
  renderChoices: function(){
    var choices = this.state.boardState.choices.map(function(choice, index){
      return (
        <Choice index={index} {...choice} manager={dragDropManager} key={index + "-choice"} id={index+"-choice"} />
      );
    });
    return choices;
  },
  handleReset: function(){
    Actions.reset();
  },
  handleDroppedDraggable: function(dropTarget, draggable, index){
    var choiceIndex = null;
    this.state.boardState.choices.forEach(function(choice, i){
      if(draggable.props.title == choice.title){
        choiceIndex = i;
      }
    });
    Actions.choiceDropped(choiceIndex, index);
  },
  getMessage: function(){
    if(this.state.boardState.totalAnswered == this.state.boardState.totalCorrect){
      return 'Nice job! 100%';
    }
    else if(this.state.boardState.totalAnswered/2 > this.state.boardState.totalCorrect){
      return 'C\'mon, you can do better than that. :-)';
    }
    else {
      return 'Keep on trying! Or, make your own!';
    }
  }
});

export default Board;
