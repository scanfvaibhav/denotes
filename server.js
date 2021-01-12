const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const socketIO = require('socket.io');
require('./models/db');
const Chat = require('./models/chat');
const app = express();

const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(require('cors')());
app.use(require('helmet')());
app.use('/api/users', require('./routes/users'));
app.use('/api/login', require('./routes/login'));
app.use('/api/post', require('./routes/posts'));
app.use('/api/message', require('./routes/message'));
app.use('/api/getApkDetails', require('./routes/apkDetails'));

const server=app.listen(PORT, () => console.log(`App running on port ${PORT}`)  );

const io = socketIO(server);

// Production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendfile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}
var joinRoom = function(msg,socket){
  let myRoom =  "room-"+msg.from+"-"+msg.to;
  let guestRoom = "room-"+msg.to+"-"+msg.from;
  let room="";
  if(io.nsps['/'].adapter.rooms[guestRoom] && io.nsps['/'].adapter.rooms[guestRoom].length > 0) {
      room = guestRoom;
  } else{
      room = myRoom;
    }
  socket.join(room);
    return room;
};
  
io.on('connection', function(socket){
  console.log('a user connected');
  socket.on('disconnect', function(){
    console.log('User Disconnected');
  });
  socket.on('typing', function(msg){
    var room = joinRoom(msg,socket);
    io.sockets.in(room).emit('typing',{name:msg.from,typing:msg.typing});
  });
  socket.on('receipt', async function(msg){
    var room = joinRoom(msg,socket);
    await Chat.updateMany({$or:[{from: msg.to,to:msg.from,received:false}]}, {$set: { "read" : msg.read,'received':msg.received}});
    const chats = await Chat.find({$or:[{from: msg.to,to:msg.from},{from: msg.from,to:msg.to}]});
  
    io.sockets.in(room).emit('newMessage', chats);
  });
  socket.on('message', async function(msg){
    const newChat = new Chat({
      text: msg.text,
      from: msg.from,
      to: msg.to,
      read: false,
      sent:true,
      received:false,
      date: Date.now()
    });
  
    var room = joinRoom(msg,socket);
     
    await newChat.save();
    //const chats = await Chat.find({$or:[{from: msg.to,to:msg.from},{from: msg.from,to:msg.to}]});
    socket.broadcast.emit('newMessage', newChat);
  });
     
});
    