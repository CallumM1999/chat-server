const mongoose = require('mongoose');

const room = mongoose.model('room', {
	title: {
		type: String,
		required: true
	},
	time: {
		type: String,
		required: true
	},
	room: {
		type: String,
		required: true
	},
	sender: {
		type: String,
		required: true
	}

});

module.exports = room;