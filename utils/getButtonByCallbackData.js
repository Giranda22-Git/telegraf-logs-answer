const getButtonByCallbackData = function (replyMarkup, CAData) {
  for (const button of replyMarkup.inline_keyboard) {
    console.log(button)
    if (button[0].callback_data === CAData) {
      return button[0]
    }
  }

  return false
}

module.exports = getButtonByCallbackData
