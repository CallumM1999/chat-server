const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
var http = require("http");

const jwt = require("jsonwebtoken");
// const jwt_key = 'secret';

const socketIO = require("socket.io");

const app = express();
const server = http.Server(app);
const io = socketIO(server);

const PORT = process.env.PORT || 3000;

const queue = require("./queue");
const database = require("./database");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(cors());

app.use(express.static("public"));

app.use(require("./routes/routes"));

const clients = [];

const rooms = {
    1: {
        members: ["5c11429cdf1cd416b2b8b452", "5c1229362280a7dfb5f5f97f"]
    },
    2: {
        members: ["5c11429cdf1cd416b2b8b452", "5c1229362280a7dfb5f5f97f"]
    },
    3: {
        members: ["5c11429cdf1cd416b2b8b452", "5c1229362280a7dfb5f5f97f"]
    },
    4: {
        members: ["5c11429cdf1cd416b2b8b452", "5c1229362280a7dfb5f5f97f"]
    },
    5: {
        members: ["5c11429cdf1cd416b2b8b452", "5c1229362280a7dfb5f5f97f"]
    },
    6: {
        members: ["5c11429cdf1cd416b2b8b452", "5c1229362280a7dfb5f5f97f"]
    }
};

// authenticate socket - user token
io.use((packet, next) => {
    // console.log('packet', packet.id)

    const token = packet.handshake.query.token;
    // console.log('connect token', token)
    if (!token) return next(new Error("no token"));

    jwt.verify(token, "secret", (err, decoded) => {
        if (err) console.log("token invalid", err);
        if (err) return next(new Error("invalid token"));

        // console.log('decoded', decoded)
        // userConnect(packet, { username: 'some username', _id: 'someid' });
        userConnect(packet, decoded);

        next();
    });
});

io.on("connection", socket => {
    socket.use((packet, next) => {
        if (packet[0] !== "message") return next();

        const { message, room } = packet[1];

        if (!message || !room)
            return next(new Error("missile fields (message or room)"));

        if (!rooms.hasOwnProperty(room))
            return next(new Error("Room does not exist"));

        if (rooms[room].members.length <= 1)
            return next(new Error("message sent to empty room"));

        const sender = clients[socket.id]._id;

        if (!rooms[room].members.find(item => item === sender))
            return next(new Error("Sender is not in room"));

        packet[1] = {
            ...packet[1],
            sender,
            time: Date.now()
        };

        next();
    });

    // socket.on('maintainConnection', data => {
    // 	// console.log('maintaining connection', socket.id)
    // });

    socket.on("message", (message, fn) => {
        handleMessage(message, socket);

        if (fn) fn({ success: true });
    });

    socket.on("disconnect", reason => {
        console.log("client disconnect", socket.id, reason);
        userDisconnect(socket);
    });
});

const handleMessage = (message, { id }) => {
    console.log("handle message", message, id);

    database
        .addMessage(message, id)
        .then(res => {
            // console.log('database message id', res)

            const { room } = message;

            rooms[room].members.map(item => {
                let found = false;
                for (let key in clients) {
                    if (clients[key]._id === item) {
                        found = true;

                        if (key === id) {
                            // dont send to self
                            break;
                        }
                        console.log("sending to client");
                        io.to(key).emit("sendMessageToClients", [message]);
                        break;
                    }
                }

                if (!found) {
                    console.log("add to inbox");
                    queue
                        .add(res._id, item)
                        .then(() => console.log("queue add success"))
                        .catch(err => console.log("queue add err", err));
                }
            });
        })
        .catch(err => console.log("handle message err", err));
};

const userConnect = ({ id }, { username, _id }) => {
    console.log("user connected", id, username, _id);

    clients[id] = {
        username,
        _id
    };

    queue
        .get(_id)
        .then(res => {
            if (res.length > 0) io.to(id).emit("sendMessageToClients", res);
        })
        .catch(err => console.log("get queue err", err));
};

const userDisconnect = ({ id }) => delete clients[id];

server.listen(PORT, () => console.log("server listening on port ", PORT));
