const express = require('express');
const router = express.Router();
const findUser = require('../mongo/methods/findUser');

const validator = require('validator');

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



router.post('/register', (req, res) => {
	console.log('register request');

	const { email, password, fname, lname } = req.body;

	if (!email || !password || !fname || !lname) return res.status(400).send();


	if (!validator.isEmail(email)) return res.status(400).send();

	if (validator.trim(password).length < 8 || validator.trim(password).length >= 100) return res.status(400).send();
	if (!validator.isAscii(password)) return res.status(400).send();

	if (validator.trim(fname).length > 30 || validator.trim(lname).length > 30) return res.status(400).send();

	if (!validator.isAscii(fname) || !validator.isAscii(lname)) return res.status(400).send();

	res.status(200).send();
});

module.exports = router;