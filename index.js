const express = require('express');
var app = express();
const http = require('http');
const socketIO = require('socket.io');
var cors = require('cors');
app.use(cors());
const bodyParser = require('body-parser');

var routing = require("./routing");

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

var server = http.createServer(app);

var io = socketIO.listen(server);

io.on("connection",function(socket){
    console.log("connected");

    socket.emit("newEmail",{"name":"yogendra","age":23});

    socket.on("callbackTest",function(data, callback){
      console.log("success");
      callback("send success");
    });

    socket.on("createEmail",function(data){

      console.log("Created Email is "+JSON.stringify(data));
      //socket.emit("newMessage",{"hola":"hola","age":23333});
      socket.broadcast.emit("newMessage",{"hola":"hola","age":23333});
    });

    socket.on("disconnect",function(){
      console.log("disconnected");
});



});

app.use(express.static('views'));
app.use(bodyParser.json({
  limit: '50mb'
}));
app.use(bodyParser.urlencoded({
  limit: '50mb',
  extended: true
}));


console.log(`Project Dir ${__filename}`);
console.log(`Project Dir ${__dirname}`);


app.use('/', routing);

server.listen(5555);
