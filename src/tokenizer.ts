export enum TokenTypes {
    Paren = 'paren',
    Name = 'name',
    Num = 'number',
}


export interface Token {
    type: TokenTypes
    value: string
}

let EOL = Symbol('EOL')
let tokens: Token[] = []
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
    state = state(' ')
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

function start(c: any) {
    if (c == '(' || c == ')') {
        return paren(c)
    } else if (c.match(/^[a-zA-Z]$/)) {
        return name(c)
    } else if (c.match(/^[0-9]$/)) {
        return num(c)
    } else if (c.match(/^[ \n\t\f]$/)) {
        return start
    } else {
        return
    }
}

function paren(c: any): any {
    emit({
        type: TokenTypes.Paren,
        value: c,
    })

    return start
}

function name(c: any): any {
    if (c == ' ' || c == EOL || c == ')' || c == '(') {
        emit({
            type: TokenTypes.Name,
            value: currentName,
        })
        return start(c)
    } else {
        currentName += c
        return name
    }
}

function num(c: any): any {
    if (c == ' ' || c == EOL || c == ')' || c == '(') {
        emit({
            type: TokenTypes.Num,
            value: currentNum,
        })
        return start(c)
    } else {
        currentNum += c
        return num
    }
}