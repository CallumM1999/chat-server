const jwt = require('jsonwebtoken');

const verifyToken = (packet, next) => {
	const token = packet.handshake.query.token;
	if (!token) return next(new Error('no token'));

	jwt.verify(token, 'secret', (err, decoded) => {
		if (err) console.log('token invalid', err);
		if (err) return next(new Error('invalid token'));

		packet.decoded = decoded;
		next();
	});
};

module.exports = verifyToken;