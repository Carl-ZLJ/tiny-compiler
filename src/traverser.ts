import { ChildNode, NodeTypes, Nodes, Parent, RootNode, Visitor, VisitorFunc } from "./types";


export function traverser(ast: RootNode, visitor: Visitor) {

    function traverseNode<T extends Nodes>(node: T, parent: Parent) {
        let methods = visitor[node.type]!

        methods?.enter(node, parent)
        if (node.type === NodeTypes.NumberLiteral) {
        } else if (node.type === NodeTypes.StringLiteral) {
        } else if (node.type === NodeTypes.CallExpression) {
            traverseArray(node.params, node)
        } else if (node.type === NodeTypes.Program) {
            traverseArray(node.body, node)
        }

        methods?.exit?.(node, parent)

    }

    function traverseArray(nodes: ChildNode[], parent: Parent) {
        nodes.forEach(n => {
            traverseNode(n, parent)
        })
    }

    traverseNode(ast, null)
}

