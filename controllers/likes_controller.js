//need to import 3 models -like,post,comments
const Like = require('../models/like');
const Post = require('../models/post');
const Comment = require('../models/comment');

//create action
module.exports.toggleLike = async function(req,res){
    try{
        //likes/toggle/?id=abcdef&type=Post     //abcdef is id of likeable
        let likeable;
        //keeping deleted so that when you get JSON data back based on that you can increment or decrement the count of likes displayed on page
        let deleted = false;  //it means like is created

        //finding likeable and it will be query- - else means it is comment
        if(req.query.type == 'Post'){
            likeable = await Post.findById(req.query.id).populate('likes');    //if post contain other likes i will populate likes on this post
        }else{
            likeable = await Comment.findById(req.query.id).populate('likes');
        }

        //checking if a like already exist //one user can like object only once
        let existingLike = await Like.findOne({
            likeable : req.query.id,
            onModel: req.query.type,
            user:  req.user._id // a user cannot like without authentication
        })

        //if there is exiting  a Like already we delete it else make a new Like
        if (existingLike){
            likeable.likes.pull(existingLike._id);
            likeable.save();

            existingLike.remove();

            //changing the value of deleted
            deleted = true; //user now know that this like is deleted if it is false 

        }
        else{
            //make a new like

            let newLike = await Like.create({
                user: req.user._id,
                likeable: req.query.id,
                onModel: req.query.type
            });
            //put this newly created like into array of likes on post or comment which is our likeable
            //pulling or pushing the like will be on likeable

            likeable.likes.push(newLike._id); //it will automatically takes the id
            likeable.save();

        }

        //need to return json
        return res.json(200, {
            message: "Request successful",
            data:{
                deleted: deleted //deleted variable having value of deleted
            }
        })



    }catch(err){
        //likes is going to work with this ajax request so we will send json data
        console.log(err);
        return res.json(500,{
            message : 'Internal Server Error'
        });
    }
}