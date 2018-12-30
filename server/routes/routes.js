const path = require('path');

const express = require('express');
const router = express.Router();

const publicPath = path.join(__dirname, '../../public');

const generateToken = require('../generateToken');


// ===============================================================

const mongoose = require('mongoose');



mongoose.connect('mongodb://localhost/chat', { useNewUrlParser: true });

const User = mongoose.model('user', {
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

// const newUser = new User({ email: 'callummac@protonmail.com', username: 'callumm1999', password: 'password1234' })

// newUser.save((error, user) => {

// })

// User.find((error, users) => {
//     console.log('error', error);
//     console.log('users', users);
// });


// ===============================================================

router.post('/login', (req, res) => {
    console.log('login request');

    const { email, password } = req.body;
    if (!email || !password) return res.status(400).send('missing email or password');


    // setTimeout(() => {
    User.findOne({ email }, (error, user) => {

        if (!user) return res.status(404).send();

        if (password === user.password) {

            const token = generateToken({
                email: user.email,
                username: user.username,
                _id: user._id
            });

            return res.status(200).set('Authorization', token).send();


        }

        res.status(404).send();

    });
    // }, 3000);

});



router.get('/', function (req, res) {
    res.sendFile(path.join(publicPath, 'index.html'));
});


router.post('/send', (req, res) => {
    const { message } = req.body;
    console.log('message', message);
    return res.status(200).send();
});

module.exports = router;