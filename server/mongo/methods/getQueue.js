const queueItem = require('../models/queueItem');
const Message = require('../models/message');

const getQueue = recipient => new Promise((resolve, reject) => {
	queueItem.find({ recipient }, (err, res) => {
		if (err) reject(new Error(err));
		const ids = res.map(item => item.messageID);
		Message.find({ _id: { $in: ids } }, (err, messages) => {
			if (err) reject(new Error(err));
			resolve({ messages, ids });
		});
	});
});

module.exports = getQueue;