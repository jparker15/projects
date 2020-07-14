const mongoose = require("mongoose");

const User = new mongoose.Schema({

    name: {
        type:String,
        required:true,
        unique:true,
    
    },

    email: {
        type:String,
        required:true,
        unique:true
    },
    
    password: {
        type:String,
        required:true,
        
    },

    posts: {
        type: Array,
        default: [{},{},{}]
    }

})

module.exports = mongoose.model("User",User);