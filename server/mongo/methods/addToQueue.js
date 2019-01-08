const queueItem = require('../models/queueItem');

const addToQueue = (messageID, recipient) => new Promise((resolve, reject) => {
	const newItem = new queueItem({ messageID, recipient });

	newItem.save((err, res) => {
		if (err) reject(new Error(err));
		resolve(res);
	});
});

module.exports = addToQueue;