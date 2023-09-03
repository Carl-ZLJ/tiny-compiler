import { expect, test } from 'vitest'

import { CallExpressionNode, NodeTypes, NumberLiteralNode, RootNode, Visitor } from './types'

import { traverser } from './traverser'


test('traverser', () => {
    const ast: RootNode = {
        type: NodeTypes.Root,
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
                seqs.push(node.name + ' CallExpression enter ' + parent?.type)
            },
            exit(node: CallExpressionNode, parent) {
                seqs.push(node.name + ' CallExpression exit ' + parent?.type)
            },
        },

        NumberLiteral: {
            enter(node, parent) {
                seqs.push('NumberLiteral enter ' + node.value + ' ' + parent.name)
            },
            exit(node, parent) {
                seqs.push('NumberLiteral exit ' + node.value + ' ' + parent.name)
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

