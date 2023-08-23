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

export interface RootNode extends Node {
    body: NumberLiteralNode[]
}

export interface NumberLiteralNode extends Node {
    value: string
}