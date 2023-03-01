//need to create a new post,,post belongs to post schema we need to import that
const Post = require('../models/post')

module.exports.create = function(req,res){
    //creating new post from the data into the form
    //directly saving the data coming from form into the post but also i need to save the user which is logged in

    //we are creating an action to submit the data of the form and saving it in database
    //we have created an post action to create a post in the db
    Post.create({
        content: req.body.content,
        user: req.user._id
    }, function(err,post){
        if(err){
            console.log('error in creating a post');
            return;
        }
        return res.redirect('back');
    });

}