const telegrafLA = require('./index.js')
const { Telegraf } = require('telegraf')

const mainBot = new Telegraf()
const loggerBot = new Telegraf()

mainBot.use(telegrafLA({
  loggerBot,
  outputTelegramId: '654420912'
}))

mainBot.launch()
