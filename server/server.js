const express = require('express');
const bodyParser = require('body-parser');
var http = require('http');
const cors = require('cors');

const app = express();
const server = http.Server(app);
const PORT = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use(express.static('public'));
app.use(require('./routes/routes'));

const io = require('./socket').start(server);
io.use(require('./socketMiddleware/verifyToken'));
require('./handleSocket')(io);

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/chat', { useNewUrlParser: true });

const rooms = require('./rooms');
rooms.add('sumtitle', 'group__anotherid');

server.listen(PORT, () => console.log('server listening on port ', PORT));