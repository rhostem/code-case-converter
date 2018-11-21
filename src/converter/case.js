export function isCamelCase(s = '') {
  const str = s.toString()
  return /^[a-z]+([A-Z][a-z]{1,})+$/.test(str)
}
