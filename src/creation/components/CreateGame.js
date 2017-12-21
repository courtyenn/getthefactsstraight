import axios from 'axios';
import React from 'react';
import ReactAddons from 'react-addons-update';

import SubList from './Sublist';

const defaultAnswer = function (id) {
    return {
        name: 'choice',
        title: 'Truthy description',
        edit: false,
        id: 'answer-' + Math.random(),
        correctId: id ? id : null
    }
};
const defaultField = function () {
    let field = {
        name: 'column',
        title: 'Name column',
        edit: false,
        id: 'field-' + Math.random()
    };
    field.answers = [defaultAnswer(field.id)];
    return field;
};


export default class CreateGame extends React.Component {

    constructor () {
        super();
        this.state = {
            title: 'Common Logic Quiz',
            showField: false,
            columns: [defaultField()],
            choices: []
        }

        this.submitGame = this.submitGame.bind(this);
        this.updateGame = this.updateGame.bind(this);
        this.updateName = this.updateName.bind(this);
        this.toggleField = this.toggleField.bind(this);
        this.addField = this.addField.bind(this);
        this.removeField = this.removeField.bind(this);
        this.createList = this.createList.bind(this);
        this.updateList = this.updateList.bind(this);
        this.addAnswer = this.addAnswer.bind(this);
        this.createAnswerList = this.createAnswerList.bind(this);
        this.updateAnswer = this.updateAnswer.bind(this);
        this.toggleAnswer = this.toggleAnswer.bind(this);
        this.removeAnswer = this.removeAnswer.bind(this);
        this.detectKey = this.detectKey.bind(this);
    }

    createList () {
        let fields = this.state.columns.map((item, i) => {
            let list = this.createAnswerList(item, i);


            if (!item.edit) {
                return (
                    <li key={item.id} className="flex-container">
                        <div className="list-header flex-container">
                            <button className="addField" onClick={() => {
                                this.addAnswer(i, item.id)
                            }}></button>
                            <button className="removeField" onClick={() => {
                                this.removeField(i)
                            }}></button>
                            <button className="btn-h" onKeyPress={(e) => {
                                this.detectKey(e, i)
                            }}>
                                <h3 onClick={() => {
                                    this.toggleField(i)
                                }}>{item.title}</h3>
                            </button>
                        </div>
                        {list}
                    </li>);
            }
            else {
                return (
                    <li key={item.id} className="flex-container">
                        <div className="list-header flex-container">
                            <button className="addField" onClick={() => {
                                this.addAnswer(i, item.id)
                            }}></button>
                            <button className="removeField" onClick={() => {
                                this.removeField(i)
                            }}></button>
                            <button className="btn-h">
                                <h3><input
                                    autoFocus
                                    className="input-inline"
                                    type="text"
                                    onChange={(e, n) => {
                                        this.updateList(e, item)
                                    }}
                                    onKeyPress={(e) => {
                                        this.detectKey(e, i)
                                    }}
                                    onBlur={() => {
                                        this.toggleField(i)
                                    }} placeholder={item.title}/>
                                </h3>
                            </button>
                        </div>
                        {list}
                    </li>
                )
            }
        });

        return fields;
    }

    detectKey (e, i, j) {
        if (e.key === 'Enter') {
            if (j) {
                this.toggleAnswer(i, j);
            }
            else {
                this.toggleField(i);
            }
        }
    }

    updateList (e, editItem) {
        let itemValue = e.target.value;
        let list = this.state.columns;
        list.forEach((item, i) => {
            if (item.id == editItem.id) {
                list[i].title = itemValue;
            }
        });
        let newState = ReactAddons(this.state, {
            columns: {$set: list}
        });
        this.updateGame(newState);
    }

    addField () {
        let list = this.state.columns;
        let newState = ReactAddons(this.state, {
            columns: {$push: [defaultField()]}
        });
        this.updateGame(newState);
        // this.toggleField(newState.columns.length - 1);
    }

    removeField (i) {
        let list = this.state.columns;
        list.splice(i, 1);
        let newState = ReactAddons(this.state, {
            columns: {$set: list}
        });
        this.updateGame(newState);
    }

    toggleField (i) {
        let list = this.state.columns;
        list[i].edit = !list[i].edit;
        let newState = ReactAddons(this.state, {
            columns: {$set: list}
        });
        this.updateGame(newState);
    }

    addAnswer (i, correctId) {
        let list = this.state.columns;
        let answer = defaultAnswer(correctId);
        list[i].answers.push(answer);
        let newState = ReactAddons(this.state, {
            columns: {$set: list}
        });
        this.updateGame(newState);
        this.toggleAnswer(i, list[i].answers.length - 1);
    }

    createAnswerList (fieldColumn, i) {
        let answers = fieldColumn.answers.map((answer, j) => {
            if (!answer.edit) {
                return (
                    <li key={answer.id}>
                        <div className="flex-container">
                            <button className="removeField" onClick={() => {
                                this.removeAnswer(i, j)
                            }}></button>
                            <button className="btn-h" onKeyPress={(e) => {
                                this.detectKey(e, i, j)
                            }}
                                    onClick={() => {
                                        this.toggleAnswer(i, j)
                                    }}>
                                <h4 className="description">{answer.title}</h4></button>
                        </div>
                    </li>
                );
            }
            else {
                return (
                    <li key={answer.id}>
                        <div className="flex-container">
                            <button className="removeField" onClick={() => {
                                this.removeAnswer(i, j)
                            }}></button>
                            <button className="btn-h">
                                <h4 className="description">
                                    <input
                                        className="input-inline"
                                        type="text"
                                        value={answer.title}
                                        autoFocus
                                        onBlur={() => {
                                            this.toggleAnswer(i, j)
                                        }}
                                        onKeyPress={(e) => {
                                            this.detectKey(e, i, j)
                                        }}
                                        onChange={(e) => {
                                            this.updateAnswer(e, answer, i, j)
                                        }}/></h4>
                            </button>
                        </div>
                    </li>
                );
            }

        });
        answers.push(<li key={'fieldColumn-' + fieldColumn.id + '-addButton'}>
            <button className="addField" onClick={() => {
                this.addAnswer(i, fieldColumn.id)
            }}></button>
        </li>);
        return React.createElement('ul', {className: 'sub-sublist'}, answers);
    }

    updateName (name) {
        let newState = ReactAddons(this.state, {$set: {title: name}});
        this.setState(newState);
    }

    updateAnswer (e, editItem, i, j) {
        let itemValue = e.target.value;
        let list = this.state.columns;
        list[i].answers[j].title = itemValue;
        let newState = ReactAddons(this.state, {
            columns: {$set: list}
        });
        this.updateGame(newState);
    }

    removeAnswer (i, j) {
        let list = this.state.columns;
        list[i].answers.splice(j, 1);
        let newState = ReactAddons(this.state, {
            columns: {$set: list}
        });
        this.updateGame(newState);
    }

    toggleAnswer (i, j) {
        let list = this.state.columns;
        list[i].answers[j].edit = !list[i].answers[j].edit;
        let newState = ReactAddons(this.state, {
            columns: {$set: list}
        });
        this.updateGame(newState);
    }

    submitGame () {
        axios.post('/quiz', this.state).then(data => {
            window.location = data.data.redirect;
        });
    }

    updateGame (newState) {
        let choices = newState.columns.reduce((columnA, columnB) => {
            console.log('columnB', columnA, columnB);
            return columnA.length > 0 ? columnA.concat(columnB.answers) : columnB.answers;
        }, []);
        let finalState = ReactAddons(this.state, {$set: {columns: newState.columns, choices}});
        this.setState(finalState);
    }

    render () {
        let editButton = this.createList();
        return (
            <div className="quiz">
                <div className="title">
                    <input id="title" type="text" name="title" placeholder={this.state.title}
                           className="input-wide" onChange={(e) => this.updateName(e.target.value)}/>
                </div>
                <div className="content">
                    <label htmlFor="editor">Create columns to compare and contrast</label>
                    <div className="sublist">
                        <ul>
                            {editButton}
                        </ul>
                        <button className="btn" type="button" onClick={() => {
                            this.addField()
                        }}>Add column
                        </button>
                    </div>
                    <input className="btn primary" type="button" onClick={() => this.submitGame()} value="Submit"/>
                </div>
            </div>
        );
    }
}
