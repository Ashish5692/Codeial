const Comment = require('../models/comment');//using schema of comment
const Post = require('../models/post');   //accessing the post model
module.exports.create = function(req,res){
        //finding the post  
        console.log(req.body);
        Post.findById(req.body.post,function(err,post){
            if(post){
                console.log(post);
                Comment.create({
                    content: req.body.content,
                    post: req.body.post,  //beacuse id name is post see in home.ejs
                    user: req.user._id
                },function(err,comment){
                    //handle error
                    if(err){
                        console.log(err);
                        return;
                    }
                    console.log(comment);
                    post.comments.push(comment); //Updating comment pushing to post, mongoDB will automatically fetch the id and push it 
                    post.save();

                    res.redirect('/');
                });
            }
        });
}