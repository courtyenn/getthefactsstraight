import React, { Component } from 'react';
import Reflux from 'reflux';
import { default as Choice } from './Choice';
import Column from './Column';
import Message from './Message';
import Actions from '../actions';
import AppStore from '../AppStore';
import { CSSTransitionGroup } from 'react-transition-group'

export default class Mobile extends Reflux.Component {
    constructor () {
        super()
        this.state = {
            currentQuestion: 1
        }
        this.store = AppStore
        this.incrementCurrentQuestion = this.incrementCurrentQuestion.bind(this)
    }

    onGameOver () {
        this.show = true;
    }

    renderOptions () {
        return this.props.columns.map(column => {
            return (<div key={column._id + '-title-column'} className="flex-container radio">
                <input type="radio" name={`quiz-answers`} value={column._id} id={column._id + '-title-column'}/> <label
                htmlFor={column._id + '-title-column'}>{column.title}</label>
            </div>)
        })
    }

    renderQuestion (question) {
        let options = this.renderOptions();
        let index = this.state.currentQuestion;
        return (
            <CSSTransitionGroup
                transitionEnterTimeout={1000}
                transitionLeaveTimeout={1000}
                transitionAppearTimeout={2000}
                transitionAppear={true}
                transitionName="example"
            >
                <div key={"question-" + (index + 1)}
                     className={`mobile question active`}>
                    <div key={`question-${index + 1}-question`}>
                        <h3 className="title mobile">{question.title}</h3>
                        {options}
                    </div>
                </div>
            </CSSTransitionGroup>
        )
    }

    incrementCurrentQuestion () {
        this.setState({
            currentQuestion: this.state.currentQuestion + 1
        });
    }

    render () {
        let question = this.props.columns.filter((q, i) => {
            return i === this.state.currentQuestion - 1 ? true : false;
        })[0];
        return (
            <div className="root">

                <div>
                    <div className="title">
                        <h1>{this.props.title}</h1>
                    </div>
                    <div className="content-mobile card">
                        {this.renderQuestion(question)}

                        <button type="button" className="btn success" onClick={this.incrementCurrentQuestion}>Next
                        </button>
                    </div>
                </div>
            </div>
        )
    }
}
