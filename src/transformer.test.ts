import { expect, test } from 'vitest'
import { CallExpressionNode, NodeTypes, NumberLiteralNode, RootNode, Visitor } from './types'
import { transformer } from './transformer'

test('transformer', () => {
    const origin: RootNode = {
        type: NodeTypes.Root,
        body: [{
            type: NodeTypes.CallExpression,
            name: 'add',
            params: [{
                type: NodeTypes.NumberLiteral,
                value: '2'
            }, {
                type: NodeTypes.CallExpression,
                name: 'subtract',
                params: [{
                    type: NodeTypes.NumberLiteral,
                    value: '4'
                }, {
                    type: NodeTypes.NumberLiteral,
                    value: '2'
                }]
            }]
        }]
    }


    const transformed = {
        type: 'Program',
        body: [{
            type: 'ExpressionStatement',
            expression: {
                type: 'CallExpression',
                callee: {
                    type: 'Identifier',
                    name: 'add'
                },
                arguments: [{
                    type: 'NumberLiteral',
                    value: '2'
                }, {
                    type: 'CallExpression',
                    callee: {
                        type: 'Identifier',
                        name: 'subtract'
                    },
                    arguments: [{
                        type: 'NumberLiteral',
                        value: '4'
                    }, {
                        type: 'NumberLiteral',
                        value: '2'
                    }]
                }]
            }
        }]
    }

    expect(transformer(origin)).toEqual(transformed)
})
