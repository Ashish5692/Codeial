module.exports.profile = function(req,res){
   // res.end('<h1>User Profile</h1>');
   return res.render('user_profile',{
    title: "User"
});
}
//This controller is ready to be accessed by a router,that route needs to be accessed by web browser
//web brower tells me to go to this route then the controller or action returns whatever data it have. otherwise if action is not present -error is thrown that you cannot access it
//now we need to create a route for it.
//everytime we create a controller 's action if i wanted it to be accessible it needs a route
