import { isPascal, splitPascal, convertToPascal } from './pascal'
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
    expect(isPascal(PASCAL_SAMPLE)).toBe(true)
    expect(isPascal(PASCAL_WITH_NUM)).toBe(true)
    expect(isPascal('LastOne1')).toBe(true)
  })

  test('is not pascal', () => {
    expect(isPascal(CAMEL_SAMPLE)).toBe(false)
    expect(isPascal(SNAKE_SAMPLE)).toBe(false)
    expect(isPascal(CONSTANT_SAMPLE)).toBe(false)
    expect(isPascal(KEBAB_SAMPLE)).toBe(false)
  })

  test('separate word into array of lowercase', () => {
    expect(splitPascal(PASCAL_SAMPLE)).toEqual(WORDS_SAMPLE)
    expect(splitPascal(PASCAL_WITH_NUM)).toEqual(WORDS_WITH_NUM)
    expect(splitPascal('LastOne1')).toEqual(['last', 'one1'])
  })

  test('convert to camel case', () => {
    expect(convertToPascal(WORDS_SAMPLE)).toBe(PASCAL_SAMPLE)
    expect(convertToPascal(['last', 'one1'])).toBe('LastOne1')
  })
})
