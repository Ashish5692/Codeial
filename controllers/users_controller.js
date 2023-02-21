const User = require('../models/user');

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


//Now adding couple of actions 

//render the sign in page
module.exports.signUp = function(req,res){
    return res.render('user_sign_up',{
        title: "Codeial | Sign Up"
    });
}

//render the sign in page
module.exports.signIn = function(req,res){
    return res.render('user_sign_in',{
        title: "Codeial | Sign In"
    });
}

//get the sign up data
module.exports.create = function(req,res){
    if (req.body.password!= req.body.confirm_password){
        return res.redirect('back');
    }
    //if same try to find out user with same email id beacuse email need to be unique
    User.findOne({email: req.body.email}, function(err,user){
        if(err){
            console.log('Error in finding user in signing up');
            return;
        }
        if(!user){
            User.create(req.body, function(err,user){
                if(err){
                    console.log('error in creating user while signing up');
                    return;
                }
                return res.redirect('/users/sign-in');
            })
        }else{return res.redirect('back'); 
        }

    });

}

// sign in And create session for user
module.exports.createSession = function(req,res){
    //TODO LATER
}
