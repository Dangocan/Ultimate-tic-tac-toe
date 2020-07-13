let app = require('express')();
let server = app.listen(5000, () => {
    console.log('Server is running on port', server.address().port);
});

let io = require('socket.io')(server);

app.get('/', (req, res) => {
    console.log(req);
    console.log(res)
    res.redirect("/entrar")

});

app.get("/entrar", (req, res) => {
    res.sendFile(__dirname + '/entrar.html');
})

// let mylist = [];
io.on('connection', (socket) => {

    socket.emit("fezes", "cocô");

    // mylist.push(socket);
    // console.log(`a user connected: ${socket.id}`);
    // socket.on('disconnect', () => {
    //     console.log('user disconnected');
    // });
    socket.on('teste', (msg) => {
        console.log('message: ' + msg);
    });
    // socket.broadcast.emit("teste", "broadcast test from " + socket.id)
});

// setInterval(function () {
//     console.log("sending");
//     for (let socket of mylist) {
//         socket.emit("teste", "hello from list")
//     }
// }, 2500);




// // sending to sender-client only
// socket.emit('message', "this is a test");

// // sending to all clients, include sender
// io.emit('message', "this is a test");

// // sending to all clients except sender
// socket.broadcast.emit('message', "this is a test");

// // sending to all clients in 'game' room(channel) except sender
// socket.broadcast.to('game').emit('message', 'nice game');

// // sending to all clients in 'game' room(channel), include sender
// io.in('game').emit('message', 'cool game');

// // sending to sender client, only if they are in 'game' room(channel)
// socket.to('game').emit('message', 'enjoy the game');

// // sending to all clients in namespace 'myNamespace', include sender
// io.of('myNamespace').emit('message', 'gg');

// // sending to individual socketid
// socket.broadcast.to(socketid).emit('message', 'for your eyes only');

// // list socketid
// for (var socketid in io.sockets.sockets) {}
//  OR
// Object.keys(io.sockets.sockets).forEach((socketid) => {});