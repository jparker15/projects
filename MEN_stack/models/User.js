const mongoose = require("mongoose");

const User = new mongoose.Schema({

    name: {
        type:String,
        required:true,
        unique:true,
        minlength:3,
        maxlength:25
    
    },

    email: {
        type:String,
        required:true,
        unique:true
    },
    
    password: {
        type:String,
        required:true,
        minlength:3,
        maxlength:25
    
        
    },

    posts: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "posts",
        default:[]
    }

})

module.exports = mongoose.model("User",User);