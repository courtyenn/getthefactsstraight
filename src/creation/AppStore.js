import { createStore } from 'redux'
import {rootReducer} from './reducer'

const store = createStore(rootReducer, {
    title: 'Common Logic Quiz'
})

export default store