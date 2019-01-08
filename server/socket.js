const socketIO = require('socket.io');

let io;
const start = server => {
	io = socketIO(server);
	return io;
};

const getIO = () => io;

module.exports = {
	start,
	getIO
};