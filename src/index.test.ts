import { expect, it, describe } from 'vitest'
import { tokenizer, TokenTypes } from '.'


describe('tokenizer: single value', () => {
    // const str = `(add 2 (subtract 4 2))`
    // const tokens = [
    //     { type: 'paren', value: '(' },
    //     { type: 'name', value: 'add' },
    //     { type: 'number', value: '2' },
    //     { type: 'paren', value: '(' },
    //     { type: 'name', value: 'subtract' },
    //     { type: 'number', value: '4' },
    //     { type: 'number', value: '2' },
    //     { type: 'paren', value: ')' },
    //     { type: 'paren', value: ')' },
    // ]

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