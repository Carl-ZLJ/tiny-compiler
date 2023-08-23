import { NodeTypes, NumberLiteralNode, RootNode, Token, TokenTypes } from "./types";


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

export function parser(tokens: Token[]) {
    const current = 0
    const currentToken = tokens[current]
    const rootNode = createRootNode()

    if (currentToken.type == TokenTypes.Num) {
        const n = createNumberNode(currentToken.value)
        rootNode.body.push(n)
    }

    return rootNode
}