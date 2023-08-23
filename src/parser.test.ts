import { expect, it, describe } from 'vitest'
import { NodeTypes, Token, TokenTypes } from './types'
import { parser } from './parser'


describe('parser', () => {
    it('should parse "22"', () => {
        const tokens = [
            { type: TokenTypes.Num, value: '22' },
        ]
        const ast = {
            type: NodeTypes.Root,
            body: [{
                type: NodeTypes.NumberLiteral,
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
            type: NodeTypes.Root,
            body: [{
                type: NodeTypes.CallExpression,
                name: 'add',
                params: [],
            }]
        }
        expect(parser(tokens)).toEqual(ast)
    })

    it('should parse "(add 1 22)"', () => {

        const tokens = [
            { type: TokenTypes.Paren, value: '(' },
            { type: TokenTypes.Name, value: 'add' },
            { type: TokenTypes.Num, value: '1' },
            { type: TokenTypes.Num, value: '22' },
            { type: TokenTypes.Paren, value: ')' },
        ]
        const ast = {
            type: NodeTypes.Root,
            body: [{
                type: NodeTypes.CallExpression,
                name: 'add',
                params: [
                    {
                        type: NodeTypes.NumberLiteral,
                        value: '1',
                    },
                    {
                        type: NodeTypes.NumberLiteral,
                        value: '22',
                    }
                ],
            }]
        }
        expect(parser(tokens)).toEqual(ast)
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
