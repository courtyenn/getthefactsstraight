import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as Actions from '../actions'
// let defaultAnswer = () => {
//   return {
//     name: 'choice',
//     value: 'Truthy description',
//     edit: false,
//     id: 'answer-' + Math.random(),
//   }
// };
// let defaultField = () => {
//   return {
//     name: 'title',
//     value: 'Name column',
//     edit: false,
//     id: 'field-' + Math.random(),
//     answers: [defaultAnswer()]
//   }
// };

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
    let answers = this.props.answers.filter(n => n.correctId === i).map((answer, j) => {
      // if(!answer.edit){
        return (
          <li key={answer.id}>
          {/* <li key={answer.id} onClick={()=> {this.toggleAnswer(i, j)}}> */}
            <div className="flex-container">
              <span className="addField" onClick={() => {this.addAnswer(i)}}></span>
              <span className="removeField" onClick={() => {this.removeAnswer(i, j)}}></span>
              <span className="description">{answer.title}</span>
            </div>
          </li>
        );
      // }
      // else {
      //   return (
      //     <li key={answer.id}>
          {/* <div className="flex-container">
              <span className="removeField" onClick={() => {this.removeAnswer(i, j)}}></span>
              <input
              className="input-inline"
              type="text"
              autoFocus
              onBlur={()=> {this.toggleAnswer(i, j)}}
              onChange={(e) => {this.updateAnswer(e, answer, i, j)}} />
            </div> */}
      //     </li>
      //   );
      // }

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
    let { columns, onAddColumn } = this.props;
    let fields = columns.map((item, i) => {
      let list = this.createAnswerList(i+1);
      if (!item.edit) {
        return (
          <div className="sublist" key={item.id}>
            {/* <span className="addField"></span> */}
            <span className="removeField"></span>
            <h3>{item.title}</h3>
            <ul className="sub-sublist">
                {/* <h3 onClick={() => {this.toggleField(i)}}>{item.title}</h3> */}
              {list}
            </ul>
            
          </div>);
      }
      else {
        return (
          <li key={item.id}>
            {/* <span className="addField" onClick={() => {this.addAnswer(i)}}></span>
            <span className="removeField" onClick={() => {this.removeField(i)}}></span> */}
            {/* <h3>
              <input
              autoFocus
              className="input-inline"
              type="text"
              onChange={(e, n)=>{this.updateList(e, item)}}
              onBlur={() => {this.toggleField(i)}} value={item.value} />
            </h3> */}
            {/* {list} */}
          </li>
        )
      }
    });

    return fields;
  }
  render() {
    let { columns } = this.props;
    let list = this.createList()
  return (<div>{list}<button type="button" onClick={e => { onAddColumn(columns.length + 1) }}>Add Column</button></div>);
  }
};
export default connect(state => ({
  columns: state.columns,
  answers: state.answers
}),
  dispatch => ({
    onAddColumn: id => { dispatch(Actions.addColumn(id)) }
  }))(Sublist)