const express = require('express');
const socketio = require('socket.io');
const http = require('http');
const cors = require('cors');

const { addUser, removeUser, getUser, getUsersInRoom} = require('./users.js');

const PORT = process.env.PORT || 5000;

const router = require('./router');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

// app.use(cors({
//     origin: "http://192.168.43.172:3000/socket.io/?EIO=4&transport=polling&t=Niwervw",
// }));

io.on('connection', (socket)=>{
    // console.log('We have a new connection!!!');

    socket.on('join',({name, room}, callback)=> {
        const { error, user} = addUser({ id: socket.id, name, room});

        if(error) return callback(error);
        
        socket.emit('message', { user:'admin', text: `${user.name}, welcome to the room ${user.room}.`});
        socket.broadcast.to(user.room).emit('message', { user: 'admin', text: `${user.name} has joined!` });
        socket.join(user.room);

        io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room)});


        callback();

        // console.log(name, room);

        // const error = true;

        // if(error){

        //     callback({error:'error'});
        // }
    });

    socket.on('sendMessage', (message, callback)=>{
        const user = getUser(socket.id);

        io.to(user.room).emit('message', { user: user.name, text: message});
        io.to(user.room).emit('roomData',{ room: user.room, users: getUsersInRoom(user.room)});

        callback();
    });

    socket.on('disconnect', ()=>{
        // console.log('User had left!!!');
        const user = removeUser(socket.id);

        if(user){
            io.to(user.room).emit('message', {user:'admin', text:`${user.name} has left!`});

        }
    });
})
app.use(cors);

app.use(router);

server.listen(PORT, ()=> console.log(`Server has started on port ${PORT}`));