import { CallExpression, Expression, Program, Types } from "./codegen";
import { traverser } from "./traverser";
import { NodeTypes, RootNode, Visitor } from "./types";

export function transformer(ast: RootNode) {
    let newAst: Program = {
        type: Types.Program,
        body: []
    }

    ast._context = newAst.body

    const visitors: Visitor = {
        CallExpression: {
            enter(node, parent) {
                let expression: CallExpression
                expression = {
                    type: Types.CallExpression,
                    callee: {
                        type: Types.Identifier,
                        name: node.name,
                    },
                    arguments: [],
                }

                node._context = expression.arguments

                if (parent.type !== NodeTypes.CallExpression) {
                    parent._context?.push({
                        type: Types.ExpressionStatement,
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
                    type: Types.NumberLiteral,
                    value: node.value,
                })
            },
        },
        StringLiteral: {
            enter(node, parent) {
                parent._context?.push({
                    type: Types.StringLiteral,
                    value: node.value,
                })

            },
        }
    }

    traverser(ast, visitors)

    return newAst
}
