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

export const editColumnTitle = (id, title) => ({
    type: EDIT_COLUMN_TITLE,
    id,
    title
})

export const editColumn = (id) => ({
    type: EDIT_COLUMN,
    id
})

export const editChoice = (id) => ({
    type: EDIT_CHOICE,
    id
})

export const editChoiceTitle = (id, title) => ({
    type: EDIT_CHOICE_TITLE,
    id,
    title
})

export const EDIT_TITLE = 'EDIT_TITLE'
export const EDIT_DESCRIPTION = 'EDIT_DESCRIPTION'
export const ADD_COLUMN = 'ADD_COLUMN'
export const REMOVE_COLUMN = 'REMOVE_COLUMN'
export const EDIT_CHOICE = 'EDIT_CHOICE'
export const EDIT_CHOICE_TITLE = 'EDIT_CHOICE_TITLE'
export const EDIT_COLUMN = 'EDIT_COLUMN'
export const EDIT_COLUMN_TITLE = 'EDIT_COLUMN_TITLE'
export const CREATE_QUIZ = 'CREATE_QUIZ'