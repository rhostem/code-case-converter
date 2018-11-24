import { isKebabCase, splitKebabCase, convertToKebab } from './kebab'
import {
  WORDS_SAMPLE,
  WORDS_WITH_NUM,
  CAMEL_SAMPLE,
  PASCAL_SAMPLE,
  CONSTANT_SAMPLE,
  KEBAB_WITH_NUM,
  KEBAB_SAMPLE,
  SNAKE_SAMPLE,
} from './samples'

describe('kebab case', () => {
  test('is kebab case', () => {
    expect(isKebabCase(KEBAB_SAMPLE)).toBe(true)
    expect(isKebabCase(KEBAB_WITH_NUM)).toBe(true)
    expect(isKebabCase('last-one-1')).toBe(true)
  })

  test('is not kebab case', () => {
    expect(isKebabCase(CAMEL_SAMPLE)).toBe(false)
    expect(isKebabCase(PASCAL_SAMPLE)).toBe(false)
    expect(isKebabCase(CONSTANT_SAMPLE)).toBe(false)
    expect(isKebabCase(SNAKE_SAMPLE)).toBe(false)
  })

  test('separate kebab case string into array of lowercase', () => {
    expect(splitKebabCase(KEBAB_SAMPLE)).toEqual(WORDS_SAMPLE)
    expect(splitKebabCase(KEBAB_WITH_NUM)).toEqual(WORDS_WITH_NUM)
    expect(splitKebabCase('last-one-1')).toEqual(['last', 'one', '1'])
  })

  test('convert to kebabcase', () => {
    expect(convertToKebab(WORDS_SAMPLE)).toBe(KEBAB_SAMPLE)
    expect(convertToKebab(['last', 'one', '1'])).toBe('last-one-1')
  })
})
