import { codeGenerator } from "./codegen";
import { parser } from "./parser";
import { tokenizer } from "./tokenizer";
import { transformer } from "./transformer";

export function compiler(input: string) {
    const tokens = tokenizer(input)
    const ast = parser(tokens)
    const transformedAst = transformer(ast)
    return codeGenerator(transformedAst)
}
