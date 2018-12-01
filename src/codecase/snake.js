import * as R from 'ramda'
import { prepareWordsForConversion } from './util'

export function isSnake(str = '') {
  return /\b([a-z][a-z0-9]+(?:_[a-z0-9]+)+)/.test(str)
}

/**
 * split Snake case to array of lowercase word without underscore
 * @param {*} str
 */
export function splitSnake(str) {
  if (isSnake(str)) {
    return str
      .split(/(?=_[a-z0-9]+)/g)
      .map(R.toLower)
      .map(w => w.replace(/_/g, ''))
  } else {
    return [str]
  }
}

export function convertToSnake(words = []) {
  return Array.isArray(words)
    ? R.pipe(
        prepareWordsForConversion,
        R.map(R.toLower),
        R.join('_')
      )(words)
    : words
}
