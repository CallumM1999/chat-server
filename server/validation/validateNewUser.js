const validator = require('validator');

const validateNewUser = (email, password, fname, lname) => {
	if (!validator.isEmail(email)) return false;
	if (validator.trim(password).length < 8 || validator.trim(password).length > 100) return false;
	if (!validator.isAscii(password)) return false;
	if (validator.trim(fname).length > 30 || validator.trim(lname).length > 30) return false;
	if (!validator.isAscii(fname)) return false;
	if (!validator.isAscii(lname)) return false;
};

module.exports = validateNewUser;