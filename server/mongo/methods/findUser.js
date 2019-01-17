const User = require('../models/user');
const generateToken = require('../../validation/generateToken');
const bcrypt = require('bcrypt');

const findUser = (email, password) => new Promise(async (resolve, reject) => {
    User.findOne({ email }, async (error, user) => {
        if (!user) return resolve({ found: false });

        const validPassword = await bcrypt.compare(password, user.password)

        if (!validPassword) return resolve({ found: true, password: false });

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