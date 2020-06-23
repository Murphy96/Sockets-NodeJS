const express = require('express');
const path = require('path');
const app = express();


app.set('port',process.env.PORT || 3000);


app.use(express.static(path.join(__dirname,'public')));


const server = app.listen(app.get('port'),()=>{
    console.log("el servidor esta funcionando en el puerto "+app.get('port'));
});


const socketIO = require('socket.io');
const io = socketIO(server);


io.on('connection' ,(socket)=>{
    //console.log(socket.id);
    socket.on('chat:message',(data)=>{
        //console.log(data);
        //io.sockets.emit('')
        io.sockets.emit('chat:send',data);
    });
    socket.on('chat:typing',(data)=>{
        socket.broadcast.emit('chat:typingEnv',data);
    });
});



