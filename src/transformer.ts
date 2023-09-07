import { traverser } from "./traverser";
import { RootNode, Visitor, Program, CallExpression, TransformedNodeTypes, NodeTypes } from "./types";

export function transformer(ast: RootNode) {
    let newAst: Program = {
        type: TransformedNodeTypes.Program,
        body: []
    }

    ast._context = newAst.body

    const visitors: Visitor = {
        CallExpression: {
            enter(node, parent) {
                let expression: CallExpression
                expression = {
                    type: TransformedNodeTypes.CallExpression,
                    callee: {
                        type: TransformedNodeTypes.Identifier,
                        name: node.name,
                    },
                    arguments: [],
                }

                node._context = expression.arguments

                if (parent.type !== NodeTypes.CallExpression) {
                    parent._context?.push({
                        type: TransformedNodeTypes.ExpressionStatement,
                        expression: expression,
                    })
                } else {
                    parent._context?.push(expression)
                }

            },
        },
        NumberLiteral: {
            enter(node, parent) {
                parent._context?.push({
                    type: TransformedNodeTypes.NumberLiteral,
                    value: node.value,
                })
            },
        },
        StringLiteral: {
            enter(node, parent) {
                parent._context?.push({
                    type: TransformedNodeTypes.StringLiteral,
                    value: node.value,
                })

            },
        }
    }

    traverser(ast, visitors)

    return newAst
}
