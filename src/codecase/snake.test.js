import { isSnakeCase, splitSnakeCase, convertToSnake } from './snake'
import {
  WORDS_SAMPLE,
  WORDS_WITH_NUM,
  CAMEL_SAMPLE,
  PASCAL_SAMPLE,
  CONSTANT_SAMPLE,
  SNAKE_WITH_NUM,
  SNAKE_SAMPLE,
  KEBAB_SAMPLE,
} from './samples'

describe('snake case', () => {
  test('is snake case', () => {
    expect(isSnakeCase(SNAKE_SAMPLE)).toBe(true)
    expect(isSnakeCase(SNAKE_WITH_NUM)).toBe(true)
    expect(isSnakeCase('last_one_1')).toBe(true)
  })

  test('is not snake case', () => {
    expect(isSnakeCase(CAMEL_SAMPLE)).toBe(false)
    expect(isSnakeCase(PASCAL_SAMPLE)).toBe(false)
    expect(isSnakeCase(CONSTANT_SAMPLE)).toBe(false)
    expect(isSnakeCase(KEBAB_SAMPLE)).toBe(false)
  })

  test('separate snake case string into array of lowercase', () => {
    expect(splitSnakeCase(SNAKE_SAMPLE)).toEqual(WORDS_SAMPLE)
    expect(splitSnakeCase(SNAKE_WITH_NUM)).toEqual(WORDS_WITH_NUM)
    expect(splitSnakeCase('last_one_1')).toEqual(['last', 'one', '1'])
  })

  test('convert to snakecase', () => {
    expect(convertToSnake(WORDS_SAMPLE)).toBe(SNAKE_SAMPLE)
    expect(convertToSnake(['last', 'one', '1'])).toBe('last_one_1')
  })
})
