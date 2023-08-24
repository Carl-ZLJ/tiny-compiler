import { EOL } from "./types"
import { Token, TokenTypes } from "./types"

let tokens: Token[]
let currentName: string = ''
let currentNum: string = ''

export function tokenizer(input: string): Token[] {
    tokens = []
    match(input)
    return tokens
}

function match(input: string) {
    let state = start
    for (let c of input) {
        state = state(c)
    }
    state = state(EOL)
}

function emit(token: Token) {
    tokens.push(token)
    if (token.type == TokenTypes.Name) {
        currentName = ''
    }
    if (token.type == TokenTypes.Num) {
        currentNum = ''
    }
}

function start(c: string | symbol): any {
    if (typeof c === 'symbol' && c == EOL) {
        return
    }

    if (typeof c === 'string') {
        if (c == '(' || c == ')') {
            return paren(c)
        } 
        if (c.match(/^[a-zA-Z]$/)) {
            return name(c)
        } 
        if (c.match(/^[0-9]$/)) {
            return num(c)
        } 
        if (c.match(/^[ \n\t\f]$/)) {
            return start
        }
    }
}

function paren(c: string) {
    emit({
        type: TokenTypes.Paren,
        value: c,
    })

    return start
}

function name(c: string | symbol) {
    if (c == ' ' || c == EOL) {
        emit({
            type: TokenTypes.Name,
            value: currentName,
        })
        return start(c)
    } else if (typeof c === 'string') {
        currentName += c
        return name
    }
}

function num(c: string | symbol) {
    if (c == ' ' || c == EOL || c == ')') {
        emit({
            type: TokenTypes.Num,
            value: currentNum,
        })
        return start(c)
    } else if (typeof c === 'string') {
        currentNum += c
        return num
    }
}