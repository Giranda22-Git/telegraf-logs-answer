const getButtonByCallbackData = require('./utils/getButtonByCallbackData.js')

const main = function (setting) {
  const logger = function (ctx, next) {
    try {
      const telegramId = ctx.update.callback_query?.from.id || ctx.update.message?.from.id
      let userAnswer = ctx.update.callback_query?.data || ctx.update.message?.text
      const firstName = ctx.update.message?.from.first_name || ctx.update.callback_query?.from.first_name
      const lastName = ctx.update.callback_query?.from.last_name || ctx.update.message?.from.last_name
      const userName = ctx.update.message?.from.username || ctx.update.callback_query?.from.username

      if (ctx.update.callback_query) {
        userAnswer = (getButtonByCallbackData(ctx.update.callback_query.message.reply_markup, userAnswer)).text
      }
      else if (ctx.update.message?.document) {
        userAnswer = 'document'
      }

      setting.loggerBot.telegram.sendMessage(
        setting.outputTelegramId,
`
telegram id: ${telegramId}
firstName: ${firstName}
lastName: ${lastName}
username: @${userName}

Answer:
  ${userAnswer}
`
      )

      return next()
    }
    catch (err) {
      console.log(err)
      return next()
    }
  }

  return logger
}

module.exports = main
