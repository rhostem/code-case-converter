import * as R from 'ramda'
import { prepareWordsForConversion } from './util'

export function isKebabCase(str = '') {
  return /\b([a-z][a-z0-9]+(?:-[a-z][a-z0-9]+)+)\b/.test(str)
}

/**
 * split Kebab case to array of lowercase word without underscore
 * @param {*} str
 */
export function splitKebabCase(str) {
  if (isKebabCase(str)) {
    return str
      .split(/\b(?=-[a-z][a-z0-9]+)/g)
      .map(R.toLower)
      .map(w => w.replace(/-/g, ''))
  } else {
    return [str]
  }
}

export function convertToKebab(words = []) {
  return R.pipe(
    prepareWordsForConversion,
    R.map(R.toLower),
    R.join('-')
  )(words)
}
