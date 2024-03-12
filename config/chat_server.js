
module.exports.chatserver=(server)=>{
    const { Server } = require('socket.io');
    const io = new Server(server);


    const users={};


    io.on('connection',(socket)=>{
        socket.on('new-user-joined', (msg)=>{
            console.log("New User", msg);
            users[socket.id]=msg;
            socket.broadcast.emit('user-joined', (msg));
        });

        socket.on('chat message',(value,name)=>{
            socket.broadcast.emit('chat message',value,users[socket.id]);
        })
        socket.on('disconnect',message=>{
            socket.broadcast.emit('leave',users[socket.id]);
            delete users[socket.id];
        })
    })
    



}
