export function replacer(text = '', search, replacer) {
  console.log(`search, replacer`, search, replacer)

  return text.replace(new RegExp(`(${search})`, 'gm'), replacer)
}
