
module.exports.chatSockets = function (socketServer) {
    let io = require('socket.io')(socketServer, {
        cors: '*' // *means any website can get access to port 5000
    });  //all interactions via sockets using chat server will be done here // io will handle the connections ,io has all the sockets

    //io.connect fires event called connection
    //when connection is established we get callback via sockets
    //socket is an object with lot of properties of the user who is sending   similarly we have disconnect also (Later)

    //it receives the connection and it emmits back that you are connected using connect event
    io.sockets.on('connection', function (socket) {
        console.log('new connection received', socket.id);

        //when client disconnect an automatic disconnect fires
        socket.on('disconnect', function () {
            console.log('socket disconnected!');
        });

        //user sitting on pc has sent req to join the room and below code is detecting that event and data is printed in server logs

        //when above event is emitted it is received on chat sockets
        //.on listens to the event sent by the client
        socket.on('join_room', function (data) {
            console.log('joining request receive', data);

            //after joining req has been received i want socket to be join to that room,1 socket join to that room
            socket.join(data.chatroom); // if chatroom with name codeial already exist user will be connected with that chatroom, if it do not exist it will create that chatroom and enter the user into it

            //notification to all users(he himself also) if someone new joined the chatroom i.r emitting in specific chatroom for it we use io
            io.in(data.chatroom).emit('user_joined', data);


        });

        //detect send_message and broadcast to everyone in the room
        socket.on('send_message', function(data){
            io.in(data.chatroom).emit('receive_message',data);
        });

    });
}