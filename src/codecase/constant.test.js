import {
  isConstantCase,
  splitConstantCase,
  convertToConstant,
} from './constant'
import * as R from 'ramda'
import {
  WORDS_SAMPLE,
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
  })

  test('is not constant case', () => {
    expect(isConstantCase(CAMEL_SAMPLE)).toBe(false)
    expect(isConstantCase(PASCAL_SAMPLE)).toBe(false)
    expect(isConstantCase(KEBAB_SAMPLE)).toBe(false)
    expect(isConstantCase(SNAKE_SAMPLE)).toBe(false)
  })

  test('separate word into array of lowercase', () => {
    expect(R.equals(WORDS_SAMPLE, splitConstantCase(CONSTANT_SAMPLE))).toBe(
      true
    )
  })

  test('convert to constantcase', () => {
    expect(convertToConstant(WORDS_SAMPLE)).toBe(CONSTANT_SAMPLE)
  })
})
