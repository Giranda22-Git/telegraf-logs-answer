const telegrafLA = require('./index.js')
const { Telegraf } = require('telegraf')

const mainBot = new Telegraf('5236343240:AAEOj5GAtrHl5OWWseOxePatd4J6CBbnqNc')
const loggerBot = new Telegraf('5228237564:AAH-i_pjjugz7zic0Qu1NkF5d3j8SSBFqTI')

mainBot.use(telegrafLA({
  loggerBot, // another your bot, the one who will send logs from the main bot
  answerBot: mainBot, // your main bot, who will reply to the user
  outputTelegramId: '-637053440' // telegram id of group or user for send logs
}))

mainBot.launch()
