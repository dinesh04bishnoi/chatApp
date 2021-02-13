//node server which will handel socket io
const io = require('socket.io')(8000);

const users ={};

io.on('connection', socket=>{
    //if any new user join other users get know
    socket.on('new-user-joined', name =>{
        // console.log("new user",name);
         users[socket.id]=name;
         socket.broadcast.emit('user-joined',name);
    })
    //if someone send a message broadcast is to other users
    socket.on('send',message =>{
        socket.broadcast.emit('receive', {message: message, name: users[socket.id]})
    });
    //when user disconnect the chat
    socket.on('disconnect',message =>{
        socket.broadcast.emit('left', users[socket.id]);
        delete users[socket.id];
    });


})