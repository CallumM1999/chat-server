const socketIDs = {};
const users = {};
const io = require('./socket/socket').getIO();

const add = (socketID, userID, data) => {
    users[userID] = { ...data, socketID };

    socketIDs[socketID] = userID;
    console.log('added');
    setTimeout(() => {
        emitOnlineUsers(socketID);
    }, 1000);
};

const remove = (socketID) => {
    const userID = socketIDs[socketID];
    delete users[userID];
    delete socketIDs[socketID];
    console.log('removed');
    emitOnlineUsers();
};

const emitOnlineUsers = () => {
    const Users = Object.keys(users).map(item => Object.assign(users[item], { userID: socketIDs[users[item].socketID] }));
    io.emit('ONLINE_USERS', Users)
};

const findUser = (userID) => users.hasOwnProperty(userID) ? users[userID].socketID : false;

module.exports = {
    add,
    remove,
    findUser,
    clients: socketIDs,
    users
};