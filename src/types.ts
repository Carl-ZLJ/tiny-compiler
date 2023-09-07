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
    _context?: Expression[]
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
    _context?: (CallExpression | NumberLiteral | StringLiteral)[]
}

export type ChildNode = CallExpressionNode | NumberLiteralNode | StringLiteralNode;

export type Parent = RootNode | CallExpressionNode | null;

type Method<N, P> = (node: N, parent: P) => void;

export interface VisitorFunc<N, P> {
    enter: Method<N, P>
    exit?: Method<N, P>
}

type ProgramVisitor = VisitorFunc<RootNode, null>
type NumberLiteralVisitor = VisitorFunc<NumberLiteralNode, CallExpressionNode>
type StringLiteralVisitor = VisitorFunc<StringLiteralNode, CallExpressionNode>
type CallExpressionVisitor = VisitorFunc<CallExpressionNode, RootNode | CallExpressionNode>

export interface Visitor {
    Program?: ProgramVisitor
    NumberLiteral?: NumberLiteralVisitor
    StringLiteral?: StringLiteralVisitor
    CallExpression?: CallExpressionVisitor
}

export enum TransformedNodeTypes {
    Program = 'Program',
    ExpressionStatement = 'ExpressionStatement',
    CallExpression = 'CallExpression',
    Identifier = 'Identifier',
    NumberLiteral = 'NumberLiteral',
    StringLiteral = 'StringLiteral',
}

type Node = {
    type: TransformedNodeTypes
}

export type TransformedNodes =
    | Program
    | Expression
    | CallExpression
    | Identifier
    | NumberLiteral
    | StringLiteral

export interface StringLiteral extends Node {
    type: TransformedNodeTypes.StringLiteral,
    value: string
}

export interface NumberLiteral extends Node {
    type: TransformedNodeTypes.NumberLiteral,
    value: string
}

export interface Identifier extends Node {
    type: TransformedNodeTypes.Identifier,
    name: string
}

export interface CallExpression extends Node {
    type: TransformedNodeTypes.CallExpression
    callee: Identifier
    arguments: (NumberLiteral | CallExpression | StringLiteral)[]
}

export interface Expression extends Node {
    type: TransformedNodeTypes.ExpressionStatement,
    expression: CallExpression
}

export interface Program extends Node {
    type: TransformedNodeTypes.Program,
    body: Expression[]
}
