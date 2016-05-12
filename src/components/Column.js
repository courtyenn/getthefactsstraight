var React = require("react");
var DropTarget = require("react-dragndrop").DropTarget;

var Column = React.createClass({
  propTypes: {
    title: "Default Column Name",
    correctId: "any"
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
