const mongoose = require("mongoose");

const Post = new mongoose.Schema({

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required:true
    },

    title: {
        type:String,
        required: true
    },
    body: {
        type:String,
        required: true
    },
    img:{
        type:URL,
        
    }

})

module.exports = mongoose.model("Post",Post)