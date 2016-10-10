import React from 'react';
import ReactDom from 'react-dom';
let addons = {};
import ReactAddons from 'react-addons-update';

const defaultField = {
  name: 'title',
  value: 'Name column',
  edit: false,
  id: 'field-'+Math.random()
};
export default class Sublist extends React.Component {
  constructor(){
    super();

    let showField = false;
    this.state = {
      showField: false,
      list: [defaultField]
    };

    this.toggleField = this.toggleField.bind(this);
    this.addField = this.addField.bind(this);
    this.createList = this.createList.bind(this);
    this.updateList = this.updateList.bind(this);
  }
  createList(){
    let fields = this.state.list.map((item, i) => {
      if(!item.edit){
        return (<li key={item.id} onClick={() => {this.toggleField(item)}}>{item.value}</li>);
      }
      else {
        return (<li key={item.id}><input type="text" onChange={(e, n)=>{this.updateList(e, item)}} onBlur={() => {this.toggleField(item)}} value={item.value} /></li>)
      }
    });

    return fields;
  }
  updateList(e, editItem){
    let itemValue = e.target.value;
    let list = this.state.list;
    list.forEach((item, i) => {
      if(item.id == editItem.id){
        list[i].value = itemValue;
      }
    });
    let newState = ReactAddons(this.state, {
      list: { $set: list }
    });
    this.setState(newState);
  }
  addField(){
    let list = this.state.list;
    let newState = ReactAddons(this.state, {
      list: { $push: [defaultField]}
    });
    this.setState(newState);
  }
  toggleField(editItem){
    let list = this.state.list;
    list.forEach((item, i) => {
      if(item.value == editItem.value){
        list[i].edit = !list[i].edit;
      }
    });
    let newState = ReactAddons(this.state, {
      list: { $set: list}
    });
    this.setState(newState);
  }
  render(){
    let editButton = this.createList();
    return (
      <div className="sublist">
        <ul>
          {editButton}
        </ul>
      </div>
    );
  }
};
