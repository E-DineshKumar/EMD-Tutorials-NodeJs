const express = require('express')
const app = express()
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/',function(req,res){
res.sendFile(__dirname + '/index.html');
})

io.on('connection', function(socket){
  console.log("user connected");
  socket.on('chat message', function(msg){
    console.log('message: ' + msg);
  });
});
http.listen(3000, '0.0.0.0', function () {
  console.log('Tutorial app listening on port 3000!')
})
