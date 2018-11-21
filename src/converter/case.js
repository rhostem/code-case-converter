import * as R from 'ramda'

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

/**
 * prepare for case  conversion
 * all items should be lower case and
 * @param {*} words
 */
function prepareWordsForConversion(words = []) {
  if (Array.isArray(words)) {
    return R.pipe(
      R.filter(w => R.not(R.isEmpty(w))),
      R.filter(w => typeof w === 'string')
    )(words)
  } else {
    console.error('words shoud be an array')
    return words
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
