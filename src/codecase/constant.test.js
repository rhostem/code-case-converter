import {
  isConstantCase,
  splitConstantCase,
  convertToConstant,
} from './constant'

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
    expect(isConstantCase(CONSTANT_SAMPLE)).toBe(true)
    expect(isConstantCase(CONSTANT_WITH_NUM)).toBe(true)
    expect(isConstantCase('LAST_ONE_1')).toBe(true)
  })

  test('is not constant case', () => {
    expect(isConstantCase(CAMEL_SAMPLE)).toBe(false)
    expect(isConstantCase(PASCAL_SAMPLE)).toBe(false)
    expect(isConstantCase(KEBAB_SAMPLE)).toBe(false)
    expect(isConstantCase(SNAKE_SAMPLE)).toBe(false)
  })

  test('separate word into array of lowercase', () => {
    expect(splitConstantCase(CONSTANT_SAMPLE)).toEqual(WORDS_SAMPLE)
    expect(splitConstantCase(CONSTANT_WITH_NUM)).toEqual(WORDS_WITH_NUM)
    expect(splitConstantCase('LAST_ONE_1')).toEqual(['last', 'one', '1'])
  })

  test('convert to constantcase', () => {
    expect(convertToConstant(WORDS_SAMPLE)).toBe(CONSTANT_SAMPLE)
    expect(convertToConstant(['last', 'one', '1'])).toBe('LAST_ONE_1')
  })
})
