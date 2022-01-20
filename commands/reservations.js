const mongo = require('../mongo');
const reservationSchema = require('../schemas/reservation-schema');
const cache = {}
const Trello = require("trello");
const { trelloKey, trelloToken, accountSid, authToken } = require('../config.json')
const trello = new Trello(trelloKey, trelloToken);
let listId = '';

function capWord(string) {
	return string.charAt(0).toUpperCase() + string.slice(1);
}
module.exports = {	
	commands: ['reservation', 'res'],
	expectedArgs: ' [phone number] [First Name] [Location Initial] [DD/MM/YY] [HH:MM] [Part] [Brand] [Model]',
	callback: (async (message) => {
		const { channel, content, guild } = message
		let text = content;

		const split = content.split(' ')
		const arguments = content.split(/[ ]+/)

		if (split.length < 2) {
			channel.send('Please provide information to reserve something')
			return
		}

		split.shift()
		text = split.join(' ')

		cache[guild.id] = [channel.id, text]
		arguments.shift()

		const phone = arguments.shift()
		const cName = capWord(arguments.shift())
		const location = arguments.shift()
		const dbDate = arguments.shift()
		const cardDate = dbDate.split('/')
		const time = arguments.shift()
		const part = arguments.shift()
		const brand = arguments.shift()
		const model = arguments.join(' ')

		const dueDate = new Date('20' + cardDate[2] + '/' + cardDate[0] + '/' + cardDate[1] + ' ' + time + ':00')
		
		let locationInfo;
		if (location.toLowerCase() == 's') {
			locationInfo = ['Smyrna', '2756 Cumberland Blvd SE, Smyrna, GA 30080', 'Located in the same shopping center as the Cumberland Diamond Exchange and the Rockin\' Jump trampoline park.', '678-575-1808']
			listId = '5f90605ea629d217a43d41f2'
		} else if (location.toLowerCase() == 'b') {
			locationInfo = ['Buckhead', '324 Pharr Rd NE, Atlanta, GA 30305', 'Located in the all white shopping center with Savi Provisions across the street from the Chevron gas station.', '678-650-2822']
			listId = '603ebbddaf0fbc7a66b383f8'
		} else if (location.toLowerCase() == 'm') {
			locationInfo = ['Midtown', '1715 Howell Mill Rd NW STE C8-A, Atlanta, GA 30318', 'Located in the Kroger Shopping Center, two doors to the right of Workout Anytime', '404-889-7993']
			listId = '603ebc373759860f980c1baa'
		}

		/*message.reply(`I got the following info and will try to save to the database:
Phone: ${phone}
Customer Name: ${cName}
Location: ${location}
Part: ${part}
Brand: ${brand}
Model: ${model}

DueDate: ${dueDate}
`) */
		await mongo().then(async (mongoose) => {
			try {
				//                mongoose.set('useFindAndModify', false);
				await new reservationSchema({
					_id: message.id,
					phone: phone, //customer phone number. Const not
					cName: cName, // customer name
					location: location, //Store reserving part
					part: part,
					brand: brand,
					model: model,
					date: dbDate,
					time: time
				}).save()
				//message.react('875225411062218763')
			} finally {
				mongoose.connection.close()
				trello.addCard(`${cName} - ${brand} ${model} - ${part}`, `${cName} would like to reserve a ${part} for their ${brand} ${model} \nContact: ${phone}`, listId,
					function (error, trelloCard) {
						if (error) {
							console.log('Could not add card:', error);
						}
						else {
							console.log('Added card:', trelloCard);
							const { id } = trelloCard
							trello.addDueDateToCard(id, dueDate)
							message.react('875224507206484019')
						}
					});
			}
		})
		
		const Tclient = require('twilio')(accountSid, authToken);
		Tclient.messages
			.create({
				body: `Hey ${cName}, 
Thank you for calling iRepairIT. We've reserved that ${part} for your ${brand} ${model} and have you scheduled for ${dbDate} at ${time}

iRepairIT - ${locationInfo[0]}
${locationInfo[1]}
            
${locationInfo[2]}
            
For any other questions, call back at ${locationInfo[3]}
            
This message is AUTOMATED. Replies are not received.`,
				from: '+16788248228',
				statusCallback: 'https://enhkjow5lrs8huo.m.pipedream.net',
				to: phone
			})
			.then(message => console.log(message.sid));
		message.react('875225719536500766');
	})
}