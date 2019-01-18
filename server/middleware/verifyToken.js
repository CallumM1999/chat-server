const jwt = require('jsonwebtoken');
const JWT_KEY = process.env.JWT_KEY || require('../../config.json').JWT_KEY;

const verifyToken = (req, res, next) => {
    const { token } = req.body;
    if (!token) return res.status(404).send();
    jwt.verify(token, JWT_KEY, (err, decoded) => {
        if (err) return next(new Error('invalid token'));
        req.body.decoded = decoded;
        next();
    })
}

module.exports = verifyToken;