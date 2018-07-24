import { combineReducers } from 'redux'
import { ADD_COLUMN, CREATE_QUIZ, EDIT_TITLE, COLUMN_NAME_CHANGE, REMOVE_COLUMN } from './actions'
import { STATES } from 'mongoose';

// TODO: Use Immutable.js?

export const editTitle = (state = '', action) => {
    switch (action.type) {
        case 'EDIT_TITLE':
            if (action.title.length > 0) {
                return action.title
            }
            return state
        default:
            return state
    }
}

export const editColumn = (state = [], action) => {
    const clone = state.slice(0)

    switch (action.type) {
        case ADD_COLUMN:
            if (action.id) {
                clone.push({
                    title: 'New Category',
                    id: action.id
                })
                return clone
            }
            return state

        case REMOVE_COLUMN:
            return clone.filter(column => column.id !== action.id)
        default:
            return state
    }
}

export const rootReducer = combineReducers({
    title: editTitle,
    columns: editColumn,
    answers: []
})
