const verifyMessage = require('./socketMiddleware/verifyMessage');
const addMessage = require('./mongo/methods/addMessage');
const userSearch = require('./mongo/methods/userSearch');

const clients = require('./clients');
const rooms = require('./rooms');
const queue = require('./queue');
const io = require('./socket').getIO();

const handleSocket = io => {
	io.on('connection', socket => {
		userConnect(socket.id, socket.decoded);
		socket.use(verifyMessage);

		socket.on('message', (message, fn) => {
			handleMessage(message, socket.id);
			if (fn) fn({ success: true });
		});

		socket.on('userSearch', async (queryString, _id, cb) => {
			console.log('search query', queryString);

			const userData = await userSearch(queryString, _id);
			console.log('search done', userData);
			cb(userData);
		});

		socket.on('getRoomData', (room, cb) => { // client requires data on recieved message
			console.log('request for room data', room);
			if (room.includes('group__')) {
				console.log('is group');
				const data = rooms.store[room];

				cb({ type: 'group', title: data.title });
			} else {
				cb({ ...clients.users[room], roomType: 'user' });
			}
		});

		socket.on('disconnect', reason => {
			console.log('client disconnect', socket.id, reason);
			userDisconnect(socket);
		});
	});
};

const userConnect = (socketID, { _id, fname, lname }) => {
	console.log('user connected');
	clients.add(socketID, _id, { fname, lname });

	queue
		.get(_id)
		.then(queue => {
			const messages = queue.map(({ message, sender, time }) => ({ msg: message, room: sender, sender, time }));
			io.to(socketID).emit('clientMissedMessages', messages);
		})
		.catch(err => console.log('get queue err', err));
};

const handleMessage = (msg, socketID) => {
	console.log('handle message', msg);
	const senderUserID = clients.clients[socketID];
	// const sender = clients.users[senderUserID];
	const recipient = clients.users[msg.room];

	addMessage({ ...msg, sender: senderUserID })
		.then(({ _id }) => {
			const type = msg.room.includes('group__') ? 'group' : 'user';
			console.log('type', type);
			if (type === 'user') {
				if (!!recipient && recipient.socketID) {
					io.to(recipient.socketID).emit('sendMessageToClients', {
						msg: msg.msg,
						time: msg.time,
						room: senderUserID,
						sender: senderUserID
					});
				} else {
					console.log('add to inbox', _id);
					queue
						.add(_id, msg.room)
						.catch(err => console.log('queue add err', err));
				}
			} else {
				console.log('handle group message');

				// rooms.store[msg.room].members.map(item => {
				// 	const socketID = clients.findUser(item);

				// 	if (socketID) {
				// 		io.to(socketID).emit('sendMessageToClients', [msg]);
				// 	} else {
				// 		console.log('add to inbox');
				// 		// queue
				// 		//     .add(_id, msg._id)
				// 		//     .catch(err => console.log("queue add err", err));
				// 	}
				// });
			}
		})
		.catch(err => console.log('handle message err', err));
};

const userDisconnect = ({ id }) => clients.remove(id);

module.exports = handleSocket;