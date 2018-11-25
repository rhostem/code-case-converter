import { replacer } from './replacer'

describe('replacer function', () => {
  test('', () => {
    expect(
      replacer(
        'this is camelCase and \n camelCase and replacerTest',
        'camelCase',
        'camel-case'
      )
    ).toEqual('this is camel-case and \n camel-case and replacerTest')
  })
})
