const express = require('express');
const router = express.Router();
const findUser = require('../mongo/methods/findUser');

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

module.exports = router;