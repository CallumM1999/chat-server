const express = require('express');
const router = express.Router();
const queue = require('../queue');
const verifyToken = require('../middleware/verifyToken')

router.post('/messages', verifyToken, async (req, res) => {
    const { decoded } = req.body;
    const messages = await queue.get(decoded._id);
    const formattedMessages = messages.map(({ message, sender, time }) => ({ msg: message, room: sender, sender, time }))
    res.send({ messages: formattedMessages });
});

module.exports = router;