const User = require('../models/user');

const registerUser = (email, password, fname, lname) => new Promise(async (resolve, reject) => {

	User.find({ email }, (err, user) => {
		if (user.length !== 0) return resolve({ emailFree: false });

		const newUser = User({ email, password, fname, lname });
		newUser.save().then(res => resolve({ emailFree: true, success: true }));
	});
});

module.exports = registerUser;