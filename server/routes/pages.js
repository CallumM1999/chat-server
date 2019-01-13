const express = require('express');
const router = express.Router();

const path = require('path');
const publicPath = path.join(__dirname, '../', '../', 'public');


router.get('/register', (req, res) => {
	res.sendFile(path.join(publicPath, 'register.html'));
});

router.get('/success', (req, res) => {
	res.sendFile(path.join(publicPath, 'success.html'));
});

module.exports = router;