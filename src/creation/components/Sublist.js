import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as Actions from '../actions'

class Sublist extends Component {
  // updateList(e, editItem){
  //   let itemValue = e.target.value;
  //   let list = this.state.list;
  //   list.forEach((item, i) => {
  //     if(item.id == editItem.id){
  //       list[i].value = itemValue;
  //     }
  //   });
  //   let newState = ReactAddons(this.state, {
  //     list: { $set: list }
  //   });
  //   this.setState(newState);
  // }
  // addField(){
  //   let list = this.state.list;
  //   let newState = ReactAddons(this.state, {
  //     list: { $push: [defaultField()]}
  //   });
  //   this.setState(newState);
  // }
  // removeField(i){
  //   let list = this.state.list;
  //   list.splice(i, 1);
  //   let newState = ReactAddons(this.state, {
  //     list: { $set: list}
  //   });
  //   this.setState(newState);
  // }
  // toggleField(i){
  //   let list = this.state.list;
  //   list[i].edit = !list[i].edit;
  //   let newState = ReactAddons(this.state, {
  //     list: { $set: list }
  //   });
  //   this.setState(newState);
  // }
  // addAnswer(i){
  //   let list = this.state.list;
  //   list[i].answers.push(defaultAnswer());
  //   let newState = ReactAddons(this.state, {
  //     list: { $set: list }
  //   });
  //   this.setState(newState);
  // }
  createAnswerList(i){
    let {editChoiceId, onEditChoice, onEditChoiceTitle} = this.props;
    let answers = this.props.answers.filter(n => n.correctId === i).map((answer, j) => {
      if(answer.id !== editChoiceId){
        return (
          <li key={answer.id}>
          {/* <li key={answer.id} onClick={()=> {this.toggleAnswer(i, j)}}> */}
            <div className="flex-container">
              <span className="addField" onClick={() => {this.addAnswer(i)}}></span>
              <span className="removeField" onClick={() => {this.removeAnswer(i, j)}}></span>
              <span className="description" onClick={e => onEditChoice(answer.id)}>{answer.title}</span>
            </div>
          </li>
        );
      }
      else {
        return (
          <li key={answer.id}>
          <div className="flex-container">
              <span className="addField" onClick={() => {this.addAnswer(i)}}></span>
              <span className="removeField" onClick={() => {this.removeAnswer(i, j)}}></span>
              <input
              className="input-inline"
              type="text"
              onChange={e => onEditChoiceTitle(answer.id, e.target.value)}
              onBlur={e => onEditChoice(null)}
              autoFocus />
            </div>
          </li>
        );
      }

    });
    return answers;
  }
  // updateAnswer(e, editItem, i, j){
  //   let itemValue = e.target.value;
  //   let list = this.state.list;
  //   list[i].answers[j].value = itemValue;
  //   let newState = ReactAddons(this.state, {
  //     list: { $set: list }
  //   });
  //   this.setState(newState);
  // }
  // removeAnswer(i, j){
  //   let list = this.state.list;
  //   list[i].answers.splice(j, 1);
  //   let newState = ReactAddons(this.state, {
  //     list: { $set: list }
  //   });
  //   this.setState(newState);
  // }
  // toggleAnswer(i, j){
  //   let list = this.state.list;
  //   list[i].answers[j].edit = !list[i].answers[j].edit;
  //   let newState = ReactAddons(this.state, {
  //     list: { $set: list }
  //   });
  //   this.setState(newState);
  // }

  createList() {
    let { columns, onEditColumn, onEditColumnTitle, editColumnTitle } = this.props;
    let fields = columns.map((item, i) => {
      let list = this.createAnswerList(i+1);
      if (item.id !== editColumnTitle) {
        return (
          <div className="sublist" key={item.id}>
            {/* <span className="addField"></span> */}
            <span className="removeField"></span>
            <h3 onClick={e => onEditColumn(item.id)}>{item.title}</h3>
            <ul className="sub-sublist">
                {/* <h3 onClick={() => {this.toggleField(i)}}>{item.title}</h3> */}
              {list}
            </ul>
            
          </div>);
      }
      else {
        return (
          <div className="sublist" key={item.id}>
            {/* <span className="addField"></span> */}
            <span className="removeField"></span>
            <h3><input
              autoFocus
              className="input-inline"
              onChange={e => onEditColumnTitle(item.id, e.target.value)}
              onBlur={e => onEditColumn(null)}
              type="text" /></h3>
            <ul className="sub-sublist">
                {/* <h3 onClick={() => {this.toggleField(i)}}>{item.title}</h3> */}
              {list}
            </ul>
          </div>
        )
      }
    });

    return fields;
  }
  render() {
    let { columns, onAddColumn } = this.props;
    let list = this.createList()
  return (<div>{list}<button type="button" onClick={e => { onAddColumn(columns.length + 1) }}>Add Column</button></div>);
  }
};
export default connect(state => ({
  columns: state.columns,
  answers: state.answers,
  editColumnTitle: state.editColumnTitle,
  editChoiceId: state.editChoiceId
}),
  dispatch => ({
    onAddColumn: id => { dispatch(Actions.addColumn(id)) },
    onEditColumn: id => { dispatch(Actions.editColumn(id)) },
    onEditColumnTitle: (id, val) => {dispatch(Actions.editColumnTitle(id, val))},
    onEditChoice: (id, val) => {dispatch(Actions.editChoice(id))},
    onEditChoiceTitle: (id, val) => {dispatch(Actions.editChoiceTitle(id, val))},
  }))(Sublist)