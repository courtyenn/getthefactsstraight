import React, { Component } from 'react'
import { connect } from 'react-redux'
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
  constructor(){
    super();

    // let showField = false;
    // this.state = {
    //   showField: false,
    //   list: [defaultField()]
    // };

    // this.toggleField = this.toggleField.bind(this);
    // this.addField = this.addField.bind(this);
    // this.removeField = this.removeField.bind(this);
    // this.createList = this.createList.bind(this);
    // this.updateList = this.updateList.bind(this);
    // this.addAnswer = this.addAnswer.bind(this);
    // this.createAnswerList = this.createAnswerList.bind(this);
    // this.updateAnswer = this.updateAnswer.bind(this);
    // this.toggleAnswer = this.toggleAnswer.bind(this);
    // this.removeAnswer = this.removeAnswer.bind(this);

  }
  // createList(){
  //   let fields = this.state.list.map((item, i) => {
  //     let list = this.createAnswerList(item, i);
  //     if(!item.edit){
  //       return (
  //         <li key={item.id}>
  //           <span className="addField" onClick={() => {this.addAnswer(i)}}></span>
  //           <span className="removeField" onClick={() => {this.removeField(i)}}></span>
  //           <h3 onClick={() => {this.toggleField(i)}}>{item.value}</h3>
  //           {list}
  //         </li>);
  //     }
  //     else {
  //       return (
  //         <li key={item.id}>
  //           <span className="addField" onClick={() => {this.addAnswer(i)}}></span>
  //           <span className="removeField" onClick={() => {this.removeField(i)}}></span>
  //           <h3>
  //             <input
  //             autoFocus
  //             className="input-inline"
  //             type="text"
  //             onChange={(e, n)=>{this.updateList(e, item)}}
  //             onBlur={() => {this.toggleField(i)}} value={item.value} />
  //           </h3>
  //           {list}
  //         </li>
  //       )
  //     }
  //   });

  //   return fields;
  // }
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
  // createAnswerList(fieldColumn, i){
  //   let answers = fieldColumn.answers.map((answer, j) => {
  //     if(!answer.edit){
  //       return (
  //         <li key={answer.id} onClick={()=> {this.toggleAnswer(i, j)}}>
  //           <div className="flex-container">
  //             <span className="removeField" onClick={() => {this.removeAnswer(i, j)}}></span>
  //             <span className="description">{answer.value}</span>
  //           </div>
  //         </li>
  //       );
  //     }
  //     else {
  //       return (
  //         <li key={answer.id}>
  //         <div className="flex-container">
  //             <span className="removeField" onClick={() => {this.removeAnswer(i, j)}}></span>
  //             <input
  //             className="input-inline"
  //             type="text"
  //             autoFocus
  //             onBlur={()=> {this.toggleAnswer(i, j)}}
  //             onChange={(e) => {this.updateAnswer(e, answer, i, j)}} />
  //           </div>
  //         </li>
  //       );
  //     }

  //   });
  //   return React.createElement('ul', {className: 'sub-sublist'}, answers);
  // }
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
  render(){
    
    return (
      <div className="sublist">
        <ul>
          <li></li>
        </ul>
        <button type="button" onClick={() => {this.addField()}}>Add Column</button>
      </div>
    );
  }
};
export default connect(state => ({
  columns: state.columns
}))(Sublist)