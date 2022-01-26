const getTGidFromLoggerMessage = function (message) {
  const startIndex = message.indexOf('telegram id: ') + 'telegram id: '.length
  const endIndex = message.indexOf('\n', startIndex)

  const result = message.substring(startIndex, endIndex)

  return result
}

module.exports = getTGidFromLoggerMessage
