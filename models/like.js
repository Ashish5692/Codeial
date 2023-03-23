const mongoose = require('mongoose');

const likeSchema = new mongoose.Schema({
    user : {                     //like belongs to user
        type : mongoose.Schema.ObjectId
    },
    // need to store 2 things --1. type(post or comment) on which like is placed and object id(id of that post or comment ) on which like is placed
    //likeable is object on which like is placed
    //so it defines the object id of the liked object
    likeable: {
        type: mongoose.Schema.ObjectId,
        require: true,
        refPath:  'onModel'   //going to place path to some other field and that field will define on which type of object like has been placed
    },
    //this filed is used to define the type of the liked object since this is a dynamic reference
    onModel: {
        type: String,
        required: true,
        //values that can be put in this field is post or comment(a likeable can be post or comment due to refPath model)
        enum: ['Post', 'Comment']  //to make sure that these 2 fields only contain like in my db we have declared values over here
    }
},{
    //timestamp for at what time we like it
    timestamps: true
});

//telling mongoose that it is a model
const Like = mongoose.model('Like', likeSchema);
module.exports = Like;