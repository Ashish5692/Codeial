const Post = require('../models/post'); //referencing to the model to find all the post

const User = require('../models/user'); //requiring users to get list of all users

//IN THIS WE NEED TO EXPORT THE FUNCTION WHICH IS PUBLICALLY AVAILABLE TO ROUTES FILE AND THAT SHOULD RETURN SOMETHING

module.exports.home = function(req,res){
    // return res.end('<h1>Express is up for Codeial</h1>');

    // console.log(req.cookies);
    // res.cookie('user_id',25);

    //to return all the post
    // Post.find({}, function(err,posts){
    //     return res.render('home',{
    //         title: "Codeial | Home",
    //         posts : posts           //passing on all the post
    //     });
    // });

    //populate the user of each post
    Post.find({})
    .populate('user')
    .populate({
        path: 'comments',
        populate:{
            path: 'user'
        }
    })
    .exec(function(err,posts){

        //finding all users
        User.find({}, function(err,users){
            return res.render('home',{
                title: "Codeial | Home",
                posts : posts,           //passing on all the post
                all_users: users
            }); 
        })

    })
}


//module.exports.actionName = Function(req,res){}