const express= require('express');
const cookieParser = require('cookie-parser'); //for writing cookies
const app = express();
const port = 8000;
const expressLayouts = require('express-ejs-layouts');
const db = require('./config/mongoose');  //for database

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

//use express router //another middleware
//before the server starts up it need to use the route //routing the home part
//do routes it bydefault fetches index

app.use('/', require('./routes'));

//setting up the view engine
app.set('view engine','ejs');
app.set('views','./views');



app.listen(port,function(err){
    if(err){
        console.log(`Error in running the server:${err}`); //Interpolation method
    }

    console.log(`Server is running on port: ${port}`);
});