
const User = require("../models/user");

const express = require('express');
//main router to 
const userRoutes = express.Router();

// --------------------------------------------------------------

//handle user account posts when path is just '/api/user'

//GET - when path is '/api/user'
userRoutes.get("/", async (req,res,next) => {

        let users = await User.find();
        return res.status(200).json(users);
});


//POST - for creating a new user...
// - path is 'api/user/new'
userRoutes.post("/new", async (req,res,next) => {
    //create new user and put request body into it
    //const userData = userSchemaObject.parse(req.body);
    //let newUser = await User.create(userData);

    // teacher method
    let newUser = new User({
        name:req.body.name,
        email:req.body.email,
        age:req.body.age,
        bio:req.body.bio
    })
    console.log('hehehe inside post USER...');

    await newUser.save();
    res.end();

    //prob route to log user in, and initialize cookies....


})

//POST - for logging in an existing user...
// path is just '/api/user'





module.exports = userRoutes;

