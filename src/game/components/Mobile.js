import React, { Component } from 'react';
import Reflux from 'reflux';
import { default as Choice } from './Choice';
import Column from './Column';
import Message from './Message';
import Actions from '../actions';
import AppStore from '../AppStore';
import { CSSTransition } from 'react-transition-group'

export default class Mobile extends Reflux.Component {
    constructor () {
        super()
        this.state = {
            currentQuestion: 1,
            loadingNextQ: false,
            show: true
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
            <CSSTransition
                in={this.state.show}
                timeout={{
                    enter: 500,
                    exit: 2000
                }}
                classNames="example"
            >
                <div key={"question-" + (index + 1)}
                     className={`mobile question active`}>
                    <div key={`question-${index + 1}-question`}>
                        <div className="title">
                            <h3>{question.title}</h3>
                        </div>
                        <div className="content">
                            {options}
                        </div>
                    </div>
                </div>
            </CSSTransition>
        )
    }

    incrementCurrentQuestion () {
        let currentQuestion = this.state.currentQuestion + 1;
        setTimeout(() => {
            this.setState({
                currentQuestion: currentQuestion,
                show: true
            });
        }, 1000);
        this.setState({
            show: false
        });
    }

    render () {
        let question = this.props.choices.filter((q, i) => {
            return i === this.state.currentQuestion - 1 ? true : false;
        })[0];
        return (
            <div>
                <div className="title">
                    <h1>{this.props.title}</h1>
                </div>
                <div className="content card">
                    {this.renderQuestion(question)}

                    <button type="button" className="btn success" onClick={this.incrementCurrentQuestion}>Next
                    </button>
                </div>
            </div>
        )
    }
}
