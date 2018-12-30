const jwt = require("jsonwebtoken");
// const jwt_key = process.env.TOKEN_SECRET || 'oN6nuiwcOVW06GbLwKWaCH5ohap9ieMlxwEb6zENFeurbAVhGBD74DQekaDbGf4vCZfPVM6tZkBtiCdiww2Rb34qq7CkEQoqF8y5';
const jwt_key = "secret";

const generateToken = data => {
    return jwt.sign(data, jwt_key, { expiresIn: "7d" });
};

module.exports = generateToken;
