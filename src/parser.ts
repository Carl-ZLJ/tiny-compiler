import { EOL } from "./tokenizer";
import { CallExpressionNode, NodeTypes, NumberLiteralNode, RootNode, Token, TokenTypes } from "./types";


function createRootNode(): RootNode {
    return {
        type: NodeTypes.Root,
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

function expressionStart(t: Token) {
    const n = createCallExpressionNode(t.value)
    currentNode.push(n)
    currentNode = n.params
    return paramsStart
}

function paramsStart(t: any) {
    if (t == EOL) {
        return
    } else if (t.type == TokenTypes.Num) {
        const n = createNumberNode(t.value)
        currentNode.push(n)
        return paramsStart
    } else if (t.type == TokenTypes.Paren) {
        return walk
    }
}


function number(t: Token) {
    const n = createNumberNode(t.value)
    currentNode.push(n)
    return walk
}

function walk(t: any): any {
    if (t.type == TokenTypes.Paren) {
        return walk
    }
    if (t.type == TokenTypes.Name) {
        return expressionStart(t)
    }
    if (t.type == TokenTypes.Num) {
        return number(t)
    } 
    return
}

let rootNode: RootNode
let currentNode: any
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