import * as R from 'ramda'
import { prepareWordsForConversion } from './util'

export function isKebab(str = '') {
  return /\b([a-z][a-z0-9]+(?:-[a-z][a-z0-9]+)+)/.test(str)
}

/**
 * split Kebab case to array of lowercase word without underscore
 * @param {*} str
 */
export function splitKebab(str) {
  if (isKebab(str)) {
    return str
      .split(/(?=-[a-z0-9]+)/g)
      .map(R.toLower)
      .map(w => w.replace(/-/g, ''))
  } else {
    return [str]
  }
}

export function convertToKebab(words = []) {
  return Array.isArray(words)
    ? R.pipe(
        prepareWordsForConversion,
        R.map(R.toLower),
        R.join('-')
      )(words)
    : words
}
