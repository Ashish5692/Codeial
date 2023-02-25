const express= require('express');
const cookieParser = require('cookie-parser'); //for writing cookies
const app = express();
const port = 8000;
const expressLayouts = require('express-ejs-layouts');
const db = require('./config/mongoose');  //for database
//used for session cookie
const session = require('express-session');
//for authentication passport 
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
const MongoStore = require('connect-mongodb-session')(session);
const store = new MongoStore({
    uri: "mongodb://127.0.0.1/codeial_development",
    collection: "authStore"
});

//reading the POST request
app.use(express.urlencoded());

//setting up the cookie parser
app.use(cookieParser());

app.use(express.static('./assets'));

//function defining layouts
app.use(expressLayouts);

//extract style and scripts from sub pages into the layout
app.set('layout extractStyles',true);
app.set('layout extractScripts', true);



//setting up the view engine
app.set('view engine','ejs');
app.set('views','./views');


//middleware for authentication passport
//mongo store is used to store session cookie in the db
app.use(session({
    name: 'codeial',
    //TODO: change the secret before deployment in production mode
    secret : 'blahsomething',
    saveUninitialized : false,
    resave : false,
    cookie: {
        maxAge: (1000 *60 * 100)  //in milliseconds
    },
    store: store
}));

//need to tell app to use passport
app.use(passport.initialize());
//passport help in maintaing sessions..so passport.session will be used
app.use(passport.session());

//Whenever this function is called it will check whether a session cookie is present or not
//this functionis automatically getting called as middleware
app.use(passport.setAuthenticatedUser);


//use express router //another middleware
//before the server starts up it need to use the route //routing the home part
//do routes it bydefault fetches index

app.use('/', require('./routes'));

app.listen(port,function(err){
    if(err){
        console.log(`Error in running the server:${err}`); //Interpolation method
    }

    console.log(`Server is running on port: ${port}`);
});