const verifyMessage = require('./socketMiddleware/verifyMessage');
const addMessage = require('../mongo/methods/addMessage');
const userSearch = require('../mongo/methods/userSearch');
const escape = require('validator/lib/escape');

const clients = require('../clients');
const queue = require('../queue');
const io = require('./socket').getIO();

const handleSocket = io => {
    io.on('connection', socket => {
        userConnect(socket.id, socket.decoded);
        socket.use(verifyMessage);

        socket.on('message', (message, fn) => {
            const sanitizedMessage = { ...message, msg: escape(message.msg) }
            handleMessage(sanitizedMessage, socket.id);
            if (fn) fn({ success: true });
        });

        socket.on('userSearch', async (queryString, _id, cb) => {
            const sanitizedQuery = escape(queryString)
            const userData = await userSearch(sanitizedQuery, _id);
            cb(userData);
        });

        socket.on('getRoomData', (room, cb) => cb({ ...clients.users[room], roomType: 'user' }));

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
            if (messages.length > 0) {
                console.log('missed messages', messages)
                io.to(socketID).emit('clientMissedMessages', messages)
            }
        })
        .catch(err => console.log('get queue err', err));
};

const handleMessage = (msg, socketID) => {
    const senderUserID = clients.clients[socketID];
    const recipient = clients.users[msg.room];

    addMessage({ ...msg, sender: senderUserID })
        .then(({ _id }) => {
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

        })
        .catch(err => console.log('handle message err', err));
};

const userDisconnect = ({ id }) => clients.remove(id);

module.exports = handleSocket;