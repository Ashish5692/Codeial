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

module.exports.destroy = function(req,res){
    //finding the comment
    Comment.findById(req.params.id, function(err,comment){
        if(comment.user == req.user.id){
            //before deleting the comment we need to fetch the id of comment--go inside the post ,find the comment and delete it
            //if yes then remove the comment
            let postId = comment.post;  

            comment.remove();

            //if comment is there its post should be there
            //i need to update the post as i am deleting one of the reference id
            //find it by postId
            //what need to update : we will pull out the comment id from list of comments for which we can use inbuilt function in mongoose
            //pull throws us the id which is matching with the comment id
            Post.findByIdAndUpdate(postId, { $pull: {comments: req.params.id}},function(err,post){
                //doingnothing with the post 
                return res.redirect('back');
            })
        }else{
            return res.redirect('back');
        }
    });
}