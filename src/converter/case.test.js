import { isCamelCase } from './case'

const CAMEL = 'reactApp'
const SNAKE = 'react_app'
const CONSTANT = 'REACT_APP'
const PASCAL = 'ReactApp'
const KEBAB = 'react-app'

describe('isCamelCase 함수 테스트', () => {
  test('camel 케이스', () => {
    expect(isCamelCase(CAMEL)).toBe(true)
  })

  test('camel 케이스가 아니다', () => {
    expect(isCamelCase(SNAKE)).toBe(false)
    expect(isCamelCase(CONSTANT)).toBe(false)
    expect(isCamelCase(PASCAL)).toBe(false)
    expect(isCamelCase(KEBAB)).toBe(false)
  })
})
