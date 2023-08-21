
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

    if (input[current] === '(') {
        tokens.push({
            type: TokenTypes.Paren,
            value: '(',
        })
    }

    if (input[current] === ')') {
        tokens.push({
            type: TokenTypes.Paren,
            value: ')',
        })
    }

    const Letter = /[a-z]/i
    if (Letter.test(input[current])) {
        let value = ''
        while (Letter.test(input[current]) && current < input.length) {
            value += input[current]
            current++
        }
        tokens.push({
            type: TokenTypes.Name,
            value,
        })
    }

    const Num = /[0-9]/
    if (Num.test(input[current])) {
        let value = ''
        while (Num.test(input[current]) && current < input.length) {
            value += input[current]
            current++
        }
        tokens.push({
            type: TokenTypes.Num,
            value,
        })
    }

    return tokens
}