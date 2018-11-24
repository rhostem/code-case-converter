import { isPascalCase, splitPascalCase, convertToPascal } from './pascal'
import * as R from 'ramda'
import {
  WORDS_SAMPLE,
  CAMEL_SAMPLE,
  PASCAL_WITH_NUM,
  PASCAL_SAMPLE,
  CONSTANT_SAMPLE,
  KEBAB_SAMPLE,
  SNAKE_SAMPLE,
} from './samples'

describe('pascal', () => {
  test('is pascal', () => {
    expect(isPascalCase(PASCAL_SAMPLE)).toBe(true)
    expect(isPascalCase(PASCAL_WITH_NUM)).toBe(true)
  })

  test('is not pascal', () => {
    expect(isPascalCase(CAMEL_SAMPLE)).toBe(false)
    expect(isPascalCase(SNAKE_SAMPLE)).toBe(false)
    expect(isPascalCase(CONSTANT_SAMPLE)).toBe(false)
    expect(isPascalCase(KEBAB_SAMPLE)).toBe(false)
  })

  test('separate word into array of lowercase', () => {
    expect(R.equals(WORDS_SAMPLE, splitPascalCase(PASCAL_SAMPLE))).toBe(true)
  })

  test('convert to camel case', () => {
    expect(convertToPascal(WORDS_SAMPLE)).toBe(PASCAL_SAMPLE)
  })
})
