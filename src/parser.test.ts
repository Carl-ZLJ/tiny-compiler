import { expect, it, describe } from 'vitest'
import { TransformedNodeTypes, Token, TokenTypes } from './types'
import { parser } from './parser'


describe('simple parser', () => {
    it('should parse "22"', () => {
        const tokens = [
            { type: TokenTypes.Num, value: '22' },
        ]
        const ast = {
            type: TransformedNodeTypes.Program,
            body: [{
                type: TransformedNodeTypes.NumberLiteral,
                value: '22',
            }]
        }
        expect(parser(tokens)).toEqual(ast)
    })

    it('should parse "add"', () => {

        const tokens = [
            { type: TokenTypes.Name, value: 'add' },
        ]
        const ast = {
            type: TransformedNodeTypes.Program,
            body: [{
                type: TransformedNodeTypes.CallExpression,
                name: 'add',
                params: [],
            }]
        }
        expect(parser(tokens)).toEqual(ast)
    })
})

describe('compound expressions', () => {
    it('should parse "(add 1 22)"', () => {
        const tokens = [
            { type: TokenTypes.Paren, value: '(' },
            { type: TokenTypes.Name, value: 'add' },
            { type: TokenTypes.Num, value: '1' },
            { type: TokenTypes.Num, value: '22' },
            { type: TokenTypes.Paren, value: ')' },
        ]
        const ast = {
            type: TransformedNodeTypes.Program,
            body: [{
                type: TransformedNodeTypes.CallExpression,
                name: 'add',
                params: [
                    {
                        type: TransformedNodeTypes.NumberLiteral,
                        value: '1',
                    },
                    {
                        type: TransformedNodeTypes.NumberLiteral,
                        value: '22',
                    }
                ],
            }]
        }
        expect(parser(tokens)).toEqual(ast)
    })

    it('should parse "(add 1 22)(add 22 33)"', () => {

        const tokens = [
            { type: TokenTypes.Paren, value: '(' },
            { type: TokenTypes.Name, value: 'add' },
            { type: TokenTypes.Num, value: '1' },
            { type: TokenTypes.Num, value: '22' },
            { type: TokenTypes.Paren, value: ')' },
            { type: TokenTypes.Paren, value: '(' },
            { type: TokenTypes.Name, value: 'add' },
            { type: TokenTypes.Num, value: '22' },
            { type: TokenTypes.Num, value: '33' },
            { type: TokenTypes.Paren, value: ')' },
        ]
        const ast = {
            type: TransformedNodeTypes.Program,
            body: [
                {
                    type: TransformedNodeTypes.CallExpression,
                    name: 'add',
                    params: [
                        {
                            type: TransformedNodeTypes.NumberLiteral,
                            value: '1',
                        },
                        {
                            type: TransformedNodeTypes.NumberLiteral,
                            value: '22',
                        }
                    ],
                },
                {
                    type: TransformedNodeTypes.CallExpression,
                    name: 'add',
                    params: [
                        {
                            type: TransformedNodeTypes.NumberLiteral,
                            value: '22',
                        },
                        {
                            type: TransformedNodeTypes.NumberLiteral,
                            value: '33',
                        }
                    ],
                }
            ]
        }
        expect(parser(tokens)).toStrictEqual(ast)
    })

    it('should parse tokens into AST', () => {
        const tokens: Token[] = [
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
        const ast = {
            type: 'Program',
            body: [{
                type: 'CallExpression',
                name: 'add',
                params: [{
                    type: 'NumberLiteral',
                    value: '2',
                }, {
                    type: 'CallExpression',
                    name: 'subtract',
                    params: [{
                        type: 'NumberLiteral',
                        value: '4',
                    }, {
                        type: 'NumberLiteral',
                        value: '2',
                    }]
                }]
            }]
        }

        expect(parser(tokens)).toEqual(ast)
    })

})
