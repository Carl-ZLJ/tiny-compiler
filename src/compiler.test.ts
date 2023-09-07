import { expect, test } from 'vitest'
import { compiler } from './compiler'

test('compiler', () => {
    const input = '(add 2 (subtract 4 2))'
    expect(compiler(input)).toEqual('add(2, subtract(4, 2));')
})


