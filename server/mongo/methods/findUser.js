const User = require('../models/user');
const generateToken = require('../../generateToken');

const findUser = (email, password) => new Promise((resolve, reject) => {
	User.findOne({ email }, (error, user) => {
		if (!user) return resolve({ found: false });
		if (password !== user.password) return resolve({ found: true, password: false });

		const token = generateToken({
			email: user.email,
			fname: user.fname,
			lname: user.lname,
			_id: user._id
		});

		resolve({ found: true, password: true, token });
	});
});

module.exports = findUser;