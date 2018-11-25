export const replacer = (text = '', search, replacer) => {
  return text.replace(new RegExp(search, 'img'), replacer)
}
