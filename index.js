const express = require('express');
const env = require('./config/environment');
const logger = require('morgan');

const cookieParser = require('cookie-parser'); //for writing cookies
const app = express();
require('./config/view-helpers')(app);
const port = 8000;
const expressLayouts = require('express-ejs-layouts');
const db = require('./config/mongoose');  //for database
//used for session cookie
const session = require('express-session');
//for authentication passport 
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
const passportJWT = require('./config/passport-jwt-strategy');
const passportGoogle = require('./config/passport-google-oauth2-strategy');
const MongoStore = require('connect-mongo')(session);
// const store = new MongoStore({
//     uri: "mongodb://127.0.0.1/codeial_development",
//     collection: "authStore"
// });
//sass
const sassMiddleware = require('node-sass-middleware');
const flash = require('connect-flash');
const customMware = require('./config/middleware');


//setup the chat server to be used with socket.io
const chatServer = require('http').Server(app); //importing http with the server for the app
//pass on chatServer to chat_socket file
const chatSockets = require('./config/chat_sockets').chatSockets(chatServer);
chatServer.listen(5000);
console.log('chat server is listening on port 5000');
const path = require('path');

if (env.name == 'development') {
    app.use(sassMiddleware({
        src: path.join(__dirname, env.asset_path, 'scss'),                      //from where to pick up the scss file for converting to css
        dest: path.join(__dirname, env.asset_path, 'css'),
        debug: true,          //info we see in terminal when server is running,,show error,, true when running in production mode
        outputStyle: 'expanded',  //wanted mutiple line ,,for single line we do minification
        prefix: '/css'               //where should server look out for css files //now we are using middleware
    }));
}


//reading the POST request
app.use(express.urlencoded());

//setting up the cookie parser
app.use(cookieParser());

app.use(express.static(env.asset_path));

//make the uploads path available to browser
app.use('/uploads', express.static(__dirname + '/uploads'));//directory of index joined with uploads which means codeial/uploads is available now here

//function defining layouts
app.use(expressLayouts);

//using logger
app.use(logger(env.morgan.mode, env.morgan.options));

//extract style and scripts from sub pages into the layout
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);



//setting up the view engine
app.set('view engine', 'ejs');
app.set('views', './views');


//middleware for authentication passport
//mongo store is used to store session cookie in the db
// app.use(session({
//     name: 'codeial',
//     //TODO: change the secret before deployment in production mode
//     secret: env.session_cookie_key,
//     saveUninitialized: false,
//     resave: false,
//     cookie: {
//         maxAge: (1000 * 60 * 100)  //in milliseconds
//     },
//     store: store
// }));

app.use(session({
    name: 'codeial',
    // TODO change the secret before deployment in production mode
    secret: env.session_cookie_key,
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: (1000 * 60 * 100)
    },
    store: new MongoStore(
        {
        mongooseConnection: db,
        autoRemove: 'disabled'
    },
    function(err){
        console.log(err || 'connect-mongodb setup ok');
    }
    )
}));

//need to tell app to use passport
app.use(passport.initialize());
//passport help in maintaing sessions..so passport.session will be used
app.use(passport.session());

//Whenever this function is called it will check whether a session cookie is present or not
//this functionis automatically getting called as middleware
app.use(passport.setAuthenticatedUser);

//  setting up flash lib putting it after the session is used as it uses session cookies 
// flash messages will be set up in sessoin cookies(this cookie stores session information)
app.use(flash());
app.use(customMware.setFlash);

//use express router //another middleware
//before the server starts up it need to use the route //routing the home part
//do routes it bydefault fetches index

app.use('/', require('./routes'));

app.listen(port, function (err) {
    if (err) {
        console.log(`Error in running the server:${err}`); //Interpolation method
    }

    console.log(`Server is running on port: ${port}`);
});