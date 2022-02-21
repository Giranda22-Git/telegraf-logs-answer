const getButtonsFromUserSyntax = function (syntax) {
  const startCodeSyntax = '~~~'

  const newMessage = syntax.slice(
    0,
    syntax.includes(startCodeSyntax) ? syntax.indexOf(startCodeSyntax) : syntax.length
  )

  let targetArea = syntax.slice(
    syntax.includes(startCodeSyntax) ? syntax.indexOf(startCodeSyntax) + startCodeSyntax.length + 1 : syntax.length,
    syntax.length
  )

  const reply_markup = {reply_markup: {inline_keyboard: []}}

  if (targetArea) {
    console.log('targetArea: ', targetArea)
    const allButtonsArray = targetArea.split('\n')

    for (const buttonsArray of allButtonsArray) {
      const buttons = buttonsArray.split(',')
      const lineOfButtons = []

      for (const buttonName of buttons) {
        lineOfButtons.push({ text: buttonName, callback_data: 'fix' })
      }

      reply_markup.reply_markup.inline_keyboard.push(lineOfButtons)
    }
  }

  return {
    newMessage,
    reply_markup
  }
}

module.exports = getButtonsFromUserSyntax
