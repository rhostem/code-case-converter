import * as R from 'ramda'

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
      R.filter(w => typeof w === 'string')
    )(words)
  } else {
    console.error('words shoud be an array')
    return words
  }
}
