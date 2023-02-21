const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required : true, //means without having an email value user want be created in the database..mongoose will throw an error that email not passed
        unique: true     //unique emails
    },
    password: {
        type : String,
        required: true
    },
    name : {
        type : String, 
        required: true
    }
},{
    timestamps: true //user created at and updated at stored in database, this feature is managed by mongoose
});

//telling mongoose that this is the modal
//it refers to userSchema
const User = mongoose.model('User', userSchema);

//exporting
module.exports = User;
