const telegrafLA = require('telegraf-logs-answer')
const { Telegraf } = require('telegraf')

const mainBot = new Telegraf(/* main telegram bot token */)
const loggerBot = new Telegraf(/* logger telegram bot token */)

mainBot.use(telegrafLA({
  loggerBot, // another your bot, the one who will send logs from the main bot
  answerBot: mainBot, // your main bot, who will reply to the user
  outputTelegramId: '' // telegram id of group or user for send logs
}))

mainBot.launch()
