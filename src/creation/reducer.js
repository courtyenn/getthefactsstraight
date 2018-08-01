import { combineReducers } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { ADD_COLUMN, ADD_CHOICE, EDIT_CHOICE, REMOVE_COLUMN, REMOVE_CHOICE, EDIT_COLUMN, EDIT_COLUMN_TITLE, EDIT_CHOICE_TITLE, CREATE_QUIZ } from './actions'

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
            if (action.columnId && action.id) {
                clone.push({
                    title: 'New Category',
                    id: action.columnId
                })
                return clone
            }
            return state

        case REMOVE_COLUMN:
            return clone.filter(column => column.id !== action.id)
        case EDIT_COLUMN_TITLE:
            return state.map((s, i) => s.id === action.id ? Object.assign({}, s, { title: action.title }) : s)

        default:
            return state
    }
}

export const editAnswers = (state = [], action) => {
    const clone = state.slice(0)
    switch (action.type) {
        case ADD_COLUMN:
        case ADD_CHOICE:
            if (action.columnId && action.id) {
                clone.push({
                    title: 'Something relevant',
                    id: action.id,
                    correctId: action.columnId
                })
                return clone
            }
            return state
        case REMOVE_COLUMN:
            return clone.filter(choice => choice.correctId !== action.id)
        case REMOVE_CHOICE:
            return clone.filter(choice => choice.id !== action.id)
        case EDIT_CHOICE_TITLE:
            return state.map(s => s.id === action.id ? Object.assign({}, s, { title: action.title }) : s)
        default:
            return state;
    }
}

export const columnToEdit = (state = null, action) => {
    switch (action.type) {
        case EDIT_COLUMN:
            return action.id
        default:
            return state;
    }
}

export const choiceToEdit = (state = null, action) => {
    switch (action.type) {
        case EDIT_CHOICE:
            return action.id
        default:
            return state;
    }
}

const appReducer = combineReducers({
    editColumnTitle: columnToEdit,
    editChoiceId: choiceToEdit,
    title: editTitle,
    columns: editColumn,
    answers: editAnswers
})

export const rootReducer = (state, action) => {
    if (action.type === CREATE_QUIZ) {
        state = undefined
    }

    return appReducer(state, action)
}

