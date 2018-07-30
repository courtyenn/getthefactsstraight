import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { rootReducer } from './reducer'

import mySaga from './sagas'

const sagaMiddleware = createSagaMiddleware()

const store = createStore(rootReducer, {
  editColumnTitle: null,
  editChoiceId: null,
  title: 'Common Logic Quiz',
  columns: [
    {
      title: "Cute",
      id: 1
    },
    {
      title: "Edible",
      id: 2
    },
    {
      title: "Horrid",
      id: 3
    }
  ],
  answers: [
    {
      id: 1,
      title: "Tacos",
      correctId: 2
    },
    {
      id: 2,
      title: "Kitties",
      correctId: 1
    },
    {
      id: 3,
      title: "Smelly socks",
      correctId: 3
    },
    {
      id: 4,
      title: "Ferrets",
      correctId: 1
    }
  ]
}, applyMiddleware(sagaMiddleware))
sagaMiddleware.run(mySaga)

export default store