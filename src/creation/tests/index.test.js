import { editTitle } from '../reducer'

describe('name reducer', () => {
    it('should return the initial state', () => {
        expect(editTitle(undefined, {})).toEqual('')
    })
})