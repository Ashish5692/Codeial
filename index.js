const express= require('express');
const app = express();
const port = 8000;

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