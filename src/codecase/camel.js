import * as R from 'ramda'
import { prepareWordsForConversion } from './util'

export function isCamelCase(str = '') {
  return /^[a-z][a-z0-9]+([A-Z][a-z0-9]{1,})+$/.test(str)
}

export function splitCamelCase(str) {
  if (isCamelCase(str)) {
    return str.split(/\B(?=[A-Z][a-z]+)/g).map(R.toLower)
  } else {
    return [str]
  }
}

export function convertToCamel(words = []) {
  return R.pipe(
    prepareWordsForConversion,
    wordArr => {
      return wordArr.map((word, index) => {
        if (index !== 0) {
          return `${word[0].toUpperCase()}${word.slice(1, word.length)}`
        } else {
          return word
        }
      })
    },
    R.join('')
  )(words)
}
