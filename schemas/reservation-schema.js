const mongoose = require('mongoose')

const reqString = {
	type: String,
	required: true
}
const reservationSchema = mongoose.Schema({
	_id: reqString,
	phone: reqString,
	cName: reqString,
	location: reqString,
	part: reqString,
	brand: reqString,
	model: reqString,
	date: reqString,
	time: reqString
})


module.exports = mongoose.model('reservations', reservationSchema)