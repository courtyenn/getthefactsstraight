import { combineReducers } from 'redux'
import { EDIT_DESCRIPTION, ADD_COLUMN, CREATE_QUIZ } from './actions'
import { STATES } from 'mongoose';

export const editTitle = (state = '', action) => {
    switch (action.type) {
        case 'EDIT_TITLE':
            if(action.title.length > 0){
                return action.title
            }
            return state
          default:
          return state
      }
}

export const rootReducer = combineReducers({
    title: editTitle
})

