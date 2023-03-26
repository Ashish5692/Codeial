const mongoose = require('mongoose');

const friendshipSchema = new mongoose.Schema({
    //the user who send the request
    from_user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    //the user who accepted this request, the naming is just to understand, otherwise , the users won't see a difference
    to_user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
},{
    timestamps: true   //when was friendship established
});

const Friendship = mongoose.model('Friendships', friendshipSchema);
module.exports = Friendship;