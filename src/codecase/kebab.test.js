import { isKebabCase, splitKebabCase, convertToKebab } from './kebab'
import * as R from 'ramda'
import {
  WORDS_SAMPLE,
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
  })

  test('is not kebab case', () => {
    expect(isKebabCase(CAMEL_SAMPLE)).toBe(false)
    expect(isKebabCase(PASCAL_SAMPLE)).toBe(false)
    expect(isKebabCase(CONSTANT_SAMPLE)).toBe(false)
    expect(isKebabCase(SNAKE_SAMPLE)).toBe(false)
  })

  test('separate kebab case string into array of lowercase', () => {
    expect(WORDS_SAMPLE).toEqual(splitKebabCase(KEBAB_SAMPLE))
  })

  test('convert to kebabcase', () => {
    expect(convertToKebab(WORDS_SAMPLE)).toBe(KEBAB_SAMPLE)
  })
})
