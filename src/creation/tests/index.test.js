import { editTitle, editColumn, editAnswers, columnToEdit, choiceToEdit } from '../reducer'
import * as Action from '../actions'

describe('name reducer', () => {
    it('should return the initial state', () => {
        expect(editTitle(undefined, {})).toEqual('')
    })

    it('should return the modified title', () => {
        expect(editTitle('', Action.editTitle('test'))).toEqual('test')
    })

    it('should return the modified title', () => {
        expect(editTitle('', Action.editTitle(''))).toEqual('')
    })
})

describe('column reducer', () => {
    it('should return the initial state', () => {
        expect(editColumn(undefined, {})).toEqual([])
    })

    it('should add new column', () => {
        expect(editColumn([], Action.addColumn(4, 1)).length).toEqual(1)
    })

    it('should not add new column', () => {
        expect(editColumn([], Action.addColumn(4, null)).length).toEqual(0)
    })

    it('should add new column - not mutate state', () => {
        expect(editColumn([], Action.addColumn()).length).toEqual(0)
    })

    it('should remove column', () => {
        expect(editColumn([{id: 1, title: 'hi'}], Action.removeColumn(1)).length).toEqual(0)
    })

    it('should not mutate state', () => {
        expect(editColumn([{id: 1, title: 'hi'}], Action.removeColumn(undefined)).length).toEqual(1)
    })

    it('should edit column name', () => {
        expect(editColumn([{id: 1, title: 'hi'}, {id: 2, title:'what'}], Action.editColumnTitle(2, 'hey'))[1].title).toEqual('hey')
    })

    it('should not edit column name', () => {
        expect(editColumn([{id: 1, title: 'hi'}, {id: 2, title:'what'}], Action.editColumnTitle(3, 'hey'))[1].title).toEqual('what')
    })
})

describe('answer reducer', () => {
    it('should edit specific choice title', () => {
        expect(editAnswers([{id: 1, correctId: 1, title: 'yo yo yo'}], Action.editChoiceTitle(1, 'sup'))[0].title).toEqual('sup')
    })
    it('should add a new choice to column', () => {
        expect(editAnswers([], Action.addChoice(1, 1)).length).toEqual(1)
    })
    it('should add a new choice to column', () => {
        expect(editAnswers([], Action.addColumn(1, 1))[0].title).toEqual('Something relevant')
    })
    it('should NOT add a new choice to column', () => {
        expect(editAnswers([], Action.addChoice()).length).toEqual(0)
    })
    it('should NOT remove choice from column', () => {
        expect(editAnswers([{id: 1, correctId: 1, title: 'yo yo yo'}], Action.removeChoice(0)).length).toEqual(1)
    })
    it('should remove choice from column', () => {
        expect(editAnswers([{id: 1, correctId: 1, title: 'yo yo yo'}], Action.removeChoice(1)).length).toEqual(0)
    })
})

describe('choiceEdit reducer', () => {
    it('should update the choiceEdit index', () => {
        expect(choiceToEdit(null, Action.editChoice(1))).toEqual(1)
    });
});

describe('columnEdit reducer', () => {
    it('should update the columnEdit index', () => {
        expect(columnToEdit(null, Action.editColumn(1))).toEqual(1)
    });
});