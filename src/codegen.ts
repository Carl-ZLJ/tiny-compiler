import { TransformedNodeTypes, TransformedNodes } from "./types"

export function codeGenerator(node: TransformedNodes): string {

    switch (node.type) {
        case TransformedNodeTypes.Program:
            return node.body.map(codeGenerator).join('\n')

        case TransformedNodeTypes.ExpressionStatement:
            return (
                codeGenerator(node.expression) + ';'
            )

        case TransformedNodeTypes.CallExpression:
            return (
                codeGenerator(node.callee) +
                '(' +
                node.arguments.map(codeGenerator).join(', ') +
                ')'
            )

        case TransformedNodeTypes.Identifier:
            return node.name

        case TransformedNodeTypes.NumberLiteral:
            return node.value

        case TransformedNodeTypes.StringLiteral:
            return '"' + node.value + '"'

        default:
            throw new TypeError(node)
    }
}
