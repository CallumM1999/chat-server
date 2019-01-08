const jwt = require('jsonwebtoken');
const jwt_key = 'secret';
const generateToken = data => jwt.sign(data, jwt_key, { expiresIn: '7d' });

module.exports = generateToken;
