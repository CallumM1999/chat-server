const User = require('../models/user');

const getUserData = (room) => new Promise(async (resolve, reject) => {
    User.findById(room, (undefined, user) => {
        resolve(user);
    })
});

module.exports = getUserData;