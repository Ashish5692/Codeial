const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    content:{
        type : String,
        required : true
    },
    //comment belongs to user
    user: {
        type : mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    post: {
        type : mongoose.Schema.Types.ObjectId,
        ref: 'Post'
    },
    likes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref:'Like' //object of like model
        }
    ]

},{
    timestamps: true
});
// exporting it telling mongoose that it is collection
const Comment = mongoose.model('Comment',commentSchema);
module.exports = Comment;