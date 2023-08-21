export enum TokenTypes {
    Paren = 'paren',
    Name = 'name',
    Num = 'number',
}


export interface Token {
    type: TokenTypes
    value: string
}


export function tokenizer(input: string): Token[] {
    const tokens: Token[] = []
    let current = 0

    while (current < input.length) {
        let char = input[current]
        if (char === '(') {
            tokens.push({
                type: TokenTypes.Paren,
                value: '(',
            })
            current++
            continue
        }

        if (char === ')') {
            tokens.push({
                type: TokenTypes.Paren,
                value: ')',
            })
            current++
            continue
        }


        if (char.match(/\s/)) {
            current++
            continue
        }

        const Letter = /[a-z]/i
        if (Letter.test(char)) {
            let value = ''
            while (Letter.test(char) && current < input.length) {
                value += char
                current++
                char = input[current]
            }
            tokens.push({
                type: TokenTypes.Name,
                value,
            })
        }

        const Num = /[0-9]/
        if (Num.test(char)) {
            let value = ''
            while (Num.test(char) && current < input.length) {
                value += char
                current++
                char = input[current]
            }
            tokens.push({
                type: TokenTypes.Num,
                value,
            })
        }
    }
    
    return tokens
}