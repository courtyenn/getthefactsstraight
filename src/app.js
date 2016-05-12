var React = require('react');
var Choice = require('./components/Choice');
var Column = require('./components/Column');
// var DragDropManager = require('react-dragndrop').DragDropManager;

var App = React.createClass({
  componentWillMount: function(){
    this.columns = JSON.parse(localStorage.getItem('game')).columns;
    this.choices = JSON.parse(localStorage.getItem('game')).choices;
  },
  render: function(){
    var columns = this.renderColumns();
    var choices = this.renderChoices();
    return (
      <div>
        {columns}
        {choices}
      </div>
    )
  },
  renderColumns: function(){
    var columns = this.columns.map(function(column, index){
      return (
        <Column {...column} key={index + "-column"} />
      );
    });
    return columns;
  },
  renderChoices: function(){
    var choices = this.choices.map(function(choice, index){
      return (
        <Choice {...choice} key={index + "-choice"} />
      );
    });
    return choices;
  }
});
