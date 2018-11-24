import { isPascalCase, splitPascalCase, convertToPascal } from './pascal'
import {
  WORDS_SAMPLE,
  WORDS_WITH_NUM,
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
    expect(isPascalCase('LastOne1')).toBe(true)
  })

  test('is not pascal', () => {
    expect(isPascalCase(CAMEL_SAMPLE)).toBe(false)
    expect(isPascalCase(SNAKE_SAMPLE)).toBe(false)
    expect(isPascalCase(CONSTANT_SAMPLE)).toBe(false)
    expect(isPascalCase(KEBAB_SAMPLE)).toBe(false)
  })

  test('separate word into array of lowercase', () => {
    expect(splitPascalCase(PASCAL_SAMPLE)).toEqual(WORDS_SAMPLE)
    expect(splitPascalCase(PASCAL_WITH_NUM)).toEqual(WORDS_WITH_NUM)
    expect(splitPascalCase('LastOne1')).toEqual(['last', 'one1'])
  })

  test('convert to camel case', () => {
    expect(convertToPascal(WORDS_SAMPLE)).toBe(PASCAL_SAMPLE)
    expect(convertToPascal(['last', 'one1'])).toBe('LastOne1')
  })
})
