import { isCamelCase, splitCamelCase, convertToCamel } from './camel'
import {
  WORDS_SAMPLE,
  WORDS_WITH_NUM,
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
    expect(isCamelCase('lastOne1')).toBe(true)
  })

  test('is not camel case', () => {
    expect(isCamelCase(PASCAL_SAMPLE)).toBe(false)
    expect(isCamelCase(CONSTANT_SAMPLE)).toBe(false)
    expect(isCamelCase(KEBAB_SAMPLE)).toBe(false)
    expect(isCamelCase(SNAKE_SAMPLE)).toBe(false)
  })

  test('separate word into array of lowercase', () => {
    expect(splitCamelCase(CAMEL_SAMPLE)).toEqual(WORDS_SAMPLE)
    expect(splitCamelCase(CAMEL_WITH_NUM)).toEqual(WORDS_WITH_NUM)
    expect(splitCamelCase('lastOne1')).toEqual(['last', 'one1'])
  })

  test('convert to camelcase', () => {
    expect(convertToCamel(WORDS_SAMPLE)).toBe(CAMEL_SAMPLE)
    expect(convertToCamel(['last', 'one1'])).toBe('lastOne1')
  })
})
