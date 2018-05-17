const express = require('express')
const app = express()
var http = require('http').Server(app);
var io = require('socket.io')(http);
var chatrooms = [{ coursename: "Angular_4", numUsers: 0 }, { coursename: "PYTHON", numUsers: 0 }, { coursename: "NodeJS", numUsers: 0 }]


for (let i of chatrooms) {
    var room = io.of('/' + i.coursename);
    room.on('connection', (socket) => {
        var addedUser = false;
        console.log("user connected");

        // when the client emits 'new message', this listens and executes
        socket.on('new message', (data) => {
            console.log(data);
            // we tell the client to execute 'new message'
            socket.broadcast.emit('new message', {
                username: socket.username,
                message: data
            });
        });

        // when the client emits 'add user', this listens and executes
        socket.on('add user', (username) => {
            if (addedUser) return;

            // we store the username in the socket session for this client
            socket.username = username;
            ++i.numUsers;
            addedUser = true;
            socket.emit('login', {
                numUsers: i.numUsers
            });
            // echo globally (all clients) that a person has connected
            socket.broadcast.emit('user joined', {
                username: socket.username,
                numUsers: i.numUsers
            });
        });


        // when the user disconnects.. perform this
        socket.on('disconnect', () => {
            if (addedUser) {
                --i.numUsers;

                // echo globally that this client has left
                socket.broadcast.emit('user left', {
                    username: socket.username,
                    numUsers: i.numUsers
                });
            }
        });

    });
}
http.listen(3000, '0.0.0.0', function () {
    console.log('Tutorial app listening on port 3000!')
})
