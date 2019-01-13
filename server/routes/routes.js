const express = require('express');
const router = express.Router();

const findUser = require('../mongo/methods/findUser');
const registerUser = require('../mongo/methods/registerUser');

const validateNewUser = require('../validation/validateNewUser');

router.post('/login', (req, res) => {
	console.log('login request');

	const { email, password } = req.body;
	if (!email || !password) return res.status(400).send('missing email or password');

	findUser(email, password)
		.then(response => {
			if (!response.found) return res.status(404).send();
			if (!response.password) return res.status(404).send();
			res.status(200).set('Authorization', response.token).send();
		})
		.catch(err => {
			console.log('find user err', err);
		});
});

router.post('/register', async (req, res) => {
	console.log('register request');

	setTimeout(() => {
		const { email, password, fname, lname } = req.body;
		if (!email || !password || !fname || !lname) return res.status(400).send();

		// const validRequest = validateNewUser(email, password, fname, lname);
		// if (!validRequest) return res.status(400).send();

		registerUser(email, password, fname, lname)
			.then(response => {
				console.log('register user response', response);

				if (!response.emailFree) return res.status(404).send();
				if (response.success) return res.status(200).send();
				res.status(401).send();
			})
			.catch(err => console.log('register user error', err));
	}, 3000);
});

module.exports = router;