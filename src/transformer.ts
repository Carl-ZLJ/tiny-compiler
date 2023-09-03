import { traverser } from "./traverser";
import { NodeTypes, RootNode, Visitor } from "./types";

export function transformer(ast: RootNode) {
    let newAst = {
        type: NodeTypes.Root,
        body: []
    }

    ast._context = newAst.body

    const visitors: Visitor = {
        CallExpression: {
            enter(node, parent) {
                let expression: any = {
                    type: 'CallExpression',
                    callee: {
                        type: 'Identifier',
                        name: node.name,
                    },
                    arguments: [],
                }

                node._context = expression.arguments

                if (parent.type !== NodeTypes.CallExpression) {
                    expression = {
                        type: 'ExpressionStatement',
                        expression: expression,
                    }
                }

                parent._context?.push(expression)
            },
        },
        NumberLiteral: {
            enter(node, parent) {
                parent._context?.push({
                    type: NodeTypes.NumberLiteral,
                    value: node.value,
                })
            },
        },
        StringLiteral: {
            enter(node, parent) {
                parent._context?.push({
                    type: NodeTypes.StringLiteral,
                    value: node.value,
                })

            },
        }
    }

    traverser(ast, visitors)

    return newAst
}
