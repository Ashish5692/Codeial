//initialize this class in home.ejs

// ChatEngine class send the request for conncetion
class ChatEngine{
    constructor(chatboxId, userEmail){ //email id of user who is initiating the connection so that we know who is sending the msg
        this.chatbox = $(`#${chatboxId}`);
        this.userEmail = userEmail;

        //initiate the connection on which port we have socket server
        this.socket = io.connect('http://localhost:5000') //io is given to us by socket.io file we included using cdn

        if(this.userEmail){ //only if there is users email
            this.connectionHandler();
        }
    }

    //create connectionhandler - it have to and fro interaction between observer(server) and subscriber(user)
    //connectionHandler needs to be called from constructor
    connectionHandler(){
        let self = this;
        
        //event on socket that takes place is connection
        this.socket.on('connect', function(){
            console.log('connection established using sockets...!');

            ////ask for join a room
            //while sending req to join room, i can send which room to join ,which user i want to chat with
            self.socket.emit('join_room',{
                user_email: self.userEmail,
                chatroom : 'codeial' //chatroom i want to join
            });

            //need to detect when user has joined
            self.socket.on('user_joined', function(data){
                console.log('a user joined!!', data);
            })
            
        });

        //send a message on clicking the send message button
        $('#send-message').click(function(){
            let msg = $('#chat-message-input').val();

            if(msg != ''){
                self.socket.emit('send_message',{
                    message: msg,
                    user_email: self.userEmail,
                    chatroom: 'codeial'
                });
            }
        });

        self.socket.on('receive_message',function(data){
            console.log('message received', data.message);

            let newMessage = $('<li>'); //create list items

            let messageType = 'other-message';

            if(data.user_email == self.userEmail){
                messageType = 'self-message';
            }

            newMessage.append($('<span>', {
                'html' : data.message
            }));

            newMessage.append($('<sub>', {
                'html' : data.user_email
            }));

            newMessage.addClass(messageType);

            $('#chat-messages-list').append(newMessage);


        })
    }

}