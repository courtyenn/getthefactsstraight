export const editTitle = title => ({
    type: EDIT_TITLE,
    title
})

export const addColumn = id => ({
    type: ADD_COLUMN,
    id
})

export const removeColumn = id => ({
    type: REMOVE_COLUMN,
    id
})

export const editColumn = (id, title) => ({
    type: COLUMN_NAME_CHANGE,
    id,
    title
})

export const editColumnTitle = (id, title) => ({
    type: EDIT_COLUMN_TITLE,
    id
})

export const editChoiceTitle = (id, title) => ({
    type: EDIT_CHOICE_TITLE,
    id
})

export const EDIT_TITLE = 'EDIT_TITLE'
export const EDIT_DESCRIPTION = 'EDIT_DESCRIPTION'
export const ADD_COLUMN = 'ADD_COLUMN'
export const REMOVE_COLUMN = 'REMOVE_COLUMN'
export const COLUMN_NAME_CHANGE = 'COLUMN_NAME_CHANGE'
export const EDIT_CHOICE_TITLE = 'EDIT_CHOICE_TITLE'
export const EDIT_COLUMN_TITLE = 'EDIT_COLUMN_TITLE'
export const CREATE_QUIZ = 'CREATE_QUIZ'