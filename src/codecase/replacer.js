export function replacer(text = '', search, replacer) {
  console.log(`arguments`, ...arguments)

  return text.replace(new RegExp(`(${search})`, 'img'), replacer)
}
