const jwt = require('jsonwebtoken');
const JWT_KEY = process.env.JWT_KEY || require('../../config.json').JWT_KEY;
const generateToken = data => jwt.sign(data, JWT_KEY, { expiresIn: '7d' });

module.exports = generateToken;
