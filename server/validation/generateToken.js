const jwt = require('jsonwebtoken');
const { JWT_KEY } = require('../../config.json');
const key = process.env.JWT_KEY || key;

const generateToken = data => jwt.sign(data, key, { expiresIn: '7d' });

module.exports = generateToken;
