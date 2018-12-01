import { isSnake, splitPascal, convertToSnake } from './snake'
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
    expect(isSnake(SNAKE_SAMPLE)).toBe(true)
    expect(isSnake(SNAKE_WITH_NUM)).toBe(true)
    expect(isSnake('last_one_1')).toBe(true)
  })

  test('is not snake case', () => {
    expect(isSnake(CAMEL_SAMPLE)).toBe(false)
    expect(isSnake(PASCAL_SAMPLE)).toBe(false)
    expect(isSnake(CONSTANT_SAMPLE)).toBe(false)
    expect(isSnake(KEBAB_SAMPLE)).toBe(false)
  })

  test('separate snake case string into array of lowercase', () => {
    expect(splitPascal(SNAKE_SAMPLE)).toEqual(WORDS_SAMPLE)
    expect(splitPascal(SNAKE_WITH_NUM)).toEqual(WORDS_WITH_NUM)
    expect(splitPascal('last_one_1')).toEqual(['last', 'one', '1'])
  })

  test('convert to snakecase', () => {
    expect(convertToSnake(WORDS_SAMPLE)).toBe(SNAKE_SAMPLE)
    expect(convertToSnake(['last', 'one', '1'])).toBe('last_one_1')
  })
})
