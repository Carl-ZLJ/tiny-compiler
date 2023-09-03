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
    StringLiteral = 'StringLiteral',
    Root = 'Program',
}

export type Node = {
    type: NodeTypes
}

export type ChildNode = CallExpressionNode | NumberLiteralNode

export interface RootNode extends Node {
    type: NodeTypes.Root
    body: ChildNode[]
}

export interface NumberLiteralNode extends Node {
    type: NodeTypes.NumberLiteral
    value: string
}

export interface CallExpressionNode extends Node {
    type: NodeTypes.CallExpression
    name: string
    params: ChildNode[]
}

interface VisitorFunc {
    enter(node: ChildNode | RootNode, parent: ChildNode | RootNode | null): void;
    exit(node: ChildNode | RootNode, parent: ChildNode | RootNode | null): void;
}

export interface Visitor {
    Program: VisitorFunc
    NumberLiteral: VisitorFunc
    StringLiteral: VisitorFunc
    CallExpression: VisitorFunc
}
