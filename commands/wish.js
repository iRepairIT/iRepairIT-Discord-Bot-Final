const { accountSid, authToken } = require('../config.json')

module.exports = {
    commands: ['wish','wishlist'],
    expectedArgs: ' [Location Initial Visited] [phone number]',
    minArgs: 2,
    maxArgs: 2,
    callback: (message, arguments, text) => {
        let locationInfo;
        const Tclient = require('twilio')(accountSid, authToken);
        if (arguments[0].toLowerCase() == 's') {
            locationInfo = ['Smyrna', '678-575-1808']
        } else if (arguments[0].toLowerCase() == 'b') {
            locationInfo = ['Buckhead', '678-650-2822']
        } else if (arguments[0].toLowerCase() == 'm') {
            locationInfo = ['Midtown', '404-889-7993']
        }

        Tclient.messages
            .create({
                body: `You previously visited requested to be put in the iRepairIT wishlist. Good news! Your part is now available to do your repair.

One of our technicians will be calling you shortly from the number ${locationInfo[1]}.

${locationInfo[0]} Team
iRepairIT

This message is AUTOMATED. Replies are not received.`,
                from: '+16788248228',
                statusCallback: 'https://enhkjow5lrs8huo.m.pipedream.net',
                to: arguments[1]
            })
            .then(message => console.log(message.sid));

        message.react('580066543115698176').then(() => message.react('875225719536500766'))
    }
}