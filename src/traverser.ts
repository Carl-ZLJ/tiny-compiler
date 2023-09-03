import { ChildNode, NodeTypes, RootNode, Visitor } from "./types";


export function traverser(ast: RootNode, visitors: Visitor) {

    function traverseNode(node: RootNode | ChildNode, parent: RootNode | ChildNode | null) {
        let methods = visitors[node.type]

        if (methods && methods.enter) {
            methods.enter(node, parent)
        }

        if (node.type === NodeTypes.NumberLiteral) {
        } else if (node.type === NodeTypes.CallExpression) {
            traverseArray(node.params, node)
        } else if (node.type === NodeTypes.Root) {
            traverseArray(node.body, node)
        }

        if (methods && methods.exit) {
            methods.exit(node, parent)
        }
    }

    function traverseArray(nodes: ChildNode[], parent: RootNode | ChildNode | null) {
        nodes.forEach(n => {
            traverseNode(n, parent)
        })
    }

    traverseNode(ast, null)
}

