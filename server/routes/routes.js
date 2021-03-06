const express = require('express');
const router = express.Router();
const validator = require('validator');
const bcrypt = require('bcrypt')

const findUser = require('../mongo/methods/findUser');
const registerUser = require('../mongo/methods/registerUser');
const deleteAccount = require('../mongo/methods/deleteAccount')

const validateNewUser = require('../validation/validateNewUser');

const verifyToken = require('../middleware/verifyToken')


router.post('/login', (req, res) => {
    console.log('login request');

    const { email, password } = req.body;
    if (!email || !password) return res.status(400).send('missing email or password');

    const normalizedEmail = validator.normalizeEmail(email.trim());

    findUser(normalizedEmail, password)
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

    const { email, password, fname, lname } = req.body;
    if (!email || !password || !fname || !lname) return res.status(400).send();

    const normalizedEmail = validator.normalizeEmail(email.trim());
    const normalizedFname = fname.trim().toLowerCase();
    const normalizedLname = lname.trim().toLowerCase();

    const validRequest = validateNewUser(normalizedEmail, password, normalizedFname, normalizedLname);
    if (!validRequest) return res.status(400).send();

    const hash = await bcrypt.hash(password, 10)

    registerUser(normalizedEmail, hash, normalizedFname, normalizedLname)
        .then(response => {
            if (!response.emailFree) return res.status(404).send();
            if (response.success) return res.status(200).send();
            res.status(401).send();
        })
        .catch(err => console.log('register user error', err));
});

router.post('/delete', verifyToken, async (req, res) => {
    const { decoded } = req.body;
    const deleted = await deleteAccount(decoded._id);

    if (deleted) res.status(200).send();
    else res.status(404).send();
})

module.exports = router;