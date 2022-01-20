module.exports = {
    commands: 'ping',
    expectedArgs: '',
    minArgs: 0,
    maxArgs: 0,
    callback: (message, arguments, text) => {
        const chance = Math.random() * 100
        if (chance >= 5) {
            message.reply('Pong!')
        } else {
            message.reply('Pong :smirk: \np.s. There is less than 5% chance to get this message')
        }
    },
}