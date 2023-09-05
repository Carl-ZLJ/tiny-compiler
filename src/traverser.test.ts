import { expect, test } from 'vitest'

import { CallExpressionNode, NodeTypes, NumberLiteralNode, RootNode, Visitor } from './types'

import { traverser } from './traverser'


test('traverser', () => {
    const ast: RootNode = {
        type: NodeTypes.Program,
        body: [{
            type: NodeTypes.CallExpression,
            name: 'add',
            params: [{
                type: NodeTypes.NumberLiteral,
                value: '2',
            }, {
                type: NodeTypes.CallExpression,
                name: 'subtract',
                params: [{
                    type: NodeTypes.NumberLiteral,
                    value: '4',
                }, {
                    type: NodeTypes.NumberLiteral,
                    value: '2',
                }]
            }]
        }]
    }
    const seqs: string[] = []
    const visitors: Visitor = {
        Program: {
            enter(_node, _parent) {
                seqs.push('Program enter')
            },
            exit(_node, _parent) {
                seqs.push('Program exit')
            },
        },

        CallExpression: {
            enter(node, parent) {
                seqs.push((node as CallExpressionNode).name + ' CallExpression enter ' + parent?.type)
            },
            exit(node, parent) {
                seqs.push((node as CallExpressionNode).name + ' CallExpression exit ' + parent?.type)
            },
        },

        NumberLiteral: {
            enter(node, parent) {
                seqs.push('NumberLiteral enter ' + (node as NumberLiteralNode).value + ' ' + (parent as CallExpressionNode)!.name)
            },
            exit(node, parent) {
                seqs.push('NumberLiteral exit ' + (node as NumberLiteralNode).value + ' ' + (parent as CallExpressionNode)!.name)
            },
        },

        StringLiteral: {
            enter(_node, _parent) {
                seqs.push('StringLiteral enter')
            },
            exit(_node, _parent) {
                seqs.push('StringLiteral exit')
            },
        }

    }
    traverser(ast, visitors)
    expect(seqs).toEqual([
        'Program enter',
        'add CallExpression enter Program',
        'NumberLiteral enter 2 add',
        'NumberLiteral exit 2 add',
        'subtract CallExpression enter CallExpression',
        'NumberLiteral enter 4 subtract',
        'NumberLiteral exit 4 subtract',
        'NumberLiteral enter 2 subtract',
        'NumberLiteral exit 2 subtract',
        'subtract CallExpression exit CallExpression',
        'add CallExpression exit Program',
        'Program exit',
    ])
})

