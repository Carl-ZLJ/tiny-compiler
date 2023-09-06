import { ChildNode, NodeTypes, Nodes, Parent, RootNode, Visitor, VisitorFunc } from "./types";


export function traverser(ast: RootNode, visitor: Visitor) {

    function traverseNode(node: Nodes, parent: Parent) {
        let methodName = `${node.type}` as keyof Visitor
        let methods = visitor[methodName] as VisitorFunc<typeof node, Parent>

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

