//need to create a new post,,post belongs to post schema we need to import that
const Post = require('../models/post');
const Comment = require('../models/comment');
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

module.exports.destroy = function(req,res){
    //before deleting check if post exist in database or not
    Post.findById(req.params.id, function(err,post){
        //checking if the user deleting the post is the user who created the post
        //post.user is the id of user
        // .id means converting the object id into string
        if(post.user == req.user.id){
            post.remove();

            //first import then delete the comment
            //deleteMany deletes all the comments based on some query passed
            //req.params.id- strings are being matched
            //if err it want return all the comments that are deleted because they are delelted we will not keep them in db
            //if req.user and req.post is not matched then we will return back
            
            Comment.deleteMany({post:req.params.id},function(err){
                return res.redirect('back');
            });
        }else{
            return res.redirect('back');
        }
    });
} 