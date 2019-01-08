const addToQueue = require('./mongo/methods/addToQueue');
const getQueue = require('./mongo/methods/getQueue');
const clearQueue = require('./mongo/methods/clearQueue');

const add = (message, recipient) => new Promise((resolve, reject) => {
	addToQueue(message, recipient)
		.then(res => resolve(res))
		.catch(err => reject(new Error(err)));
});

const get = (recipient) => new Promise(async (resolve, reject) => {
	const { messages, ids } = await getQueue(recipient);
	await clearQueue(ids);
	resolve(messages);
});

module.exports = {
	add,
	get
}; 