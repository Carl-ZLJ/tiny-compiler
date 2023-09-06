import { expect, test } from 'vitest'
import { Program, Types, codeGenerator } from './codegen'

test('code generator', () => {
    const ast: Program = {
        type: Types.Program,
        body: [{
            type: Types.ExpressionStatement,
            expression: {
                type: Types.CallExpression,
                callee: {
                    type: Types.Identifier,
                    name: 'add'
                },
                arguments: [{
                    type: Types.NumberLiteral,
                    value: '2'
                }, {
                    type: Types.CallExpression,
                    callee: {
                        type: Types.Identifier,
                        name: 'subtract'
                    },
                    arguments: [{
                        type: Types.NumberLiteral,
                        value: '4'
                    }, {
                        type: Types.NumberLiteral,
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
        type: Types.Program,
        body: [{
            type: Types.ExpressionStatement,
            expression: {
                type: Types.CallExpression,
                callee: {
                    type: Types.Identifier,
                    name: 'add'
                },
                arguments: [{
                    type: Types.NumberLiteral,
                    value: '2'
                }, {
                    type: Types.CallExpression,
                    callee: {
                        type: Types.Identifier,
                        name: 'subtract'
                    },
                    arguments: [{
                        type: Types.NumberLiteral,
                        value: '4'
                    }, {
                        type: Types.NumberLiteral,
                        value: '2'
                    }]
                }]
            }
        }, {
            type: Types.ExpressionStatement,
            expression: {
                type: Types.CallExpression,
                callee: {
                    type: Types.Identifier,
                    name: 'add'
                },
                arguments: [{
                    type: Types.NumberLiteral,
                    value: '2'
                }, {
                    type: Types.NumberLiteral,
                    value: '2'
                }]
            }
        }]
    }

    expect(codeGenerator(ast)).toEqual('add(2, subtract(4, 2));\nadd(2, 2);')
})

