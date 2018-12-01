import * as R from 'ramda'
import { isCamel, splitCamel } from './camel'
import { isConstant, splitConstant } from './constant'
import { isKebab, splitKebab } from './kebab'
import { isPascal, splitPascal } from './pascal'
import { isSnake, splitSnake } from './snake'

/**
 * prepare for case  conversion
 * all items should be lowercase.
 * number is considered as lowercase
 *
 * @param {*} words
 */
export function prepareWordsForConversion(words = []) {
  if (Array.isArray(words)) {
    return R.pipe(
      R.filter(w => R.not(R.isEmpty(w))),
      R.filter(w => typeof w === 'string'),
      R.map(R.toLower)
    )(words)
  } else {
    console.error('words shoud be an array')
    return words
  }
}

export function splitWordToConvert(word) {
  if (isCamel(word)) {
    return splitCamel(word)
  } else if (isConstant(word)) {
    return splitConstant(word)
  } else if (isKebab(word)) {
    return splitKebab(word)
  } else if (isPascal(word)) {
    return splitPascal(word)
  } else if (isSnake(word)) {
    return splitSnake(word)
  } else {
    return [word]
  }
}
