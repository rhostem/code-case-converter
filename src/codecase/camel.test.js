import { isCamelCase, splitCamelCase, convertToCamel } from './camel'
import * as R from 'ramda'
import {
  WORDS_SAMPLE,
  CAMEL_SAMPLE,
  CAMEL_WITH_NUM,
  PASCAL_SAMPLE,
  CONSTANT_SAMPLE,
  KEBAB_SAMPLE,
  SNAKE_SAMPLE,
} from './samples'

describe('camel case', () => {
  test('is camel case', () => {
    expect(isCamelCase(CAMEL_SAMPLE)).toBe(true)
    expect(isCamelCase(CAMEL_WITH_NUM)).toBe(true)
  })

  test('is not camel case', () => {
    expect(isCamelCase(SNAKE_SAMPLE)).toBe(false)
    expect(isCamelCase(PASCAL_SAMPLE)).toBe(false)
    expect(isCamelCase(CONSTANT_SAMPLE)).toBe(false)
    expect(isCamelCase(KEBAB_SAMPLE)).toBe(false)
    expect(isCamelCase(SNAKE_SAMPLE)).toBe(false)
  })

  test('separate word into array of lowercase', () => {
    expect(R.equals(WORDS_SAMPLE, splitCamelCase(CAMEL_SAMPLE))).toBe(true)
  })

  test('convert to camelcase', () => {
    expect(convertToCamel(WORDS_SAMPLE)).toBe(CAMEL_SAMPLE)
  })
})
