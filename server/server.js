const express = require('express');
const bodyParser = require('body-parser');
var http = require('http');
const cors = require('cors');

const app = express();
const server = http.Server(app);
const PORT = process.env.PORT || 3000;

const serveGzipped = require('./middleware/serveGzipped');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

app.get('*.js', serveGzipped('text/javascript'))
app.get('*.css', serveGzipped('text/css'))

app.use(express.static('public'));

app.use(require('./routes/pages'));
app.use(require('./routes/routes'));
app.use(require('./routes/messages'));

const io = require('./socket/socket').start(server);
io.use(require('./socket/socketMiddleware/verifyToken'));
require('./socket/handleSocket')(io);

const mongoose = require('mongoose');
const DB_URL = !!process.env.DB_URL ? process.env.DB_URL : 'mongodb://localhost/chat';

mongoose.connect(DB_URL, { useNewUrlParser: true });

server.listen(PORT, () => console.log('server listening on port ', PORT));