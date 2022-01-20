const requestedListId = '611a924ebf0c13203c5e3e9c';
const Trello = require("trello");
const { trelloKey, trelloToken } = require('../config.json')
const trello = new Trello(trelloKey, trelloToken);

function capWord(string) {
	return string.charAt(0).toUpperCase() + string.slice(1);
}
module.exports = {
    commands: 'oos',
	expectedArgs: ' [repair] [brand] [model]',
	minArgs: 3,
	maxArgs: 3,
    callback: (message, arguments, text) => {
		const { member } = message
		const { displayName } = member
		const part = capWord(arguments.shift())
		const brand = arguments.shift()
		const model = arguments.join(' ')
		trello.addCard(`${brand} ${model} - ${part}`, `${displayName} got a request for a ${part} on a ${brand} ${model}`, requestedListId,
			function (error, trelloCard) {
				if (error) {
					console.log('Could not add card:', error);
				}
				else {
					console.log('Added card:', trelloCard);
					message.react('875224507206484019')
				}
			});
    }
}