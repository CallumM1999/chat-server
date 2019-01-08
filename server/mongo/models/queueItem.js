const mongoose = require('mongoose');

const queueItem = mongoose.model('queue', {
    messageID: {
        type: String,
        required: true
    },
    recipient: {
        type: String,
        required: true
    }
});

module.exports = queueItem;