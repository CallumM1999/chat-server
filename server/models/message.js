const mongoose = require('mongoose');

const message = mongoose.model('message', { 
    message: {
        type: String,
        required: true
    },
    time: {
        type: String,
        required: true
    },
    room: {
        type: String,
        required: true
    },
    sender: {
        type: String,
        required: true
    }

});

module.exports = message;