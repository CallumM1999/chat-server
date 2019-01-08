const queueItem = require('../models/queueItem');

const clearQueue = ids => new Promise((resolve, reject) => {
	queueItem.remove({ messageID: { $in: ids } }, (err) => {
		if (err) reject(new Error(err));
		resolve({ success: true });
	});
});

module.exports = clearQueue;