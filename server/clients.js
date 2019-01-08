const socketIDs = {};
const users = {};
const io = require('./socket').getIO();

const add = (socketID, userID, data) => {
	users[userID] = { ...data, socketID };

	socketIDs[socketID] = userID;
	console.log('added');
	emitOnlineUsers();
	setTimeout(() => {
		// wait till socket is initiated for client
		getOnlineUsers(socketID);
	}, 1000);
};

const remove = (socketID) => {
	const userID = socketIDs[socketID];
	delete users[userID];
	delete socketIDs[socketID];
	console.log('removed');
	emitOnlineUsers();
};

const emitOnlineUsers = () => io.emit('ONLINE_USERS', Object.keys(users).map(item => users[item]));
const getOnlineUsers = socketID => io.to(socketID).emit('ONLINE_USERS', Object.keys(users).map(item => ({ ...users[item], userID: socketIDs[users[item].socketID] })));
const findUser = (userID) => users.hasOwnProperty(userID) ? users[userID].socketID : false;

module.exports = {
	add,
	remove,
	findUser,
	clients: socketIDs,
	users
};