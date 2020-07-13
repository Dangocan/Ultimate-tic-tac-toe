let express = require('express');
let app = express();
let session = require('express-session')
app.use(session({
    secret: 'keyboard cat',
}))
let server = app.listen(5000, () => {
    console.log('Server is running on port', server.address().port);
});

let io = require('socket.io')(server);


app.use(express.static(__dirname + "/public"));
app.get('/', (req, res) => {
    
    res.sendFile('/index.html');
});

// app.get("/entrar", (req, res) => {
//     res.sendFile("/entrar.html");
// })

io.on('connection', socket => {

});