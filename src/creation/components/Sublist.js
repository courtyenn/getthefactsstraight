import React from 'react';
import ReactDom from 'react-dom';
let addons = {};
import ReactAddons from 'react-addons-update';



export default class Sublist extends React.Component {
  constructor(){
    super();

    let showField = false;
    this.state = {
      showField: false,
      columns: [defaultField()]
    };



  }
  createList(){
    let fields = this.state.columns.map((item, i) => {
      let list = this.createAnswerList(item, i);
      if(!item.edit){
        return (
          <li key={item.id}>
            <span className="addField" onClick={() => {this.addAnswer(i)}}></span>
            <span className="removeField" onClick={() => {this.removeField(i)}}></span>
            <h3 onClick={() => {this.toggleField(i)}}>{item.value}</h3>
            {list}
          </li>);
      }
      else {
        return (
          <li key={item.id}>
            <span className="addField" onClick={() => {this.addAnswer(i, item.id)}}></span>
            <span className="removeField" onClick={() => {this.removeField(i)}}></span>
            <h3>
              <input
              autoFocus
              className="input-inline"
              type="text"
              onChange={(e, n)=>{this.updateList(e, item)}}
              onBlur={() => {this.toggleField(i)}} placeholder={item.value} />
            </h3>
            {list}
          </li>
        )
      }
    });

    return fields;
  }
  updateList(e, editItem){
    let itemValue = e.target.value;
    let list = this.state.columns;
    list.forEach((item, i) => {
      if(item.id == editItem.id){
        list[i].value = itemValue;
      }
    });
    let newState = ReactAddons(this.state, {
      columns: { $set: list }
    });
    this.props.updateGame(newState);
    // this.setState(newState);
  }
  addField(){
    let list = this.state.columns;
    let newState = ReactAddons(this.state, {
      columns: { $push: [defaultField()]}
    });
    this.props.updateGame(newState);
    // this.setState(newState);
  }
  removeField(i){
    let list = this.state.columns;
    list.splice(i, 1);
    let newState = ReactAddons(this.state, {
      columns: { $set: list}
    });
    this.props.updateGame(newState);
    // this.setState(newState);
  }
  toggleField(i){
    let list = this.state.columns;
    list[i].edit = !list[i].edit;
    let newState = ReactAddons(this.state, {
      columns: { $set: list }
    });
    this.props.updateGame(newState);
    // this.setState(newState);
  }
  addAnswer(i, correctId){
    let list = this.state.columns;
    let answer = defaultAnswer();
    answer.correctId = correctId;
    list[i].answers.push(answer);
    let newState = ReactAddons(this.state, {
      columns: { $set: list }
    });
    this.props.updateGame(newState);
    // this.setState(newState);
  }
  createAnswerList(fieldColumn, i){
    let answers = fieldColumn.answers.map((answer, j) => {
      if(!answer.edit){
        return (
          <li key={answer.id} onClick={()=> {this.toggleAnswer(i, j)}}>
            <div className="flex-container">
              <span className="removeField" onClick={() => {this.removeAnswer(i, j)}}></span>
              <span className="description">{answer.value}</span>
            </div>
          </li>
        );
      }
      else {
        return (
          <li key={answer.id}>
          <div className="flex-container">
              <span className="removeField" onClick={() => {this.removeAnswer(i, j)}}></span>
              <span className="description">
              <input
              className="input-inline"
              type="text"
              autoFocus
              onBlur={()=> {this.toggleAnswer(i, j)}}
              onChange={(e) => {this.updateAnswer(e, answer, i, j)}} />
              </span>
            </div>
          </li>
        );
      }

    });
    return React.createElement('ul', {className: 'sub-sublist'}, answers);
  }
  updateAnswer(e, editItem, i, j){
    let itemValue = e.target.value;
    let list = this.state.columns;
    list[i].answers[j].value = itemValue;
    let newState = ReactAddons(this.state, {
      columns: { $set: list }
    });
    this.props.updateGame(newState);
    // this.setState(newState);
  }
  removeAnswer(i, j){
    let list = this.state.columns;
    list[i].answers.splice(j, 1);
    let newState = ReactAddons(this.state, {
      columns: { $set: list }
    });
    this.props.updateGame(newState);
  }
  toggleAnswer(i, j){
    let list = this.state.columns;
    list[i].answers[j].edit = !list[i].answers[j].edit;
    let newState = ReactAddons(this.state, {
      columns: { $set: list }
    });
    this.props.updateGame(newState);
    // this.setState(newState);
  }
  render(){
    let editButton = this.createList();
    return (
      <div className="sublist">
        <ul>
          {editButton}
        </ul>
        <button type="button" onClick={() => {this.addField()}}>Add column</button>
      </div>
    );
  }
};
