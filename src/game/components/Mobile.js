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
            show: true,
            selected: false,
            error: false,
            selectedColumn: null
        }
        this.store = AppStore
        this.incrementCurrentQuestion = this.incrementCurrentQuestion.bind(this)
        this.onSelect = this.onSelect.bind(this)
    }

    onGameOver () {
        this.show = true
    }

    onSelect (column) {
        this.setState({
            selectedColumn: column,
            selected: true
        })
    }

    renderOptions () {
        return this.props.columns.map(column => {
            return (
                <div key={column._id + '-title-column'} className="flex-container radio"
                     onClick={() => this.onSelect(column)}>
                    <input type="radio" name={`quiz-answers`} value={column._id} id={column._id + '-title-column'}/>
                    <label htmlFor={column._id + '-title-column'}>{column.title}</label>
                </div>
            )
        })
    }

    renderQuestion (question) {
        let options = this.renderOptions()
        let index = this.state.currentQuestion
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
        if (this.state.selected) {
            let currentQuestion = this.state.currentQuestion + 1
            setTimeout(() => {
                this.setState({
                    currentQuestion: currentQuestion,
                    show: true,
                    selectedColumn: null
                })
            }, 1000)
            this.setState({
                show: false,
                selected: false
            })

            Actions.selectChoice(this.state.selectedColumn._id, currentQuestion - 2)
        }
        else {
            this.setState({
                error: true
            })
            setTimeout(() => {
                this.setState({
                    error: false
                })
            }, 1000)
        }
    }

    render () {
        let question = this.props.choices.filter((q, i) => {
            return i === this.state.currentQuestion - 1 ? true : false;
        })[0];
        return (
            <CSSTransition in={this.state.error} classNames="error" timeout={700}>
                <div className="quiz transparent">
                    <div className="title">
                        <h1>{this.props.title}</h1>
                    </div>
                    <div className="content card">
                        {this.renderQuestion(question)}

                        <button type="button" className="btn success" onClick={this.incrementCurrentQuestion}>Next
                        </button>
                    </div>
                    <Message gameOver={this.props.gameOver} className="endGame" totalCorrect={this.props.totalCorrect} totalAnswered={this.props.totalAnswered} quizId={this.props._id} />
                </div>
            </CSSTransition>
        )
    }
}
