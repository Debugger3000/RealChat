//const userSchemaObject = require("../models/user.js");

const User = require("../models/user");

const express = require('express');
//main router to 
const userRoutes = express.Router();

// -----------------------------------------------------------

// const mongoose = require('mongoose'); 
// const Schema = mongoose.Schema;

// const userSchemaObject = {
//     name: {type: String, required: true},
//     age: {type: Number, required: true},
//     bio: {type: String, required: true, default:"Add a bio here..."},
//     email: {type: String, required: true}
// }

// const mongooseSchema = mongoose.Schema(userSchemaObject);

//module.exports = mongoose.model('User',mongooseSchema);




// --------------------------------------------------------------

//handle user account posts when path is just '/api/user'

//GET
userRoutes.get("/", async (req,res,next) => {

        let users = await User.find();
        return res.status(200).json(users);
});


//POST
userRoutes.post("/", async (req,res,next) => {
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
})


// userRoutes.route('/').post()

// userRoutes.route('/self').get()


module.exports = userRoutes;
// export { userRoutes };

