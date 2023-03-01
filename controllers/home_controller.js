const Post = require('../models/post'); //referencing to the model to find all the post

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
    Post.find({}).populate('user').exec(function(err,posts){
        return res.render('home',{
            title: "Codeial | Home",
            posts : posts           //passing on all the post
        }); 
    })
}


//module.exports.actionName = Function(req,res){}