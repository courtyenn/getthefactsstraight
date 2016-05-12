var React = require("react");
var Draggable = require("react-dragndrop").Draggable;

var Choice = React.createClass({
  propTypes: {
    title: "Default title",
    correctId: "any"
  },
  render: function(){
    return (
      <Draggable>
        <h2>{this.props.title}</h2>
      </Draggable>
    );
  }
});
