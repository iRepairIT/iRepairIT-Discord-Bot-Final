module.exports = {
    commands: 'pricing',
    expectedArgs: ' [device] [repair] [part price]',
    permissionError: 'You need admin permissions to run this command',
    minArgs: 3,
    callback: (message, arguments, text) => {
        const device = arguments.shift().toLowerCase();
        const repair = arguments.shift().toLowerCase();
        let partCost = 0;
        if (typeof arguments[0] !== 'number') {
            partCost = arguments.shift()
        } else {
            partCost = arguments.shift() * 1.2
        }

        function quoteFormula(partCost, labor) {
            const partFluff = Number(partCost)*1.2
                let quote = partFluff + labor
                quote = Math.ceil((quote + 1) / 10) * 10;
                quote = quote - 0.01
                return quote
        }
        const letterCheck = partCost;


        // Code commented below used to diagnose what the bot is understanding for each variable
        /*message.reply(`I got: 
Device: "${device}"
Repair: "${repair}"
partCost: "${partCost}"
and model: ${arguments.join(' ')}`)*/


        if (/\d/.test(letterCheck) !== true) {
            message.reply(`I got "**${partCost}**" as the price for the part. Please use one word for the repair type or check \`!help pricing\` for more info on how to request this pricing`)
            return;
        } else {
            if (arguments.length < 1) {
                function quoteReply(partCost, labor) {
                    message.reply(`Repair estimate is $${quoteFormula(partCost, labor)}. Please await confirmation from Sal or David and state what ${device} this is for`)
                }
            } else {
                const deviceModel = arguments.join(' ');
                function quoteReply(partCost, labor) {
                    message.reply(`Repair estimate for that ${deviceModel} is $${quoteFormula(partCost, labor)}. Please await confirmation from Sal or David`)
                }
            }
            if (device == 'phone') {
                return quoteReply(partCost, 70)
            } else if (device == 'laptop' || device == 'computer' || device == 'pc') {
                if (repair == 'screen') {
                    quoteReply(partCost, 100)
                } else if (repair == 'charging') {
                    quoteReply(partCost, 90)
                } else if (repair == 'battery') {
                    quoteReply(partCost, 100)
                    message.reply(`^^^^^ Pricing is assumed to be for an internal battery`)
                } else if (repair == 'misc') {
                    quoteReply(partCost, 100)
                } else if (repair == 'hinge') {
                    quoteReply(partCost, 100)
                } else if (repair == 'cover') {
                    quoteReply(partCost, 150)
                } else if (repair == 'webcam') {
                    quoteReply(partCost, 100)
                    message.reply(`^^^^ Pricing is assumed the webcam is the only part being replaced. If **screen** is already being replaced this repair gets 50% off labor making it ${quoteFormula(partCost,50)}`)
                } else {
                    message.reply(`Sorry, I can't do quotes for \`${repair}\` on \`${device}\`, or you might have a typo. Try using \`misc\` as the repair type`)
                }
            } else if (device == 'console') {
                message.reply("Sorry mate. I can't help with consoles. Those are hard to price quote. Check with Sal")
            } else if (device == 'tablet') {
                if (repair == 'screen') {
                    let tabletLabor = 0;
                    if (partCost <= 75) {
                        tabletLabor = 70
                    } else if (partCost <= 400) {
                        tabletLabor = 100
                    } else {
                        tabletLabor = 150
                    }
                    quoteReply(partCost, tabletLabor)
                } else {
                    message.reply(`Sorry, I can't do quotes for \`${repair}\` on \`${device}\`, or you might have a typo. Try using \`misc\` as the repair type`)
                }

            } else {
                message.reply(`Sorry, I haven't been taught pricing on \`${device}\`, or you might have a typo.`)
            }
        }
    }
}
