import Reflux from 'reflux';

const BoardStore = (appStore) => {

  let store = Reflux.createStore({
    init: () => {
      Reflux.listenTo(appStore, )
    },
    onGameOver: = () => {
      this.trigger("gameOver");
    }
  });
  return store;
};
