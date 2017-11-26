import React from 'react';

import AppStore from './AppStore';
import Board from './components/Board';
import CuteData from './cuteData';

CuteData.init();

let appStore = AppStore;
let appState = appStore.getInitialState();

let App =  React.createClass({
  render: function(){
    return (
      <Board {...appState.game} />
    )
  }
});

export default App;
