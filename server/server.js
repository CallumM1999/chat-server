const path = require('path');
const PORT = 3000;
const bodyParser = require('body-parser');
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.use(bodyParser.json());


app.get('/', function(req, res){
  res.sendFile(path.join(__dirname, '../public/index.html'));
});


app.post('/send', (req, res) => {
    const { message } = req.body;
    console.log('message', message)
    return res.status(200).send();
})

io.on('connection', function(socket){
  console.log('a user connected');

  socket.on('message', data => {
      console.log('new message =>', data)

      sendMessageToClients(data)
  })

});

const sendMessageToClients = newMessage => {
    io.emit('sendMessageToClients', newMessage)
}



http.listen(PORT, () => console.log('server listening on port ', PORT));
