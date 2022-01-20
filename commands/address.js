const { accountSid, authToken, trelloKey, trelloToken } = require('../config.json')
const Trello = require("trello");
const trello = new Trello(trelloKey, trelloToken);

module.exports = {
    commands: ['address','ad'],
    expectedArgs: ' [location initial] [phone number]',
    minArgs: 2,
    maxArgs: 3,
    callback: (message, arguments, text) => {
        let myListId;
        const { member } = message
        const { displayName } = member
        if (arguments[1] < 1999999999) {
            message.reply(`Phone number seems off. Please check and try again.`);
        } else if (arguments[1] > 9999999999) {
            message.reply("Hmm.. gone overboard? Phone numbers only have 10 digits. You've got more. Check number and try again");
        } else {
                    let locationInfo;
                    if (arguments[0].toLowerCase() == 's') {
                        locationInfo = ['Smyrna', '2756 Cumberland Blvd SE, Smyrna, GA 30080', 'Located in the same shopping center as the Cumberland Diamond Exchange and the Rockin\' Jump trampoline park.', '678-575-1808']
                        myListId = '60f3537649c9eb35fb8c48fa';
                    } else if (arguments[0].toLowerCase() == 'b') {
                        locationInfo = ['Buckhead', '324 Pharr Rd NE, Atlanta, GA 30305', 'Located in the all white shopping center with Savi Provisions across the street from the Chevron gas station.', '678-650-2822']
                        myListId = '610167a0ab8cd07b168f81cf';
                    } else if (arguments[0].toLowerCase() == 'm'){
                        locationInfo = ['Midtown', '1715 Howell Mill Rd NW STE C8-A, Atlanta, GA 30318', 'Located in the Kroger Shopping Center, two doors to the right of Workout Anytime', '404-889-7993']
                        myListId = '610167a2bbcf213853d8a775';
                    } else if (arguments[0].toLowerCase == 'a') {
                        locationInfo = ['']
                        myListId = '60f35380fc536c1d0ab55278';
                    }
            
                    if (locationInfo) {
                        // Sends message for Smyrna, Buckhead, or Midtown Scenarios. Skips All locations address scenario
                        const Tclient = require('twilio')(accountSid, authToken);
                        Tclient.messages
                            .create({
                                body: `Thank you for calling iRepairIT. Per your request, here is our address:
            
iRepairIT - ${locationInfo[0]}
${locationInfo[1]}
            
${locationInfo[2]}
            
For any other questions, call back at ${locationInfo[3]}
            
This message is AUTOMATED. Replies are not received.`,
                                from: '+16788248228',
                                statusCallback: 'https://enhkjow5lrs8huo.m.pipedream.net',
                                to: arguments[1]
                            })
                            .then(message => console.log(message.sid));
                        
                            message.react('580066543115698176').then(() => message.react('875225719536500766'))
                        
                        
                        trello.addCard(`${displayName} used the bot`, `Message sent to ${arguments[1]}`, myListId,
                            function (error, trelloCard) {
                                if (error) {
                                    console.log('Could not add card:', error);
                                }
                                else {
                                    console.log('Added card:', trelloCard);
                                }
                            });
            
                    } else {
                        // Sends specific message for customer requesting all location addresses
                        const Tclient = require('twilio')(accountSid, authToken);
                        Tclient.messages
                            .create({
                                body: `Thank you for calling iRepairIT.
Per your request, here are all of our addresses:
            
                                    Smyrna
2756 Cumberland Blvd SE, Smyrna, GA 30080
            
Buckhead
324 Pharr Rd NE, Atlanta, GA 30305
            
Midtown
1715 Howell Mill Rd NW STE C8- A, Atlanta, GA 30318
            
This message is AUTOMATED. Replies are not received.`,
                                from: '+16788248228',
                                statusCallback: 'https://enhkjow5lrs8huo.m.pipedream.net',
                                to: arguments[1]
                            })
                            .then(message => console.log(message.sid));
                        message.react('580066543115698176').then(() => message.react('875225719536500766'))
                        trello.addCard(`${displayName} used the bot`, `Message sent to ${arguments[1]}`, myListId,
                            function (error, trelloCard) {
                                if (error) {
                                    console.log('Could not add card:', error);
                                }
                                else {
                                    console.log('Added card:', trelloCard);
                                }
                            });
                    }
        }
    }
}