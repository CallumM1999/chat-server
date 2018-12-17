const mongoose = require('mongoose');

const item = mongoose.model('queue', { 
    message: {
        type: String,
        required: true
    },
    recipient: {
        type: String,
        required: true
    }

});

module.exports = item;