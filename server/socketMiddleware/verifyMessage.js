const verifyMessage = (packet, next) => {
	if (packet[0] !== 'message') return next();
	const { msg, room } = packet[1];

	if (!msg || !room) return next(new Error(`Missing Fields:${(!msg ? ' msg' : '')}${(!room ? ' room' : '')}`));

	if (room.includes('group__')) {
		console.log('GGRROOUUPP');


		// if (!rooms.store.hasOwnProperty(room))
		//     return next(new Error("Room does not exist"));

		// if (rooms.store[room].members.length <= 1)
		//     return next(new Error("message sent to empty room"));

		// // console.log('user', user)
		// if (!rooms.store[room].members.find(item => item === user._id))
		//     return next(new Error("Sender is not in room"));

	}

	// packet[1].time = Date.now();

	next();
};

module.exports = verifyMessage;