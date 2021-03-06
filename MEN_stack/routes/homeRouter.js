const express = require("express"),
      router = express.Router();
const User = require("../models/User");

    router.get("/", (req,res) => {
        res.json({
            message: "message"
        })
    })

//POST route for Users
// localhost:4005/post
//@desc post a new user and store in users collections
//@path (server path)/post 
//@access public

    router.post("/post",async (req,res)=>{
        try {
            const newUser = await User.create(req.body);
            res.status(200).json({
                status:200,
                message: "user successfully created",
                user: newUser
            })

        } catch (error) {
            res.status(500).json({
                status:500,
                message: "error at User creation POST request",
                error: error.message
            })
        }
    })

//GET route for Users
// localhost:4005/users
//@desc get all users in users collections
//@path (server path)/users 
//@access public

    router.get ("/users", async (req,res)=> {
        try {
            const allUsers = await User.find()
            res.status(200).json({
                status:200,
                message: "users successfully found",
                users: allUsers
            })
        } catch (error) {
            res.status(500).json({
                status:500,
                message: "error at User GET request",
                error: error.message
            })
        }
    })

//DELETE route for Users
// localhost:4005/delete/:userID
//@desc delete a user from user collection
//@path (server path)/delete/:userID
//@access public

    router.delete("/delete/:userID",async (req,res) => {
        try{
            const delUser = await User.findByIdAndDelete({_id:req.params.userID});
            res.status(200).json({
                status:200,
                message: "user successfully deleted",
                deleted_user: delUser
            })
        }
        catch(error){
            res.status(500).json({
                status:500,
                message: "error at User DELETE request",
                error: error.message
            })
        }
    })

//PATCH route for Users
// localhost:4005/update/:userID
//@desc update a user that matches query param with ID 
//@path (server path)/update/:userID
//@access public

    router.patch("/update/:userID",async (req,res)=> {
        try{
            const updateUser = await User.findByIdAndUpdate({_id:req.params.userID});
            res.status(200).json({
                status:200,
                message: "user successfully updated",
                updated_user: updateUser,

            })
        }
        catch(error){
            res.status(500).json({
                status:500,
                message: "error at User PATCH request",
                error: error.message
            })
        }
    })


module.exports = router;