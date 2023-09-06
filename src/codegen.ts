export enum Types {
    Program = 'Program',
    ExpressionStatement = 'ExpressionStatement',
    CallExpression = 'CallExpression',
    Identifier = 'Identifier',
    NumberLiteral = 'NumberLiteral',
    StringLiteral = 'StringLiteral',
}

type Node = {
    type: Types
}

export type Nodes =
    | Program
    | Expression
    | CallExpression
    | Identifier
    | NumberLiteral
    | StringLiteral

export interface StringLiteral extends Node {
    type: Types.StringLiteral,
    value: string
}

export interface NumberLiteral extends Node {
    type: Types.NumberLiteral,
    value: string
}

export interface Identifier extends Node {
    type: Types.Identifier,
    name: string
}

export interface CallExpression extends Node {
    type: Types.CallExpression
    callee: Identifier
    arguments: (NumberLiteral| CallExpression)[]
}

export interface Expression extends Node {
    type: Types.ExpressionStatement,
    expression: CallExpression
}

export interface Program extends Node {
    type: Types.Program,
    body: Expression[]
}

export function codeGenerator(node: Nodes): string {

    switch (node.type) {
        case Types.Program:
            return node.body.map(codeGenerator).join('\n')

        case Types.ExpressionStatement:
            return (
                codeGenerator(node.expression) + ';'
            )

        case Types.CallExpression:
            return (
                codeGenerator(node.callee) +
                '(' +
                node.arguments.map(codeGenerator).join(', ') +
                ')'
            )

        case Types.Identifier:
            return node.name

        case Types.NumberLiteral:
            return node.value

        case Types.StringLiteral:
            return '"' + node.value + '"'

        default:
            throw new TypeError(node)
    }
}
