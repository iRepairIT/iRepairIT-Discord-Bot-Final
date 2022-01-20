const path = require('path')
const fs = require('fs')
const Discord = require('discord.js');
const client = new Discord.Client();
const config = require('./config.json');
const mongo = require('./mongo');
const welcome = require('./welcome')
const { dirname } = require('path');

client.on('ready', async () => {
    client.channels.cache.get('613493179055865866').send('Bot was restarted after some changes to the code!')
    await mongo().then(mongoose => {
        try {
            console.log('Connected to mongo')
        } finally {
            mongoose.connection.close()
        }
    })

    const baseFile = 'command-base.js'
    const commandBase = require(`./commands/${baseFile}`)

    const readCommands = dir => {
        const files = fs.readdirSync(path.join(__dirname, dir))
        for (const file of files) {
            const stat = fs.lstatSync(path.join(__dirname, dir, file))
            if (stat.isDirectory()) {
                readCommands(path.join(dir, file))
            } else if (file !== baseFile) {
                const option = require(path.join(__dirname, dir, file))
                commandBase(option)

            }
        }
    }
    readCommands('commands')

    commandBase.listen(client);
    console.log('The client is ready');
});

client.login(config.token)