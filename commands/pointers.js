const Discord = require('discord.js');
const logo = 'https://pbs.twimg.com/profile_images/1188846900180672514/JBYvdp9U_400x400.jpg'
module.exports = {
    commands: 'pointers',
    expectedArgs: ' [device type] [repair topic]',
    minArgs: 2,
    maxArgs: 2,
    callback: (message, arguments, text) => {
        if (arguments[0].toLowerCase() == 'ipad') {
            if (arguments[1].toLowerCase() == 'charging') {
                const ipadCharging = new Discord.MessageEmbed()
                    .setTitle('iPad Charging Port')
                    .setDescription('Steps + Tips for charging port replacement')
                    .setFooter(`Tips by Sal`, logo)
                    .setColor('#efff00')
                    .addFields({
                        name: 'Step 1',
                        value: `Add Flux`
                    }, {
                        name: 'Step 2',
                        value: `Add Low Melt`
                    }, {
                        name: 'Step 3',
                        value: 'Heat it for 45+ seconds ensuring all pads are completely covered with low melt (don\'t neglect the left and right side pads!)\n**NOTE** There is adhesive under the port as well, so you need to lift the port from the bottom side to loosen the adhesive'
                    }, {
                        name: 'Step 4',
                        value: 'Once the adhesive is loosened and the pads are completely heated and covered with low melt, you can slowly pull the charging port up starting from the bottom side working your way up, while constantly heating with the soldering iron'
                    }, {
                        name: 'Step 5',
                        value: 'Once port is removed, do NOT clean off old flux since the low melt will cause jagged edges on the pads, which can get pulled off. Instead, start wicking off the old solder'
                    }, {
                        name: 'Step 6',
                        value: 'Wick off all solder until all pads look flat'
                    }, {
                        name: 'Step 7',
                        value: 'Once all pads are flat, clean old flux off thoroughly with Q-Tip and alcohol'
                    }, {
                        name: 'Step 8',
                        value: 'Add flux and high melt solder, ensuring all pads look like \'fluffy pillows\'. Try to avoid getting solder on the 2 squares on the left and right sides of the pads, these help with lining up the new port. It is not an issue if it does get solder, it just makes it harder to see the squares through the new port. '
                    }, {
                        name: 'Step 9',
                        value: 'Clean old flux with Q-Tip and alcohol'
                    }, {
                        name: 'Step 10',
                        value: 'Apply very small amount of flux and smear it around with a clean Q-Tip.'
                    }, {
                        name: 'Step 11',
                        value: 'Lay charging port on top using the 2 squares on the left and right ensuring it\'s perfectly lined up. Once lined up, I recommend holding it down with tweezers in your left hand'
                    }, {
                        name: 'Step 12',
                        value: 'Apply solder on top of the port, at this point you\'re just adding solder to hold the port down, then you will apply flux and more solder to ensure nice \'fluffy pillows\''
                    }, {
                        name: 'Step 13',
                        value: 'Heat for about 30 seconds, making sure all pads are thoroughly heated'
                    }, {
                        name: 'Step 14',
                        value: 'Clean old flux with alcohol and Q-Tip'
                    }, {
                        name: 'Step 15',
                        value: 'Cover the pads with the black tape that was originally on there or Kaptons tape.'
                    }, {
                        name: 'Step 16',
                        value: 'Use the tristar tester to confirm it says \'OK\' for the dock test and not Fail BEFORE putting the motherboard back into the frame.'
                    })
                return message.channel.send(ipadCharging)
            }
		}
    }
}