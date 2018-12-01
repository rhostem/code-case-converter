import { isConstant, splitConstant, convertToConstant } from './constant'

import {
  WORDS_SAMPLE,
  WORDS_WITH_NUM,
  CAMEL_SAMPLE,
  PASCAL_SAMPLE,
  CONSTANT_SAMPLE,
  CONSTANT_WITH_NUM,
  KEBAB_SAMPLE,
  SNAKE_SAMPLE,
} from './samples'

describe('constant case', () => {
  test('is constant case', () => {
    expect(isConstant(CONSTANT_SAMPLE)).toBe(true)
    expect(isConstant(CONSTANT_WITH_NUM)).toBe(true)
    expect(isConstant('LAST_ONE_1')).toBe(true)
  })

  test('is not constant case', () => {
    expect(isConstant(CAMEL_SAMPLE)).toBe(false)
    expect(isConstant(PASCAL_SAMPLE)).toBe(false)
    expect(isConstant(KEBAB_SAMPLE)).toBe(false)
    expect(isConstant(SNAKE_SAMPLE)).toBe(false)
  })

  test('separate word into array of lowercase', () => {
    expect(splitConstant(CONSTANT_SAMPLE)).toEqual(WORDS_SAMPLE)
    expect(splitConstant(CONSTANT_WITH_NUM)).toEqual(WORDS_WITH_NUM)
    expect(splitConstant('LAST_ONE_1')).toEqual(['last', 'one', '1'])
  })

  test('convert to constantcase', () => {
    expect(convertToConstant(WORDS_SAMPLE)).toBe(CONSTANT_SAMPLE)
    expect(convertToConstant(['last', 'one', '1'])).toBe('LAST_ONE_1')
  })
})
