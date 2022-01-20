const { prefix } = require('../../config.json');
const Discord = require('discord.js');
const logo = 'https://pbs.twimg.com/profile_images/1188846900180672514/JBYvdp9U_400x400.jpg'
const embedColor = '#FF0000'
function capWord(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}
module.exports = {
    commands: 'help',
    expectedArgs: ' [command you need help with]',
    minArgs: 0,
    callback: (message, arguments, text) => {
        if (!arguments.length) {
            message.reply(`If you need help with a command type **${prefix}help [command]**, or if you'd like a list of commands available type **${prefix}help list**`)
        } else if (arguments[0].toLowerCase() == 'list') {
            const embedList = new Discord.MessageEmbed()
                .setTitle('Commands List')
                .setFooter('iRepairIT Bot', logo)
                .setColor(embedColor)
                .addFields({
                    name: 'Pricing',
                    value: 'Get help from the bot pricing a repair',
                }, {
                    name: 'Ping',
                    value: 'Silly short game with the bot (shows you if bot is online or offline)'
                }, {
                    name: 'Address',
                    value: 'Sends customer text message with address location'
                }, {
                    name: 'Reservation',
                    value: 'Saves customer info to reserve a part'
                }, {
                    name: 'Wishlist',
                    value: 'Sends customer text message notification that their wishlist item is back in stock'
                })
            message.channel.send(embedList)
        } else if (arguments[0].toLowerCase() == 'pricing') {
            //message.reply(`The pricing command gives you a quick repair quote, please use one word per parameter. For example say "hinge" instead of "hinge replacement" for the repair type. See more info below`)
            const pricing = new Discord.MessageEmbed()
                .setTitle(capWord(arguments[0]))
                .setDescription('Use this command to get a price estimate. Use by typing \`!pricing [device] [repair] [partCost] [deviceModel]\`')
                .setFooter(`${prefix}${arguments[0]} information`, logo)
                .setColor(embedColor)
                .addFields({
                    name: 'Example',
                    value: '!Pricing phone screen 348.85 S20 Ultra',
                }, {
                    name: 'Phone - Repairs Available:',
                    value: 'Any repair'
                }, {
                    name: 'PC - Repairs Available:',
                    value: 'screen, charging, battery, misc, hinge, cover'
                }, {
                    name: 'Tablet - Repairs Available:',
                    value: 'Screen'
                }, {
                    name: 'Important Notes',
                    value: 'All repairs must use only one word \nPC can use "Laptop" or "Computer" or "PC"'
                })
            return message.channel.send(pricing)

        } else if (arguments[0].toLowerCase() == 'ping') {
            message.reply('The ping command is a simple (silly) way to see if the bot is online')
            const pingEmbed = new Discord.MessageEmbed()
                .setTitle(capWord(arguments[0]))
                .setFooter(`${prefix}${arguments[0]}`, logo)
                .setColor(embedColor)
                .addFields({
                    name: 'Usage',
                    value: `${prefix}${arguments[0]}`,
                })
            return message.channel.send(pingEmbed)
        } else if (arguments[0].toLowerCase() == 'address' || arguments[0].toLowerCase() == 'ad') {
            const addressEmbed = new Discord.MessageEmbed()
                .setTitle('Address')
                .setDescription('Use this command to send a text message with our address to a customer. \n If you use "A" as the location initial the bot will send a message with all of our addresses')
                .setFooter(`${prefix}${arguments[0]}`, logo)
                .setColor(embedColor)
                .addFields({
                    name: 'Usage',
                    value: `\`${prefix}${arguments[0]} [location initial] [phone number]\``
                }, {
                    name: 'Notes',
                    value: 'This command can also be used with \`!ad\`'
                })
            return message.channel.send(addressEmbed)
        } else if (arguments[0].toLowerCase() == 'res' || arguments[0].toLowerCase() == 'reservation') {
            const { member } = message
            const displayName = member.displayName
            const reservEmbed = new Discord.MessageEmbed()
                .setTitle('Reservation')
                .setDescription('Use this command to save customer info in Trello - Reservations board and send a text message with our address to a customer.')
                .setFooter(`${prefix}${arguments[0]}`, logo)
                .setColor(embedColor)
                .addFields({
                    name: 'Usage',
                    value: `\`${prefix}${arguments[0]} [phone number] [First Name] [Location Initial] [DD/MM/YY] [HH:MM] [Part] [Brand] [Model]\``
                }, {
                    name: 'Example',
                    value: `!reservation 4703339005 ${displayName} S 7/15/22 16:15 Screen Samsung S20 Ultra`
                }, {
                    name: 'Notes',
                    value: 'This command can also be with \`!res\` or \`!reservation\` \nFor time it must be in military time'
                })
            return message.channel.send(reservEmbed)
        } else if (arguments[0].toLowerCase() == 'wishlist' || arguments[0].toLowerCase() == 'wish') {
            const reservEmbed = new Discord.MessageEmbed()
                .setTitle('Wishlist')
                .setDescription('Use this command to text the customer before calling them to inform them a wishlist item is back in stock')
                .setFooter(`${prefix}${arguments[0]}`, logo)
                .setColor(embedColor)
                .addFields({
                    name: 'Usage',
                    value: `\`${prefix}${arguments[0]} [phone number]`
                }, {
                    name: 'Example',
                    value: `${prefix}${arguments[0]} 4703339005`
                }, {
                    name: 'Notes',
                    value: 'This command can be used with \`!wish\` or \`!wishlist\`'
                })
            return message.channel.send(reservEmbed)
        } else {
            message.reply(`Hmm. Either \`${arguments[0]}\` isn't in my code as a command, David forgot to add it to the help menu, **OR** you have a typo.`)
            const missingArg = new Discord.MessageEmbed()
                .setImage('https://media.discordapp.net/attachments/557689821447979018/876871554061963314/b8alyGmxcIoeAAAAAElFTkSuQmCC.png')
            return message.channel.send(missingArg)
        }
    }
}
