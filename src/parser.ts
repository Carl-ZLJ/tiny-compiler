import { EOL, NodeTypes } from "./types";
import { CallExpressionNode, NumberLiteralNode, RootNode, Token, TokenTypes } from "./types";

let rootNode: RootNode
let currentNode: unknown[]
export function parser(tokens: Token[]) {
    rootNode = createRootNode()
    currentNode = rootNode.body
    let state = walk
    for (let t of tokens) {
        state = state(t)
    }
    state = state(EOL)

    return rootNode
}

function walk(t: Token | symbol): any {
    if (typeof t === 'symbol' && t == EOL) {
        return
    }

    if (typeof t === 'object') {
        if (t.type == TokenTypes.Paren) {
            return program(t)
        }
        if (t.type == TokenTypes.Name) {
            return expression(t)
        }
        if (t.type == TokenTypes.Num) {
            return number(t)
        }
    }
}

function program(t: Token) {
    if (t.value == '(') {
        return expression
    } 
    if (t.value == ')') {
        currentNode = rootNode.body
        return walk
    }
}

function expression(t: Token) {
    const n = createCallExpressionNode(t.value)
    currentNode.push(n)
    currentNode = n.params
    return params
}

function params(t: Token | symbol) {
    if (typeof t === 'symbol' && t == EOL) {
        return
    }
    if (typeof t === 'object') {
        if (t.type == TokenTypes.Num) {
            const n = createNumberNode(t.value)
            currentNode.push(n)
            return params
        } 
        if (t.type == TokenTypes.Paren) {
            if (t.value == '(') {
                return expression
            }
            if (t.value == ')') {
                currentNode = rootNode.body
                return walk
            }
        }
    }
}

function number(t: Token) {
    const n = createNumberNode(t.value)
    currentNode.push(n)
    return walk
}

function createRootNode(): RootNode {
    return {
        type: NodeTypes.Program,
        body: [],
    }
}

function createNumberNode(value: string): NumberLiteralNode {
    return {
        type: NodeTypes.NumberLiteral,
        value,
    }
}

function createCallExpressionNode(name: string): CallExpressionNode {
    return {
        type: NodeTypes.CallExpression,
        name,
        params: [],
    }
}
