# telegraf-logs-answer

This library is a middleware that allows you to write a user action logger in a few lines of code and the ability to respond to users on behalf of a bot.

_only works in conjunction with telegraf.js_
_only works in nodejs v14 and above_

### Installation
To install locally in a project, use
```
$ npm install telegraf-logs-answer --save
```
### Usage

```
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
```

### Result
As a result, you will have your main bot, and a logger bot that sends you logs, in order to answer a person on behalf of the bot, you need to write a message in response to the message of the logger bot