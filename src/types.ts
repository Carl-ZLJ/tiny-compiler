export const EOL = Symbol('EOL');

export enum TokenTypes {
    Paren = 'paren',
    Name = 'name',
    Num = 'number'
}


export interface Token {
    type: TokenTypes;
    value: string;
}

export enum NodeTypes {
    NumberLiteral = 'NumberLiteral',
    CallExpression = 'CallExpression',
    Root = 'Program',
}

export type Node = {
    type: NodeTypes
}

type ChildNode = CallExpressionNode | NumberLiteralNode

export interface RootNode extends Node {
    body: ChildNode[]
}

export interface NumberLiteralNode extends Node {
    value: string
}

export interface CallExpressionNode extends Node {
    name: string
    params: ChildNode[]
}
