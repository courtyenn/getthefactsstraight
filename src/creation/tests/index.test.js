import { editTitle, editColumn } from '../reducer'
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
        expect(editColumn([], Action.addColumn(4)).length).toEqual(1)
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
})