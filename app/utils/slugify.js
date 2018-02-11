module.exports = function (string) {
  const newString = string.split(' ')
    .map(word => {
      return word.replace(/[^A-Za-z0-9]/g, '').split('').map(letter => letter.toLowerCase()).join('')
    })
    .join('-')
  return newString
}
