import Board from './components/Board';

export default App = React.createClass({
  componentWillMount(){

  }

  render(){

    return (
      <div className="root">
        <Board {...this.props.game} />
      </div>
    )
  }
});
