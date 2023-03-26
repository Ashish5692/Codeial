const Users = require("../models/user");
const Friendship = require('../models/friendship');
const { response } = require("express");
const { populate } = require("../models/like");

module.exports.addFriend = async function(req,res){

    let existingFriendship = await Friendship.findOne({
        from_user : req.user,
        to_user: req.query.id,
    });

    let toUser = await Users.findById(req.user);
    let fromUser = await Users.findById(req.query.id);

    let deleted = false;
    
    if(existingFriendship){
        toUser.friends.pull(existingFriendship._id);
        fromUser.friends.pull(existingFriendship._id);
        toUser.save();
        fromUser.save();
        existingFriendship.remove();
        deleted = true;
        removeFriend = true;
    }else{
        let friendship = await Friendship.create({
            to_user : req.query.id,
            from_user: req.user._id
        });

        toUser.friends.push(friendship);
        fromUser.friends.push(friendship);
        toUser.save();
        fromUser.save();
    }

    if(req.xhr){
        return response.status(200).json({
            deleted : deleted ,
            message : "Request Successful", 
        });
    }

    console.log(populate_user);
    return response.redirect('back',{
    });
}