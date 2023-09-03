import { expect, test } from 'vitest'
import { NodeTypes, RootNode, Visitor } from './types'
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
            enter(node, parent) {
                seqs.push('Program enter')
            },
            exit(node, parent) {
                seqs.push('Program exit')
            },
        },

        CallExpression: {
            enter(node, parent) {
                seqs.push('CallExpression enter')
            },
            exit(node, parent) {
                seqs.push('CallExpression exit')
            },
        },

        NumberLiteral: {
            enter(node, parent) {
                seqs.push('NumberLiteral enter')
            },
            exit(node, parent) {
                seqs.push('NumberLiteral exit')
            },
        },

        StringLiteral: {
            enter(node, parent) {
                seqs.push('StringLiteral enter')
            },
            exit(node, parent) {
                seqs.push('StringLiteral exit')
            },
        }

    }
    traverser(ast, visitors)
    expect(seqs).toEqual([
        'Program enter',
        'CallExpression enter',
        'NumberLiteral enter',
        'NumberLiteral exit',
        'CallExpression enter',
        'NumberLiteral enter',
        'NumberLiteral exit',
        'NumberLiteral enter',
        'NumberLiteral exit',
        'CallExpression exit',
        'CallExpression exit',
        'Program exit',
    ])
})

