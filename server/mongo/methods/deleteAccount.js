const User = require('../models/user');

const deleteAccount = _id => new Promise(async (resolve) => {
    User.findByIdAndDelete(_id, (undefined, user) => {
        resolve(user)
    })
});

module.exports = deleteAccount;