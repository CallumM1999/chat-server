const Message = require('../models/message');

const addMessage = ({ msg, time, room, sender }) => new Promise((resolve, reject) => {
    const newMessage = new Message({ message: msg, time, room, sender });

    newMessage.save((err, res) => {
        if (err) reject(new Error(err));
        resolve(res);
    });
});

module.exports = addMessage;