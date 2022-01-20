const { accountSid, authToken } = require('../config.json')

module.exports = {
    commands: 'sms',
    permissions: 'ADMINISTRATOR',
    //permissionError = "You do not have permissions to run this command",
    //requiredRoles = ['Admin'],
    //minArgs = 2,
    expectedArgs: ' [phone] [Location initial] message',
    callback: (message, arguments) => {
        const number = arguments.shift();
        const location = arguments.shift();
        const textMessage = arguments.join(' ');
        let locationInfo;
        if (location.toLowerCase() == 's') {
            locationInfo = ['Smyrna', '2756 Cumberland Blvd SE, Smyrna, GA 30080', '678-575-1808']
        } else if (location.toLowerCase() == 'b') {
            locationInfo = ['Buckhead', '324 Pharr Rd NE, Atlanta, GA 30305', '678-650-2822']
        } else if (location.toLowerCase() == 'm') {
            locationInfo = ['Midtown', '1715 Howell Mill Rd NW STE C8-A, Atlanta, GA 30318', '404-889-7993']
        } else {
            message.reply("Uhm. That's not a location I'm aware of")
        }

        const Tclient = require('twilio')(accountSid, authToken);
        Tclient.messages
            .create({
                body: `${textMessage}
            
iRepairIT - ${locationInfo[0]}
${locationInfo[1]}
            
For any other questions, call back at ${locationInfo[2]}
            
This message is AUTOMATED. Replies are not received.`,
                from: '+16788248228',
                statusCallback: 'https://enhkjow5lrs8huo.m.pipedream.net',
                to: number
            })
            .then(message => console.log(message.sid));

        message.react('580066543115698176').then(() => message.react('875225719536500766'))
    }
}