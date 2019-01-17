const jwt = require('jsonwebtoken');

try {
    const { JWT_KEY } = require('../../config.json');
} catch (e) {
    const JWT_KEY = process.env.JWT_KEY;
}


const generateToken = data => jwt.sign(data, JWT_KEY, { expiresIn: '7d' });

module.exports = generateToken;
