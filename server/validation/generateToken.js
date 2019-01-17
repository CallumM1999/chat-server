const jwt = require('jsonwebtoken');
const { JWT_KEY } = require('../../config.json');
const generateToken = data => jwt.sign(data, JWT_KEY, { expiresIn: '7d' });

module.exports = generateToken;
