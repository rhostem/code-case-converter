import * as R from 'ramda'
import { prepareWordsForConversion } from './util'

export function isSnakeCase(str = '') {
  return /\b([a-z][a-z0-9]+(?:_[a-z][a-z0-9]+)+)\b/.test(str)
}

/**
 * split Snake case to array of lowercase word without underscore
 * @param {*} str
 */
export function splitSnakeCase(str) {
  if (isSnakeCase(str)) {
    return str
      .split(/(?=_[a-z][a-z0-9]+)/g)
      .map(R.toLower)
      .map(w => w.replace(/_/g, ''))
  } else {
    return [str]
  }
}

export function convertToSnake(words = []) {
  return R.pipe(
    prepareWordsForConversion,
    R.map(R.toLower),
    R.join('_')
  )(words)
}
