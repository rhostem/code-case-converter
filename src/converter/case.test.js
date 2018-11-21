import { isCamelCase, splitCamelCase, convertToCamel } from './case'
import * as R from 'ramda'

const words = ['create', 'react', 'app']
const CAMEL = 'createReactApp'
const PASCAL = 'CreateReactApp'
const CONSTANT = 'CREATE_REACT_APP'
const KEBAB = 'create-react-app'
const SNAKE = 'create_react_app'

const wordsWithNum = ['c1reate', 'react2', 'app3']
const CAMEL_WITH_NUM = 'c1reateReact2App3'
const PASCAL_WITH_NUM = 'C1reateReact2App3'
const CONSTANT_WITH_NUM = 'C1REATE_REACT2_APP3'
const KEBAB_WITH_NUM = 'c1reate-react2-app3'
const SNAKE_WITH_NUM = 'c1reate_react2_app3'

describe('camel case', () => {
  test('is camel case', () => {
    expect(isCamelCase(CAMEL)).toBe(true)
    expect(isCamelCase(CAMEL_WITH_NUM)).toBe(true)
  })

  test('is not camel case', () => {
    expect(isCamelCase(SNAKE)).toBe(false)
    expect(isCamelCase(SNAKE_WITH_NUM)).toBe(false)
    expect(isCamelCase(PASCAL)).toBe(false)
    expect(isCamelCase(PASCAL_WITH_NUM)).toBe(false)
    expect(isCamelCase(CONSTANT)).toBe(false)
    expect(isCamelCase(CONSTANT_WITH_NUM)).toBe(false)
    expect(isCamelCase(KEBAB)).toBe(false)
    expect(isCamelCase(KEBAB_WITH_NUM)).toBe(false)
    expect(isCamelCase(SNAKE)).toBe(false)
    expect(isCamelCase(SNAKE_WITH_NUM)).toBe(false)
  })

  test('separate word into array of lowercase', () => {
    expect(R.equals(words, splitCamelCase(CAMEL))).toBe(true)
    expect(R.equals(wordsWithNum, splitCamelCase(CAMEL_WITH_NUM))).toBe(true)
  })

  test('convert to camelcase', () => {
    expect(convertToCamel(words)).toBe(CAMEL)
    expect(convertToCamel(wordsWithNum)).toBe(CAMEL_WITH_NUM)
  })
})
