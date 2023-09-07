import { expect, test } from 'vitest'
import { Program, TransformedNodeTypes } from './types'
import { codeGenerator } from './codegen'

test('code generator', () => {
    const ast: Program = {
        type: TransformedNodeTypes.Program,
        body: [{
            type: TransformedNodeTypes.ExpressionStatement,
            expression: {
                type: TransformedNodeTypes.CallExpression,
                callee: {
                    type: TransformedNodeTypes.Identifier,
                    name: 'add'
                },
                arguments: [{
                    type: TransformedNodeTypes.NumberLiteral,
                    value: '2'
                }, {
                    type: TransformedNodeTypes.CallExpression,
                    callee: {
                        type: TransformedNodeTypes.Identifier,
                        name: 'subtract'
                    },
                    arguments: [{
                        type: TransformedNodeTypes.NumberLiteral,
                        value: '4'
                    }, {
                        type: TransformedNodeTypes.NumberLiteral,
                        value: '2'
                    }]
                }]
            }
        }]
    }
    expect(codeGenerator(ast)).toEqual('add(2, subtract(4, 2));')
})

test('code generator double', () => {
    const ast: Program = {
        type: TransformedNodeTypes.Program,
        body: [{
            type: TransformedNodeTypes.ExpressionStatement,
            expression: {
                type: TransformedNodeTypes.CallExpression,
                callee: {
                    type: TransformedNodeTypes.Identifier,
                    name: 'add'
                },
                arguments: [{
                    type: TransformedNodeTypes.NumberLiteral,
                    value: '2'
                }, {
                    type: TransformedNodeTypes.CallExpression,
                    callee: {
                        type: TransformedNodeTypes.Identifier,
                        name: 'subtract'
                    },
                    arguments: [{
                        type: TransformedNodeTypes.NumberLiteral,
                        value: '4'
                    }, {
                        type: TransformedNodeTypes.NumberLiteral,
                        value: '2'
                    }]
                }]
            }
        }, {
            type: TransformedNodeTypes.ExpressionStatement,
            expression: {
                type: TransformedNodeTypes.CallExpression,
                callee: {
                    type: TransformedNodeTypes.Identifier,
                    name: 'add'
                },
                arguments: [{
                    type: TransformedNodeTypes.NumberLiteral,
                    value: '2'
                }, {
                    type: TransformedNodeTypes.NumberLiteral,
                    value: '2'
                }]
            }
        }]
    }

    expect(codeGenerator(ast)).toEqual('add(2, subtract(4, 2));\nadd(2, 2);')
})

