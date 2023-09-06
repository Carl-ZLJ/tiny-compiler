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
    Program = 'Program',
}

export type Nodes =
    | NumberLiteralNode
    | CallExpressionNode
    | StringLiteralNode
    | RootNode

export interface RootNode {
    type: NodeTypes.Program
    body: ChildNode[]
    _context?: ChildNode[]
}

export interface NumberLiteralNode {
    type: NodeTypes.NumberLiteral
    value: string
}

export interface StringLiteralNode {
    type: NodeTypes.StringLiteral
    value: string
}

export interface CallExpressionNode {
    type: NodeTypes.CallExpression
    name: string
    params: ChildNode[]
    _context?: ChildNode[]
}

export type ChildNode = CallExpressionNode | NumberLiteralNode | StringLiteralNode;

export type Parent = RootNode | CallExpressionNode | null;

type Method<N, P> = (node: N, parent: P) => void;

export interface VisitorFunc<N, P> {
    enter: Method<N, P>
    exit?: Method<N, P>
}

export interface Visitor {
    Program?: ProgramVisitor
    NumberLiteral?: NumberLiteralVisitor
    StringLiteral?: StringLiteralVisitor
    CallExpression?: CallExpressionVisitor
}

type ProgramVisitor = VisitorFunc<RootNode, null>
type NumberLiteralVisitor = VisitorFunc<NumberLiteralNode, CallExpressionNode>
type StringLiteralVisitor = VisitorFunc<StringLiteralNode, CallExpressionNode>
type CallExpressionVisitor = VisitorFunc<CallExpressionNode, RootNode | CallExpressionNode>

