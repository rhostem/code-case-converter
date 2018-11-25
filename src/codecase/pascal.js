import * as R from 'ramda'
import { prepareWordsForConversion } from './util'

export function isPascalCase(str = '') {
  return /\b([A-Z][a-z0-9]+([A-Z][a-z0-9]+)+)/.test(str)
}

export function splitPascalCase(str = '') {
  if (isPascalCase(str)) {
    return str.split(/\B(?=[A-Z][a-z]+)/g).map(R.toLower)
  } else {
    return [str]
  }
}

export function convertToPascal(words) {
  return Array.isArray(words)
    ? R.pipe(
        prepareWordsForConversion,
        R.map(word => `${word[0].toUpperCase()}${word.slice(1, word.length)}`),
        R.join('')
      )(words)
    : words
}
