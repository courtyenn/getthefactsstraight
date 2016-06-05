import React from 'react';
import ReactDom from 'react-dom';
import Board from './components/Board';

let App =  React.createClass({
  render: function(){
    return (
      <Board {...this.props.game} />
    )
  }
});

export default App;
