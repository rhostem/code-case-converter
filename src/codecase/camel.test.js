import { isCamel, splitCamel, convertToCamel } from './camel'
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
    expect(isCamel(CAMEL_SAMPLE)).toBe(true)
    expect(isCamel(CAMEL_WITH_NUM)).toBe(true)
    expect(isCamel('lastOne1')).toBe(true)
  })

  test('is not camel case', () => {
    expect(isCamel(PASCAL_SAMPLE)).toBe(false)
    expect(isCamel(CONSTANT_SAMPLE)).toBe(false)
    expect(isCamel(KEBAB_SAMPLE)).toBe(false)
    expect(isCamel(SNAKE_SAMPLE)).toBe(false)
  })

  test('separate word into array of lowercase', () => {
    expect(splitCamel(CAMEL_SAMPLE)).toEqual(WORDS_SAMPLE)
    expect(splitCamel(CAMEL_WITH_NUM)).toEqual(WORDS_WITH_NUM)
    expect(splitCamel('lastOne1')).toEqual(['last', 'one1'])
  })

  test('convert to camelcase', () => {
    expect(convertToCamel(WORDS_SAMPLE)).toBe(CAMEL_SAMPLE)
    expect(convertToCamel(['last', 'one1'])).toBe('lastOne1')
  })
})
