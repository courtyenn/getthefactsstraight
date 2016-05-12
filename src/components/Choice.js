var React = require("react");
var Draggable = require("react-dragndrop").Draggable;

var Choice = React.createClass({
  getDefaultProps: function(){
    return {
      title: "default title",
      correctId: "any"
    }
  },
  render: function(){
    return (
      // <Draggable>
      //   <h2>{this.props.title}</h2>
      // </Draggable>
      <li>hi</li>
    );
  }
});
