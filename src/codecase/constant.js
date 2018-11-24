import * as R from 'ramda'
import { prepareWordsForConversion } from './util'

export function isConstantCase(str = '') {
  return /\b([A-Z][A-Z0-9]+(?:_[A-Z0-9]+)+)\b/.test(str)
}

/**
 * split constant case to array of lowercase word without underscore
 * @param {*} str
 */
export function splitConstantCase(str) {
  if (isConstantCase(str)) {
    return str
      .split(/\B(?=_[A-Z0-9]+)/g)
      .map(R.toLower)
      .map(w => w.replace(/_/g, ''))
  } else {
    return [str]
  }
}

export function convertToConstant(words = []) {
  return R.pipe(
    prepareWordsForConversion,
    R.map(R.toUpper),
    R.join('_')
  )(words)
}
