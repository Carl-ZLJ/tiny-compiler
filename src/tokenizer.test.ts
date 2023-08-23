import { expect, it, describe } from 'vitest'
import { tokenizer } from './tokenizer'
import { TokenTypes } from './types'


describe('tokenizer: single value', () => {

    it('paren left', () => {
        const input = '('
        const output = [
            {
                type: TokenTypes.Paren,
                value: '(',
            }
        ]
        expect(tokenizer(input)).toEqual(output)
    })

    it('paren right', () => {
        const input = ')'
        const output = [
            {
                type: TokenTypes.Paren,
                value: ')',
            }
        ]
        expect(tokenizer(input)).toEqual(output)
    })

    it('add', () => {
        const input = 'add'
        const output = [
            {
                type: TokenTypes.Name,
                value: 'add',
            }
        ]
        expect(tokenizer(input)).toEqual(output)
    })

    it('number', () => {
        const input = '22'
        const output = [
            {
                type: TokenTypes.Num,
                value: '22',
            }
        ]
        expect(tokenizer(input)).toEqual(output)
    })

})

describe('tokenizer: multiple values', () => {
    it('add 2 1', () => {
        const input = `(add 2 1)`
        const output = [
            { type: TokenTypes.Paren, value: '(' },
            { type: TokenTypes.Name, value: 'add' },
            { type: TokenTypes.Num, value: '2' },
            { type: TokenTypes.Num, value: '1' },
            { type: TokenTypes.Paren, value: ')' },
        ]

        expect(tokenizer(input)).toEqual(output)
    })

    it('add 22 11', () => {
        const input = `(add 22 11)`
        const output = [
            { type: TokenTypes.Paren, value: '(' },
            { type: TokenTypes.Name, value: 'add' },
            { type: TokenTypes.Num, value: '22' },
            { type: TokenTypes.Num, value: '11' },
            { type: TokenTypes.Paren, value: ')' },
        ]

        expect(tokenizer(input)).toEqual(output)
    })

    it('add 2 (subtract 4 2)', () => {
        const input = `(add 2 (subtract 4 2))`
        const output = [
            { type: TokenTypes.Paren, value: '(' },
            { type: TokenTypes.Name, value: 'add' },
            { type: TokenTypes.Num, value: '2' },
            { type: TokenTypes.Paren, value: '(' },
            { type: TokenTypes.Name, value: 'subtract' },
            { type: TokenTypes.Num, value: '4' },
            { type: TokenTypes.Num, value: '2' },
            { type: TokenTypes.Paren, value: ')' },
            { type: TokenTypes.Paren, value: ')' },
        ]
        expect(tokenizer(input)).toEqual(output)
    })
})