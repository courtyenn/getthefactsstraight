import { createStore } from 'redux'
import { rootReducer } from './reducer'

const store = createStore(rootReducer, {
  editColumnTitle: null,
  editChoiceTitle: null,
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
})

export default store