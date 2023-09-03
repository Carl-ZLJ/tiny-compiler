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


export interface RootNode extends Node {
    type: NodeTypes.Root
    body: ChildNode[]
    _context?: ChildNode[]
}

export interface NumberLiteralNode extends Node {
    type: NodeTypes.NumberLiteral
    value: string
}


export interface StringLiteralNode extends Node {
    type: NodeTypes.StringLiteral
    value: string
}

export interface CallExpressionNode extends Node {
    type: NodeTypes.CallExpression
    name: string
    params: ChildNode[]
    _context?: ChildNode[]
}

export type ChildNode = CallExpressionNode | NumberLiteralNode | StringLiteralNode;

type Method<N, P> = (node: N, parent: P) => void;
interface VisitorFunc<N, P> {
    enter: Method<N, P>    
    exit?: Method<N, P>
}

export interface Visitor {
    Program?: VisitorFunc<RootNode, null>
    NumberLiteral?: VisitorFunc<NumberLiteralNode, CallExpressionNode>
    StringLiteral?: VisitorFunc<StringLiteralNode, CallExpressionNode>
    CallExpression?: VisitorFunc<CallExpressionNode, CallExpressionNode | RootNode>
}
