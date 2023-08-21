import { expect, it, describe } from 'vitest'


describe('tokenizer', () => {
    const str = `(add 2 (subtract 4 2))`
    const tokens = [
        { type: 'paren', value: '(' },
        { type: 'name', value: 'add' },
        { type: 'number', value: '2' },
        { type: 'paren', value: '(' },
        { type: 'name', value: 'subtract' },
        { type: 'number', value: '4' },
        { type: 'number', value: '2' },
        { type: 'paren', value: ')' },
        { type: 'paren', value: ')' },

    ]
    it('should return true', () => {
        expect(true).toBe(true);
    });
})