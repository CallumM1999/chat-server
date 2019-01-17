const jwt = require('jsonwebtoken');
const { JWT_KEY } = require('../../../config.json');

const verifyToken = (packet, next) => {
    const token = packet.handshake.query.token;
    if (!token) return next(new Error('no token'));

    jwt.verify(token, JWT_KEY, (err, decoded) => {
        if (err) return next(new Error('invalid token'));

        packet.decoded = decoded;
        next();
    });
};

module.exports = verifyToken;