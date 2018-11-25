export function replacer(text = '', search, replacer) {
  return text.replace(new RegExp(`(${search})`, 'gm'), replacer)
}
