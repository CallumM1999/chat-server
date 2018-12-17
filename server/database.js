// const mongoose = require('mongoose');

const Message = require('./models/message')


const addMessage = (message, user) => {
    return new Promise((resolve, reject) => {
        // console.log('adding message to database');;

        const newMessage = new Message(message);

        newMessage.save((err, res) => {
            if (err) reject(new Error(err));

            resolve(res)
        });
    })
}


module.exports = {
    addMessage
}