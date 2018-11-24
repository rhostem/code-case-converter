import { isSnakeCase, splitSnakeCase, convertToSnake } from './snake'
import {
  WORDS_SAMPLE,
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
  })

  test('is not snake case', () => {
    expect(isSnakeCase(CAMEL_SAMPLE)).toBe(false)
    expect(isSnakeCase(PASCAL_SAMPLE)).toBe(false)
    expect(isSnakeCase(CONSTANT_SAMPLE)).toBe(false)
    expect(isSnakeCase(KEBAB_SAMPLE)).toBe(false)
  })

  test('separate snake case string into array of lowercase', () => {
    expect(WORDS_SAMPLE).toEqual(splitSnakeCase(SNAKE_SAMPLE))
  })

  test('convert to snakecase', () => {
    expect(convertToSnake(WORDS_SAMPLE)).toBe(SNAKE_SAMPLE)
  })
})
