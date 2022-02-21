const getButtonByCallbackData = require('./utils/getButtonByCallbackData.js')
const getTGidFromLoggerMessage = require('./utils/getTGidFromLoggerMessage.js')
const getButtonsFromUserSyntax = require('./utils/getButtonsFromUserSyntax.js')

const logger = function (setting) {
  setting.loggerBot.on('message', (ctx) => {
    if (ctx.update?.message.text === '/groupTGID') {
      ctx.reply(ctx.update?.message?.chat.id)
    }

    if (ctx.update?.message.reply_to_message && ctx.update?.message?.text) {
      const resultOfSyntax = getButtonsFromUserSyntax(ctx.update.message.text)
      console.log(resultOfSyntax, resultOfSyntax.reply_markup.reply_markup.inline_keyboard)
      setting.answerBot.telegram.sendMessage(
        getTGidFromLoggerMessage(ctx.update.message.reply_to_message.text),
        resultOfSyntax.newMessage,
        resultOfSyntax.reply_markup
      )
    }
  })

  setting.loggerBot.launch()

  const init = function (ctx, next) {
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

  return init
}

module.exports = logger
