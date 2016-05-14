var React = require("react");
var ReactDom = require('react-dom');
// var DropTarget = require("react-dragndrop").DropTarget;

var Column = React.createClass({
  componentDidMount: function(){
  },
  getDefaultProps: function(){
    return {
      title: "Default Column Name",
      correctId: "any"
    }
  },
  render: function(){
    return (
      <div>
        <DropTarget>
          <h2>{this.props.title}</h2>
          <ul>
            {this.props.children}
          </ul>
        </DropTarget>
      </div>
    );
  }
});
